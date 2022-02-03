import { useLikes } from "../contexts/Likes";
import useFetchNext from "../hooks/useFetchNext";

const AnimalInfo = () => {
  const { likeItem } = useLikes();
  const { isError, response, fetchNext } = useFetchNext();

  const {
    name,
    image_link,
    latin_name,
    animal_type,
    active_time,
    habitat,
    diet,
    geo_range
  } = response;

  return (
    <>
      <h1>
        <span aria-hidden>🐘</span> Animals <span aria-hidden>🦒</span>
      </h1>
      <div className="response-item-container">
        {isError && <div className="error-message">Something went wrong</div>}
        {response && !isError && (
          <>
            <h2>{name}</h2>
            <div className="response-info-panels">
              <img
                className="response-item-image"
                alt={name}
                src={image_link}
              />
              <div className="response-info-panel-right">
                <ul className="animal-info">
                  <li>Latin Name: {latin_name}</li>
                  <li>Animal Type: {animal_type}</li>
                  <li>Active Time: {active_time}</li>
                  <li>Habitat: {habitat}</li>
                  <li>Diet: {diet}</li>
                  <li>Geo Range: {geo_range}</li>
                </ul>
                <button
                  className="like-button"
                  onClick={() => likeItem(response)}
                >
                  <span role="img" aria-label="like">
                    👍
                  </span>
                </button>
                <button className="next-button" onClick={fetchNext}>
                  <span role="img" aria-label="next">
                    🔄
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AnimalInfo;
