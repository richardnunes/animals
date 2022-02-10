import { useState } from "react";
import { useLikes } from "../contexts/Likes";

const SavedList = () => {
  const { likes, removeItems } = useLikes();
  const [checkedItems, setCheckedItems] = useState([]);

  const handleClick = ({ target }) => {
    const { id, value } = target;
    const tmpCheckItems = [...checkedItems];

    if (value === true) {
      tmpCheckItems.push(id);

      setCheckedItems(tmpCheckItems);
    } else {
      const filteredArray = checkedItems.filter((item) => item !== id);

      setCheckedItems(filteredArray);
    }
  };

  if (Object.keys(likes).length === 0) return null;

  const renderSavedAnimals = () =>
    Object.keys(likes).map((keyName) => {
      const item = likes[keyName];
      const { name, image_link } = item;

      return (
        <li className="saved-list-item" key={`saved-item-${keyName}`}>
          <img className="saved-item-image" alt={name} src={image_link} />
          <input
            type="checkbox"
            name={keyName}
            onChange={(e) =>
              handleClick({
                target: {
                  id: e.target.name * 1,
                  value: e.target.checked,
                },
              })
            }
          ></input>
        </li>
      );
    });

  return (
    <div className="saved-item-container">
      <h1>
        Animals I Like <span aria-hidden>👍</span>
      </h1>
      <ul className="saved-item-list">{renderSavedAnimals()}</ul>
      <button
        disabled={checkedItems.length === 0}
        onClick={() => {
          removeItems(checkedItems);
          setCheckedItems([]);
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default SavedList;
