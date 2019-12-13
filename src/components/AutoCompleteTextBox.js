import '../sass/autoCompleteTextbox.scss';

import React, {useState, useRef, useEffect, useLayoutEffect} from "react";

const AutoCompleteTextBox = ({label, items, updateListHandler, filterOptionsHandler}) => {
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const itemsContainer = useRef();

  useEffect(() => {
    console.log('useEffect:AutoCompleteTextBox');
    itemsContainer.current.addEventListener("blur", (evnt) => console.log("Blur event triggered"));
  }, [isAddingNewItem]);

  const newItemUpdatedEventHandler = (evnt) => {
    console.log('Adding new item');
  }

  const addNewItemHandler = (evnt) => {
    console.log('Adding new item');

    if(!isAddingNewItem){
      setIsAddingNewItem(true);
    }
    else{
      setIsAddingNewItem(false);
    }
  }

  const addItemHandler = (item) => {
    console.log('Adding item');

    let itemList = [...items];

    itemList.push(item);

    updateListHandler(itemList);

    setIsAddingNewItem(false);
  }

  const newItemBlurEventHandler = (evnt) => {
    setIsAddingNewItem(false);
    console.log('newItemBlurEventHandler');
  }

  const removeItemHandler = (itemToRemove) => {
    console.log('This is a test');

    let itemList = items.filter(item => item != itemToRemove);

    console.log(itemList);

    updateListHandler(itemList);
  };

  return (
    <div className="autocompleteTextBox">
      <label className="autocompleteTextBox__label">{label}</label>
      <div ref={itemsContainer} className="autocompleteTextBox__items" onClick={evnt => addNewItemHandler()} >
        {items.map(
          (item, index) => {
            return (
              <AutoCompleteItem key={index} item={item} removeItemHandler={removeItemHandler}/>
            );
          }
        )}
        {isAddingNewItem &&
          <NewItem filterOptionsHandler={filterOptionsHandler} existingItems={items} selectNewItemHandler={addItemHandler} onBlurHandler={newItemBlurEventHandler}/>
        }
        {/* <NewItem filterOptionsHandler={filterOptionsHandler} existingItems={items} selectNewItemHandler={addItemHandler} onBlurHandler={newItemBlurEventHandler}/> */}
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

const NewItem = ({filterOptionsHandler, existingItems, selectNewItemHandler, onBlurHandler}) => {
  const txtBoxRef = useRef(null);
  const [parentHeight, setParentHeight] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const [newItemsOptions, setNewItemsOptions] = useState([]);

  useEffect(() => {
    console.log('useEffect:NewItem');
    txtBoxRef.current.focus();

    setParentHeight(txtBoxRef.current.clientHeight);
    setParentWidth(txtBoxRef.current.clientWidth);

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
    <div className="autocompleteTextBoxNewItem" style={{width:parentWidth, height:parentHeight}}>
      <div className="autocompleteTextBoxNewItem__container" onBlur={evnt => {console.log("autocompleteTextBoxNewItem onblur"); onBlurHandler(evnt)}}>
        <div ref={txtBoxRef} className="autocompleteTextBoxNewItem__text" contentEditable="true" onInput={evnt => newItemUpdatedEventHandler(evnt)}></div>
        <ul className="autocompleteTextBoxNewItem__list">
          {newItemsOptions.map(
            (item, index) => {
              return (
                <li key={index} className="autocompleteTextBoxNewItem__listitem" onClick={evnt => selectNewItemHandler(item)}>{item}</li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export default AutoCompleteTextBox;