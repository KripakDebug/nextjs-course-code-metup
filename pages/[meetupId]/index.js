import Head from "next/head";
import MeetupDetaiL from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
export default function MeetupDetails(props) {
	return (
		<>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name="description" content={props.meetupData.description} />
			</Head>
			<MeetupDetaiL
				image={props.meetupData.image}
				address={props.meetupData.address}
				description={props.meetupData.description}
				title={props.meetupData.title}
			/>
		</>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		"mongodb+srv://kastrula123:Mama1345453@cluster0.sgh4bgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	);
	const db = client.db("next-meetups");
	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	client.close();
	return {
		fallback: 'blocking',
		paths: meetups.map((meetup) => ({
			params: {
				meetupId: meetup._id.toString(),
			},
		})),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;
	const client = await MongoClient.connect(
		"mongodb+srv://kastrula123:Mama1345453@cluster0.sgh4bgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	);
	const db = client.db("next-meetups");
	const meetupsCollection = db.collection("meetups");

	const selectedMeetup = await meetupsCollection.findOne({
		_id: new ObjectId(meetupId),
	});

	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				description: selectedMeetup.description,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
			},
		},
	};
}
