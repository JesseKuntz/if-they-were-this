import Head from 'next/head';

import clientPromise from '../../lib/mongodb';
import { slugify } from '../../support/slugify';
import Quiz from '../../components/quiz';
import HomeLink from '../../components/home-link';

import { useResizeHandler } from '../../support/use-resize-handler';

export default function QuizPage({ quiz }) {
  useResizeHandler();

  return (
    <>
      <Head>
        <title>If They Were This | {quiz.name}</title>
        <meta
          name="description"
          content={`Pick what you think ${quiz.name} is the most like!`}
        />
      </Head>
      <Quiz quiz={quiz} singleQuiz={true} />
      <HomeLink />
    </>
  );
}

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const quizzes = await db
    .collection('quizzes')
    .find({}, { projection: { name: 1 } })
    .toArray();

  const paths = quizzes.map(quiz => ({
    params: { slug: slugify(quiz.name) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const quizzes = await db.collection('quizzes').find({}).toArray();
  const quiz = quizzes.find(q => slugify(q.name) === params.slug);

  if (!quiz) {
    return { notFound: true };
  }

  return {
    props: {
      quiz: {
        ...quiz,
        _id: quiz._id.toString(),
      },
    },
  };
}
