import memoizeOne from 'memoize-one';

export const characterClassificationLabels = {
  'pwl-number': 'Number',
  'pwl-uppercase': 'Uppercase Letter',
  'pwl-lowercase': 'Lowercase Letter',
  'pwl-special': 'Special',
} as const;

function getCharProps(character: string): {
  type: keyof typeof characterClassificationLabels;
  label: (typeof characterClassificationLabels)[keyof typeof characterClassificationLabels];
} {
  if (/[0-9]/.test(character)) {
    return {
      type: 'pwl-number',
      label: characterClassificationLabels['pwl-number'],
    };
  }
  if (/[A-Z]/.test(character)) {
    return {
      type: 'pwl-uppercase',
      label: characterClassificationLabels['pwl-uppercase'],
    };
  }
  if (/[a-z]/.test(character)) {
    return {
      type: 'pwl-lowercase',
      label: characterClassificationLabels['pwl-lowercase'],
    };
  }
  return {
    type: 'pwl-special',
    label: characterClassificationLabels['pwl-special'],
  };
}

const getCharacterProperties = memoizeOne(getCharProps);

interface ClassifiedCharacter {
  character: string;
  type: keyof typeof characterClassificationLabels;
  label: (typeof characterClassificationLabels)[keyof typeof characterClassificationLabels];
}

export function classifyCharacters(password: string): ClassifiedCharacter[] {
  return password.split('').map((character) => {
    const { type, label } = getCharacterProperties(character);
    return {
      character,
      type,
      label,
    };
  });
}
