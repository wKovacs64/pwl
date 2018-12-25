import memoizeOne from 'memoize-one';

const getCharacterProperties = memoizeOne((character, colors, labels) => {
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
});

export default (password, colors, labels) =>
  password.split('').map(character => {
    const { color, label } = getCharacterProperties(character, colors, labels);
    return {
      character,
      color,
      label,
    };
  });
