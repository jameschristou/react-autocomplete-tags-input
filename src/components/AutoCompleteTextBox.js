import '../sass/autoCompleteTextbox.scss';

import React from "react";

const AutoCompleteTextBox = ({label, items, updateListHandler}) => {
  const removeItemHandler = (itemToRemove) => {
    console.log('This is a test');

    let itemList = items.filter(item => item != itemToRemove);

    console.log(itemList);

    updateListHandler(itemList);
  };

  return (
    <div className="autocompleteTextBox">
      <label className="autocompleteTextBox__label">{label}</label>
      <div className="autocompleteTextBox__items">
        {items.map(
          (item, index) => {
            return (
              <AutoCompleteItem key={index} item={item} removeItemHandler={removeItemHandler}/>
            );
          }
        )}
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