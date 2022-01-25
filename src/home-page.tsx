import * as React from 'react';
import clsx from 'clsx';
import debounce from 'lodash/debounce';
import { useMachine } from '@xstate/react';
import { pwnedInfoModel, pwnedInfoMachine } from './pwned-info.machine';
import {
  classifyCharacters,
  characterClassificationLabels,
} from './character-classification';

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
      <p className="mb-8 max-w-md text-xl font-light text-medium dark:text-bright md:mb-16 md:max-w-lg md:text-center md:text-2xl lg:max-w-3xl lg:text-4xl">
        Is that an &apos;O&apos; or a &apos;0&apos;? An &apos;I&apos; or an
        &apos;l&apos; - or maybe a &apos;1&apos;? Sometimes, it&apos;s hard to
        tell. Paste your password in the box below for a{' '}
        <span
          className="border-b-2 border-dashed border-bright dark:border-light"
          title="Your password never leaves your browser!"
        >
          secure
        </span>
        , color-coded revelation.
      </p>
      <section className="w-full max-w-lg">
        <input
          className="w-full whitespace-pre border-2 border-black border-opacity-30 bg-white p-4 text-center font-mono text-xl tracking-[0.25rem] placeholder-gray-500 placeholder-opacity-90 dark:border-light dark:border-opacity-30 dark:bg-dark dark:placeholder-gray-400 dark:placeholder-opacity-90 md:text-2xl lg:text-4xl"
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
        {passwordInput && (
          <section data-testid="results" className="mt-8">
            <div className="scrollbar-width-4 scrollbar-light dark:scrollbar-dark mb-8 overflow-y-hidden overflow-x-scroll whitespace-nowrap border-2 border-white bg-dark text-center text-xl dark:border-light dark:border-opacity-30 md:text-2xl lg:text-4xl">
              <div
                data-testid="password-through-lense"
                className="m-4 inline-block font-mono"
              >
                {classifyCharacters(passwordInput).map(
                  (classifiedCharacter, index) => (
                    <span
                      title={classifiedCharacter.label}
                      className={clsx(
                        'mr-1 whitespace-pre border-b border-dotted border-b-gray-100 last:mr-0',
                        {
                          'text-pwl-number':
                            classifiedCharacter.type === 'pwl-number',
                        },
                        {
                          'text-pwl-uppercase':
                            classifiedCharacter.type === 'pwl-uppercase',
                        },
                        {
                          'text-pwl-lowercase':
                            classifiedCharacter.type === 'pwl-lowercase',
                        },
                        {
                          'text-pwl-special':
                            classifiedCharacter.type === 'pwl-special',
                        },
                      )}
                      // N.B. Generally, using an array index as a key is ill advised, but
                      // in this particular case, it is acceptable as we don't have a
                      // unique ID for each character in the string that we are
                      // processing, and the order of the array elements will not change.
                      //
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                    >
                      {classifiedCharacter.character}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-8 leading-tight">
              <section className="flex-1" data-testid="legend">
                <p className="py-4">Legend:</p>
                <div
                  className="flex items-center"
                  data-testid="legend-row--number"
                >
                  <div
                    className="mr-4 inline-block h-4 w-4 bg-pwl-number"
                    data-testid="number-color"
                  />
                  <span>{characterClassificationLabels['pwl-number']}</span>
                </div>
                <div
                  className="flex items-center"
                  data-testid="legend-row--uppercase"
                >
                  <div
                    className="mr-4 inline-block h-4 w-4 bg-pwl-uppercase"
                    data-testid="uppercase-color"
                  />
                  <span>{characterClassificationLabels['pwl-uppercase']}</span>
                </div>
                <div
                  className="flex items-center"
                  data-testid="legend-row--lowercase"
                >
                  <div
                    className="mr-4 inline-block h-4 w-4 bg-pwl-lowercase"
                    data-testid="lowercase-color"
                  />
                  <span>{characterClassificationLabels['pwl-lowercase']}</span>
                </div>
                <div
                  className="flex items-center"
                  data-testid="legend-row--special"
                >
                  <div
                    className="mr-4 inline-block h-4 w-4 bg-pwl-special"
                    data-testid="special-color"
                  />
                  <span>{characterClassificationLabels['pwl-special']}</span>
                </div>
              </section>
              <PwnedInfo password={passwordToCheck} />
            </div>
          </section>
        )}
      </section>
    </article>
  );
}

function PwnedInfo({ /* delayLoadingMs, */ password }: PwnedInfoProps) {
  const [state, send] = useMachine(pwnedInfoMachine);
  const { numPwns, error } = state.context;

  React.useEffect(() => {
    send(pwnedInfoModel.events.getPwnedInfo(password));
  }, [send, password]);

  return (
    <section className="flex-1" data-testid="pwned-info">
      <p className="py-4">Public Exposure:</p>
      {error ? (
        <p>
          <em>Public exposure information is currently unavailable.</em>
        </p>
      ) : state.matches('loading') ? (
        <p>Loading...</p>
      ) : numPwns > 0 ? (
        <p>
          <span className="text-red-600 dark:text-red-400">Uh-oh!</span> This
          password has been publicly exposed in{' '}
          <span>{Number(numPwns).toLocaleString()}</span> data breach
          {numPwns > 1 && 'es'}. It should NOT be used.
        </p>
      ) : (
        <p>
          <span className="text-emerald-800 dark:text-emerald-600">
            Congratulations!
          </span>{' '}
          This password has not been publicly exposed in any data breaches.
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
