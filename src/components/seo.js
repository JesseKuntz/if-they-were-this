import Head from 'next/head';
import PropTypes from 'prop-types';

const SITE_METADATA = {
  title: 'If They Were This',
  description: 'A celebrity quiz game!',
  author: 'Jesse Kuntz',
};

function SEO({ description, title }) {
  const metaDescription = description || SITE_METADATA.description;
  const metaTitle = title || SITE_METADATA.title;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={SITE_METADATA.author} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Head>
  );
}

SEO.defaultProps = {
  description: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default SEO;
