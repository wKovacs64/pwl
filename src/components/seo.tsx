import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SEOProps {
  title?: string;
  description?: string;
  socialImageUrl?: string;
  socialImageAlt?: string;
}

function SEO({
  title: pageTitle,
  description: pageDescription,
  socialImageUrl,
  socialImageAlt,
}: SEOProps): JSX.Element {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          socialImageUrl
          buildInfo {
            commit
          }
        }
      }
    }
  `);

  const title = pageTitle || siteMetadata.title;
  const description = pageDescription || siteMetadata.description;
  const imageUrl = socialImageUrl || siteMetadata.socialImageUrl;
  const imageAlt = socialImageAlt || title;

  return (
    <Helmet
      htmlAttributes={{
        lang: 'en',
        'data-commit': siteMetadata.buildInfo.commit,
      }}
      title={title}
      meta={[
        { name: 'description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:alt', content: imageAlt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: imageUrl },
        { name: 'twitter:image:alt', content: imageAlt },
      ]}
    />
  );
}

SEO.defaultProps = {
  title: '',
  description: '',
  socialImageUrl: '',
  socialImageAlt: '',
};

export default SEO;
