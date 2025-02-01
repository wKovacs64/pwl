import * as React from 'react';
import clsx from 'clsx';
import debounce from 'lodash/debounce';
import { useMachine } from '@xstate/react';
import { pwnedInfoMachine } from './pwned-info.machine';
import { classifyCharacters, characterClassificationLabels } from './character-classification';

function HomePage() {
  const [passwordInput, setPasswordInput] = React.useState('');
  const [passwordToCheck, setPasswordToCheck] = React.useState('');
  const setPasswordToCheckDebounced = React.useRef(
    debounce(setPasswordToCheck, 250, { leading: true }),
  ).current;

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setPasswordInput(value);
    setPasswordToCheckDebounced(value);
  };

  React.useEffect(() => {
    function handler({ key }: KeyboardEvent) {
      if (/Esc(ape)?/.test(key)) {
        setPasswordInput('');
        setPasswordToCheck('');
      }
    }

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  return (
    <article className="flex flex-col items-center">
      <p className="text-medium dark:text-bright mb-8 max-w-md text-xl font-light md:mb-16 md:max-w-lg md:text-center md:text-2xl lg:max-w-3xl lg:text-4xl">
        Is that an &apos;O&apos; or a &apos;0&apos;? An &apos;I&apos; or an &apos;l&apos; - or maybe
        a &apos;1&apos;? Sometimes, it&apos;s hard to tell. Paste your password in the box below for
        a{' '}
        <span
          className="decoration-bright dark:decoration-light underline decoration-dashed decoration-2 underline-offset-8"
          title="Your password never leaves your browser!"
        >
          secure
        </span>
        , color-coded revelation.
      </p>
      <section className="w-full max-w-lg">
        <input
          className="placeholder-opacity-90 dark:border-light/30 dark:bg-dark dark:placeholder-opacity-90 w-full border-2 border-black/30 bg-white p-4 text-center font-mono text-xl tracking-[0.25rem] whitespace-pre placeholder-gray-500 md:text-2xl lg:text-4xl dark:placeholder-gray-400"
          aria-label="Password"
          placeholder="Paste Here"
          type="text"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={handlePasswordChange}
          value={passwordInput}
        />
        {passwordInput ? (
          <section data-testid="results" className="mt-8">
            <div className="scrollbar-width-4 scrollbar-light dark:scrollbar-dark bg-dark dark:border-light/30 mb-8 overflow-x-scroll overflow-y-hidden border-2 border-white text-center text-xl whitespace-nowrap md:text-2xl lg:text-4xl">
              <div data-testid="password-through-lense" className="m-4 inline-block font-mono">
                {classifyCharacters(passwordInput).map((classifiedCharacter, index) => (
                  <span
                    title={classifiedCharacter.label}
                    className={clsx(
                      'mr-1 border-b border-dotted border-b-gray-100 whitespace-pre last:mr-0',
                      {
                        'text-pwl-number': classifiedCharacter.type === 'pwl-number',
                      },
                      {
                        'text-pwl-uppercase': classifiedCharacter.type === 'pwl-uppercase',
                      },
                      {
                        'text-pwl-lowercase': classifiedCharacter.type === 'pwl-lowercase',
                      },
                      {
                        'text-pwl-special': classifiedCharacter.type === 'pwl-special',
                      },
                    )}
                    key={index}
                  >
                    {classifiedCharacter.character}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-8 leading-tight">
              <section className="flex-1" data-testid="legend">
                <p className="py-4">Legend:</p>
                <div className="flex items-center" data-testid="legend-row--number">
                  <div
                    className="bg-pwl-number mr-4 inline-block h-4 w-4"
                    data-testid="number-color"
                  />
                  <span>{characterClassificationLabels['pwl-number']}</span>
                </div>
                <div className="flex items-center" data-testid="legend-row--uppercase">
                  <div
                    className="bg-pwl-uppercase mr-4 inline-block h-4 w-4"
                    data-testid="uppercase-color"
                  />
                  <span>{characterClassificationLabels['pwl-uppercase']}</span>
                </div>
                <div className="flex items-center" data-testid="legend-row--lowercase">
                  <div
                    className="bg-pwl-lowercase mr-4 inline-block h-4 w-4"
                    data-testid="lowercase-color"
                  />
                  <span>{characterClassificationLabels['pwl-lowercase']}</span>
                </div>
                <div className="flex items-center" data-testid="legend-row--special">
                  <div
                    className="bg-pwl-special mr-4 inline-block h-4 w-4"
                    data-testid="special-color"
                  />
                  <span>{characterClassificationLabels['pwl-special']}</span>
                </div>
              </section>
              <PwnedInfo password={passwordToCheck} />
            </div>
          </section>
        ) : null}
      </section>
    </article>
  );
}

function PwnedInfo({ /* delayLoadingMs, */ password }: PwnedInfoProps) {
  const [state, send] = useMachine(pwnedInfoMachine);
  const { numPwns, hasFailed } = state.context;

  React.useEffect(() => {
    send({ type: 'GET_PWNED_INFO', password });
  }, [send, password]);

  return (
    <section className="flex-1" data-testid="pwned-info">
      <p className="py-4">Public Exposure:</p>
      {hasFailed ? (
        <p>
          <em>Public exposure information is currently unavailable.</em>
        </p>
      ) : state.matches('gettingNumPwns') ? (
        <p>Loading...</p>
      ) : numPwns > 0 ? (
        <p>
          <span className="text-red-600 dark:text-red-400">Uh-oh!</span> This password has been
          publicly exposed in <span>{Number(numPwns).toLocaleString()}</span> data breach
          {numPwns > 1 && 'es'}. It should NOT be used.
        </p>
      ) : (
        <p>
          <span className="text-emerald-800 dark:text-emerald-600">Congratulations!</span> This
          password has not been publicly exposed in any data breaches.
        </p>
      )}
    </section>
  );
}

interface PwnedInfoProps {
  // delayLoadingMs: number;
  password: string;
}

export default HomePage;
