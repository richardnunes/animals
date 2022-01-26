import axios from "axios";
import { useState, useEffect } from "react";
import { useLikes } from "../contexts/Likes";

const AnimalInfo = () => {
  const [isError, setError] = useState(false);
  const [response, setResponse] = useState([]);
  const { likeItem } = useLikes();

  const fetchNext = async () => {
    setError(false);
    try {
      const res = await axios.get(
        "https://zoo-animal-api.herokuapp.com/animals/rand"
      );

      setResponse(res.data);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNext();
  }, []);

  const {
    name,
    image_link,
    latin_name,
    animal_type,
    active_time,
    habitat,
    diet,
    geo_range,
  } = response;

  return (
    <div className="response-item-container">
      {isError && <div className="error-message">Something went wrong</div>}
      {response && !isError && (
        <>
          <h1>{name}</h1>
          <div className="response-info-panels">
            <img className="response-item-image" alt={name} src={image_link} />
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
                👍 Like
              </button>
              <button className="next-button" onClick={fetchNext}>
                🔄 Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimalInfo;
