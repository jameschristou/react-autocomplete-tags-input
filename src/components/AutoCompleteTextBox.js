import '../sass/autoCompleteTextbox.scss';

import React, {useState, useRef, useEffect, useLayoutEffect} from "react";

const AutoCompleteTextBox = ({label, items, updateListHandler, filterOptionsHandler}) => {
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const itemsContainer = useRef();

  useEffect(() => {
    console.log('useEffect:AutoCompleteTextBox');
    //itemsContainer.current.addEventListener("blur", (evnt) => console.log("Blur event triggered"));
  }, [isAddingNewItem]);

  const newItemUpdatedEventHandler = (evnt) => {
    console.log('Adding new item');
  }

  const addNewItemHandler = (evnt) => {
    evnt.stopPropagation();
    console.log('addNewItemHandler handler');

    if(!isAddingNewItem){
      setIsAddingNewItem(true);
    }
    else{
      setIsAddingNewItem(false);
    }

    return false;
  }

  const addItemHandler = (item) => {
    console.log('Adding item');

    let itemList = [...items];

    itemList.push(item);

    updateListHandler(itemList);

    setIsAddingNewItem(false);
  }

  const newItemBlurEventHandler = (evnt) => {
    evnt.stopPropagation();

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
      <div ref={itemsContainer} className="autocompleteTextBox__items" onClick={evnt => {evnt.stopPropagation(); addNewItemHandler(evnt);}} >
        {items.map(
          (item, index) => {
            return (
              <AutoCompleteItem key={index} item={item} removeItemHandler={removeItemHandler}/>
            );
          }
        )}
        {/* {isAddingNewItem &&
          <NewItem filterOptionsHandler={filterOptionsHandler} existingItems={items} selectNewItemHandler={addItemHandler} onBlurHandler={newItemBlurEventHandler}/>
        } */}
        <NewItem filterOptionsHandler={filterOptionsHandler} existingItems={items} selectNewItemHandler={addItemHandler} onBlurHandler={newItemBlurEventHandler} shouldShow={isAddingNewItem}/>
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

const NewItem = ({filterOptionsHandler, existingItems, selectNewItemHandler, onBlurHandler, shouldShow}) => {
  const txtBoxRef = useRef(null);
  const [parentHeight, setParentHeight] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const [clickOutEventRegistered, setClickOutEventRegistered] = useState(0);
  const [newItemsOptions, setNewItemsOptions] = useState([]);

  useEffect(() => {
    console.log('useEffect:NewItem' + ' shouldShow:' + shouldShow);
    txtBoxRef.current.focus();

    setParentHeight(txtBoxRef.current.clientHeight);
    setParentWidth(txtBoxRef.current.clientWidth);

    setNewItemsOptions(getNotSelectedOptions(''));

    if(shouldShow && !clickOutEventRegistered){
      document.addEventListener("click", documentClickEventListener);

      setClickOutEventRegistered(true);
    }
    else{
      document.removeEventListener("click", documentClickEventListener);
    }

  }, [txtBoxRef, shouldShow]);

  const newItemUpdatedEventHandler = (evnt) => {
    let options = getNotSelectedOptions(evnt.target.textContent.trim());

    setNewItemsOptions(options);
  }

  const getNotSelectedOptions = (filterText) => {
    let options = filterOptionsHandler(filterText);

    // remove options which are already selected
    let notSelectedOptions = options.filter(o => existingItems.indexOf(o) < 0);

    if(notSelectedOptions.length == 0){
      return ["No further options available"];
    }

    return notSelectedOptions;
  }

  const documentClickEventListener = (evnt) => {
    console.log('click outside listener');

    let clickOutElement = document.querySelector(".autocompleteTextBoxNewItem");

    if(clickOutElement == null) return;

    if(clickOutElement.className.includes('hidden')) return;

    if(evnt.target == document.querySelector(".autocompleteTextBox__items")) return;

    let targetElement = evnt.target;

    do {
      if (targetElement == clickOutElement) {
          return;
      }
      // Go up the DOM.
      targetElement = targetElement.parentNode;
    } while (targetElement);

    console.log('Calling onBlur handler');

    onBlurHandler(evnt);
  }

  return (
    <div className={`autocompleteTextBoxNewItem${shouldShow ? '' : ' hidden'}`} style={{width:parentWidth, height:parentHeight}}>
      <div className="autocompleteTextBoxNewItem__container">
        <div ref={txtBoxRef} className="autocompleteTextBoxNewItem__text" contentEditable="true" onInput={evnt => newItemUpdatedEventHandler(evnt)}></div>
        <ul className="autocompleteTextBoxNewItem__list">
          {newItemsOptions.map(
            (item, index) => {
              return (
                <li key={index} className="autocompleteTextBoxNewItem__listitem" onClick={evnt => {console.log("autocompleteTextBoxNewItem__listitem onClick"); selectNewItemHandler(item)}}>{item}</li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export default AutoCompleteTextBox;