const Card = ({ event, index, handleCardClick }) => {
    return (

        <li className="card" key={index} onClick={() => handleCardClick(event)}>
        <h2>{event.Event}</h2>
        <p><strong>Date:</strong> {event.Date}</p>
        {event.Description ? (
            <p>{event.Description}</p>
        ) : (
            <p><em>No description available.</em></p>
        )}
        </li>
    )
}

export default Card;
