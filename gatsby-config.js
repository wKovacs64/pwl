const siteConfig = require('./src/utils/site-config');
const buildInfo = require('./src/utils/build-info');

module.exports = {
  siteMetadata: {
    title: siteConfig.title,
    description: siteConfig.description,
    socialImageUrl: siteConfig.socialImageUrl,
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
            "Content-Security-Policy: default-src 'self'; connect-src 'self' https://api.pwnedpasswords.com; img-src data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; worker-src 'self'",
            "Feature-Policy: geolocation 'none'; camera 'none'; microphone 'none'; speaker 'none'; payment 'none'; usb 'none'",
            'Referrer-Policy: no-referrer-when-downgrade',
            'Expect-CT: enforce, max-age=3600',
          ],
        },
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteConfig.title,
        short_name: siteConfig.pwaShortName,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#1c304a',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        importWorkboxFrom: 'local',
      },
    },
  ],
};
