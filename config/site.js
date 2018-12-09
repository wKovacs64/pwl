const dotenv = require('dotenv');

dotenv.config();

const title = 'Password Lense';
const description = 'Reveal character types in a password';
const socialImageUrl = process.env.PWL_SOCIAL_IMAGE_URL || '';
const pwaShortName = 'PWL';

module.exports = {
  title,
  description,
  socialImageUrl,
  pwaShortName,
};
