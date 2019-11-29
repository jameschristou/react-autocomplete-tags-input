import '../sass/autoCompleteTextbox.scss';

import React from "react";

const AutoCompleteTextBox = ({label, items}) => {
  
  return (
    <div className="autocompleteTextBox">
      <label className="autocompleteTextBox__label">{label}</label>
      <div className="autocompleteTextBox__items" contenteditable="true">
        {items.map(
          (item, index) => {
            return (
              <div className="autocompleteTextBox__item">{item}</div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default AutoCompleteTextBox;