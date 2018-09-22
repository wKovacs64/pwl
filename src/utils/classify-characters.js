import memoizeOne from 'memoize-one';

const getCharacterValues = memoizeOne((character, colors, labels) => {
  if (/[0-9]/.test(character)) {
    return { label: labels.number, color: colors.number };
  }
  if (/[A-Z]/.test(character)) {
    return { label: labels.uppercase, color: colors.uppercase };
  }
  if (/[a-z]/.test(character)) {
    return { label: labels.lowercase, color: colors.lowercase };
  }
  return { label: labels.special, color: colors.special };
});

export default (password, colors, labels) =>
  password.split('').map(character => {
    const { label, color } = getCharacterValues(character, colors, labels);
    return {
      character,
      label,
      color,
    };
  });
