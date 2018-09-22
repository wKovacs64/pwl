import React from 'react';
import { css } from 'react-emotion';
import memoizeOne from 'memoize-one';

const colorFromChar = memoizeOne((c, colors) => {
  if (/[0-9]/.test(c)) {
    return colors.number;
  }
  if (/[A-Z]/.test(c)) {
    return colors.upperCaseLetter;
  }
  if (/[a-z]/.test(c)) {
    return colors.lowerCaseLetter;
  }
  return colors.special;
});

export default (password, colors) =>
  password.split('').map((c, i) => {
    const color = colorFromChar(c, colors);
    return (
      <span
        title={color.label}
        className={css`
          color: ${color.value};
        `}
        // N.B. Generally, using an array index as a key is ill advised, but in
        // this particular case, it is acceptable as we don't have a unique ID for
        // each character in the string that we are processing, and the order of
        // the array elements will not change.
        //
        // eslint-disable-next-line react/no-array-index-key
        key={i}
      >
        {c}
      </span>
    );
  });
