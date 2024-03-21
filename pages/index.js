import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

export default function HomePage(props) {
	return (
		<>
			<Head>
				<title>Next Meetup</title>
				<meta name="description" content="practice nextjs for maximilian udemy"/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
}

export async function getStaticProps() {
	const client = await MongoClient.connect(
		"mongodb+srv://kastrula123:Mama1345453@cluster0.sgh4bgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	);
	const db = client.db("next-meetups");
	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
			revalidate: 1,
		},
	};
}
