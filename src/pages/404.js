import Layout from '../components/layout';
import SEO from '../components/seo';
import HomeLink from '../components/home-link';

export default function NotFoundPage() {
  return (
    <Layout hideSplash={true}>
      <SEO title="404: Not found" />
      <HomeLink />
      <h1>404: Not Found</h1>
      <p className="text">No quizzes here!</p>
    </Layout>
  );
}
