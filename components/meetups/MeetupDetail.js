import classes from './MeetupDetail.module.css'

export default function MeetupDetail({ image, address, title, description }) {
	return (
		<div className={classes.MeetupDetail}>
			<img src={image} alt={title} />
			<h1>{title}</h1>
			<p>{description}</p>
			<address>{address}</address>
		</div>
	);
}
