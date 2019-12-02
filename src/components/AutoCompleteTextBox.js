import '../sass/autoCompleteTextbox.scss';

import React, {useState} from "react";

const AutoCompleteTextBox = ({label, items, updateListHandler}) => {
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

  return (
    <div className="autocompleteTextBox">
      <label className="autocompleteTextBox__label">{label}</label>
      <div className="autocompleteTextBox__items" onClick={event => startAddingNewItemHandler()}>
        {items.map(
          (item, index) => {
            return (
              <AutoCompleteItem key={index} item={item} removeItemHandler={removeItemHandler}/>
            );
          }
        )}
        <div className="autocompleteTextBoxNewItem" contentEditable="true"></div>
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

export default AutoCompleteTextBox;