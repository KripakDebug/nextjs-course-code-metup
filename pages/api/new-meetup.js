import { MongoClient } from "mongodb";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;

		const client = await MongoClient.connect(
			"mongodb+srv://kastrula123:Mama1345453@cluster0.sgh4bgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
		);
		const db = client.db("next-meetups");
		const meetupsCollection = db.collection("meetups");

		const result = await meetupsCollection.insertOne(data);
		console.log(result);

		client.close();
		res.status(201).json({ message: "Meetup added!" });
	}
}
