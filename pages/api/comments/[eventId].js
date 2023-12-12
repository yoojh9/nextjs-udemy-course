import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  const eventId = req.query.eventId;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Connection to the database failed" });
    return;
  }

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

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added Comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
      client.close();
      return;
    }

    res.status(201).json({ comments: newComment });
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed." });
    }
  }

  client.close();
};

export default handler;
