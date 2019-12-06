import '../sass/autoCompleteTextbox.scss';

import React, {useState, useRef, useEffect} from "react";

const AutoCompleteTextBox = ({label, items, updateListHandler, filterOptionsHandler}) => {
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);

  const removeItemHandler = (itemToRemove) => {
    console.log('This is a test');

    let itemList = items.filter(item => item != itemToRemove);

    console.log(itemList);

    updateListHandler(itemList);
  };

  const startAddingNewItemHandler = () => {
    setIsAddingNewItem(true);
  };

  const newItemUpdatedEventHandler = (evnt) => {
    console.log('Adding new item');
  }

  return (
    <div className="autocompleteTextBox">
      <label className="autocompleteTextBox__label">{label}</label>
      <div className="autocompleteTextBox__items" onClick={evnt => startAddingNewItemHandler()}>
        {items.map(
          (item, index) => {
            return (
              <AutoCompleteItem key={index} item={item} removeItemHandler={removeItemHandler}/>
            );
          }
        )}
        {isAddingNewItem &&
          <NewItem filterOptionsHandler={filterOptionsHandler}/>
        }
      </div>
    </div>
  );

  // every time the user clicks into the box then create a div with contentEditable property
}

const AutoCompleteItem = ({itemIndex, item, removeItemHandler}) => {
  return (
    <div className="autocompleteTextBoxItem">
      <span className="autocompleteTextBoxItem__text">{item}</span>
      <span className="autocompleteTextBoxItem__remove" onClick={event => removeItemHandler(item)}>x</span>
    </div>
  );
}

const NewItem = ({filterOptionsHandler}) => {
  const txtBoxRef = useRef(null);
  const [newItemsOptions, setNewItemsOptions] = useState([]);

  useEffect(() => {
    txtBoxRef.current.focus();
  }, [txtBoxRef]);

  const newItemUpdatedEventHandler = (evnt) => {
    let options = filterOptionsHandler(evnt.target.textContent.trim());

    setNewItemsOptions(options);
  }

  const showAutoCompleteList = true;

  return (
    <div className="autocompleteTextBoxNewItem">
      <div ref={txtBoxRef} className="autocompleteTextBoxNewItem__text" contentEditable="true" onInput={evnt => newItemUpdatedEventHandler(evnt)}></div>
      <ul className={`autocompleteTextBoxNewItem__list${showAutoCompleteList ? '' : ' hidden'}`}>
        {newItemsOptions.map(
          (item, index) => {
            return (
              <li className="autocompleteTextBoxNewItem__listitem">{item}</li>
            );
          }
        )}
      </ul>
    </div>
  );
}

export default AutoCompleteTextBox;