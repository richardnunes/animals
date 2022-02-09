import { useLikes } from "../contexts/Likes";

const SavedList = () => {
  const { likes, removeItem } = useLikes();

  if (Object.keys(likes).length === 0) return null;

  const renderSavedAnimals = () =>
    Object.keys(likes).map((keyName) => {
      const item = likes[keyName];
      const { name, image_link } = item;

      return (
        <li className="saved-list-item" key={`saved-item-${keyName}`}>
          <img className="saved-item-image" alt={name} src={image_link} />
          <button onClick={() => removeItem(item)}>Remove</button>
        </li>
      );
    });

  return (
    <div className="saved-item-container">
      <h1>
        Animals I Like <span aria-hidden>👍</span>
      </h1>
      <ul className="saved-item-list">{renderSavedAnimals()}</ul>
    </div>
  );
};

export default SavedList;
