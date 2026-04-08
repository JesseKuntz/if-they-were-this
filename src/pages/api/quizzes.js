import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const quizzes = await db.collection('quizzes').find({}).toArray();

    const serialized = quizzes.map(quiz => ({
      ...quiz,
      _id: quiz._id.toString(),
    }));

    res.status(200).json(serialized);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
