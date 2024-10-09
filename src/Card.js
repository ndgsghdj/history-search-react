const Card = ({ event, index, handleCardClick }) => {
    // Limit for the description length to show in the card
    const maxDescriptionLength = 150; // You can adjust this value

    const truncatedDescription =
        event.Description && event.Description.length > maxDescriptionLength
            ? event.Description.slice(0, maxDescriptionLength) + '...'
            : event.Description;

    return (
        <li className="card" key={index} onClick={() => handleCardClick(event)}>
            <h2>{event.Event}</h2>
            <p><strong>Date:</strong> {event.Date}</p>
            {event.Description ? (
                <p className="description">{truncatedDescription}</p>
            ) : (
                <p><em>No description available.</em></p>
            )}
        </li>
    );
};

export default Card;

