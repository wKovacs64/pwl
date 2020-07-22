import memoizeOne from 'memoize-one';
import { ColorMap } from '../legend/colors';
import { LabelMap } from '../legend/labels';

function getCharProps(
  character: string,
  colors: ColorMap,
  labels: LabelMap,
): { color: string; label: string } {
  if (/[0-9]/.test(character)) {
    return { color: colors.number, label: labels.number };
  }
  if (/[A-Z]/.test(character)) {
    return { color: colors.uppercase, label: labels.uppercase };
  }
  if (/[a-z]/.test(character)) {
    return { color: colors.lowercase, label: labels.lowercase };
  }
  return { color: colors.special, label: labels.special };
}

const getCharacterProperties = memoizeOne(getCharProps);

interface ClassifiedCharacter {
  character: string;
  color: string;
  label: string;
}

export function classifyCharacters(
  password: string,
  colors: ColorMap,
  labels: LabelMap,
): ClassifiedCharacter[] {
  return password.split('').map((character) => {
    const { color, label } = getCharacterProperties(character, colors, labels);
    return {
      character,
      color,
      label,
    };
  });
}
