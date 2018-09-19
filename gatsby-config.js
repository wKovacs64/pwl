const siteConfig = require('./src/utils/site-config');
const buildInfo = require('./src/utils/build-info');

module.exports = {
  siteMetadata: {
    title: siteConfig.title,
    description: siteConfig.description,
    buildInfo: {
      commit: buildInfo.commit,
      version: buildInfo.version,
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            "Content-Security-Policy: default-src 'self'; connect-src 'self'; img-src data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; worker-src 'self'",
            "Feature-Policy: geolocation 'none'; camera 'none'; microphone 'none'; speaker 'none'; payment 'none'; usb 'none'",
            'Referrer-Policy: no-referrer-when-downgrade',
            'Expect-CT: enforce, max-age=3600',
          ],
        },
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
  ],
};
