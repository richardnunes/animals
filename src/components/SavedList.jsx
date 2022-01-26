import { useLikes } from "../contexts/Likes";

const SavedList = () => {
  const { likes, removeItem } = useLikes();

  if (Object.keys(likes).length === 0) return null;

  const listItems = Object.keys(likes).map((keyName, keyIndex) => (
    <li className="saved-list-item" key={`saved-item-${keyName}`}>
      <img
        className="saved-item-image"
        alt={likes[keyName].name}
        src={likes[keyName].image_link}
      />
      <button onClick={() => removeItem(likes[keyName])}>Remove</button>
    </li>
  ));

  return (
    <div className="saved-item-container">
      <h1>Animals I 💖</h1>
      <ul className="saved-item-list">{listItems}</ul>
    </div>
  );
};

export default SavedList;
