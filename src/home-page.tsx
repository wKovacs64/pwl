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
      <p className="mb-8 md:mb-16 max-w-md md:max-w-lg lg:max-w-3xl font-light text-xl md:text-2xl lg:text-4xl md:text-center text-medium dark:text-bright">
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
      <section className="max-w-lg w-full">
        <input
          className="p-4 font-mono text-center text-xl md:text-2xl lg:text-4xl tracking-[0.25rem] whitespace-pre bg-white dark:bg-dark border-2 border-opacity-30 border-black dark:border-opacity-30 dark:border-light placeholder-opacity-90 placeholder-gray-500 dark:placeholder-opacity-90 dark:placeholder-gray-400 w-full"
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
            <div className="mb-8 text-xl md:text-2xl lg:text-4xl text-center whitespace-nowrap overflow-x-scroll overflow-y-hidden border-2 border-white dark:border-opacity-30 dark:border-light bg-dark scrollbar-width-4 scrollbar-light dark:scrollbar-dark">
              <div
                data-testid="password-through-lense"
                className="m-4 inline-block font-mono"
              >
                {classifyCharacters(passwordInput).map(
                  (classifiedCharacter, index) => (
                    <span
                      title={classifiedCharacter.label}
                      className={clsx(
                        'border-b border-b-gray-100 border-dotted whitespace-pre mr-1 last:mr-0',
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
                    className="inline-block w-4 h-4 mr-4 bg-pwl-number"
                    data-testid="number-color"
                  />
                  <span>{characterClassificationLabels['pwl-number']}</span>
                </div>
                <div
                  className="flex items-center"
                  data-testid="legend-row--uppercase"
                >
                  <div
                    className="inline-block w-4 h-4 mr-4 bg-pwl-uppercase"
                    data-testid="uppercase-color"
                  />
                  <span>{characterClassificationLabels['pwl-uppercase']}</span>
                </div>
                <div
                  className="flex items-center"
                  data-testid="legend-row--lowercase"
                >
                  <div
                    className="inline-block w-4 h-4 mr-4 bg-pwl-lowercase"
                    data-testid="lowercase-color"
                  />
                  <span>{characterClassificationLabels['pwl-lowercase']}</span>
                </div>
                <div
                  className="flex items-center"
                  data-testid="legend-row--special"
                >
                  <div
                    className="inline-block w-4 h-4 mr-4 bg-pwl-special"
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
