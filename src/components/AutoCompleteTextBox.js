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

  const newItemUpdatedEventHandler = (evnt) => {
    console.log('Adding new item');
  }

  const addNewItemHandler = (evnt) => {
    console.log('Adding new item');

    if(!isAddingNewItem){
      setIsAddingNewItem(true);
    }
  }

  const addItemHandler = (item) => {
    let itemList = [...items];

    itemList.push(item);

    updateListHandler(itemList);
  }

  return (
    <div className="autocompleteTextBox">
      <label className="autocompleteTextBox__label">{label}</label>
      <div className="autocompleteTextBox__items" onClick={evnt => addNewItemHandler()} onBlur={evnt => setIsAddingNewItem(false)}>
        {items.map(
          (item, index) => {
            return (
              <AutoCompleteItem key={index} item={item} removeItemHandler={removeItemHandler}/>
            );
          }
        )}
        {isAddingNewItem &&
          <NewItem filterOptionsHandler={filterOptionsHandler} existingItems={items} addItemHandler={addItemHandler}/>
        }
      </div>
    </div>
  );
}

const AutoCompleteItem = ({itemIndex, item, removeItemHandler}) => {
  return (
    <div className="autocompleteTextBoxItem" onClick={evnt => evnt.stopPropagation()}>
      <span className="autocompleteTextBoxItem__text">{item}</span>
      <span className="autocompleteTextBoxItem__remove" onClick={event => removeItemHandler(item)}>x</span>
    </div>
  );
}

const NewItem = ({filterOptionsHandler, existingItems, addItemHandler}) => {
  const txtBoxRef = useRef(null);
  const [newItemsOptions, setNewItemsOptions] = useState([]);

  useEffect(() => {
    console.log('useEffect:NewItem');
    txtBoxRef.current.focus();

    setNewItemsOptions(getNotSelectedOptions(''));
  }, [txtBoxRef]);

  const newItemUpdatedEventHandler = (evnt) => {
    let options = getNotSelectedOptions(evnt.target.textContent.trim());

    setNewItemsOptions(options);
  }

  const getNotSelectedOptions = (filterText) => {
    let options = filterOptionsHandler(filterText);

    // remove options which are already selected
    return options.filter(o => existingItems.indexOf(o) < 0);
  }

  return (
    <div className="autocompleteTextBoxNewItem">
      <div ref={txtBoxRef} className="autocompleteTextBoxNewItem__text" contentEditable="true" onInput={evnt => newItemUpdatedEventHandler(evnt)}></div>
      <ul className="autocompleteTextBoxNewItem__list">
        {newItemsOptions.map(
          (item, index) => {
            return (
              <li key={index} className="autocompleteTextBoxNewItem__listitem" onClick={evnt => addItemHandler(item)}>{item}</li>
            );
          }
        )}
      </ul>
    </div>
  );
}

export default AutoCompleteTextBox;