const { MongoClient } = require("mongodb");

const handler = async (req, res) => {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  if (req.method === "POST") {
    // server-side validation
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);
    console.log(result);
    res.status(201).json({ message: "Added comment", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Jeonghyun", text: "A first comment!" },
      { id: "c2", name: "Yoo", text: "A second comment!" },
    ];
    res.status(200).json({ comments: dummyList });
  }

  client.close();
};

export default handler;
