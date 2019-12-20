import '../sass/autoCompleteTextbox.scss';

import React, {useState, useRef, useEffect} from "react";

// react-autocomplete-tags-input

const AutoCompleteTextBox = ({label, items, updateListHandler, filterOptionsHandler}) => {
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const itemsContainer = useRef();
  const [id, setId] = useState(null);

  useEffect(() => {
    console.log('useEffect:AutoCompleteTextBox');

    if(id == null){
      setId(generateRandomId());
    }
    
  }, [isAddingNewItem]);

  const generateRandomId = () => {
    // generates a random 5 digit id which should be enough to prevent conflict between many instances of 
    // this component on the one page
    return Math.floor(Math.random()*10000);
  }

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
    let itemList = items.filter(item => item != itemToRemove);

    updateListHandler(itemList);
  };

  return (
    <div className="autocompleteTextBox" id={`autocompleteTextBox-${id}`}>
      <label className="autocompleteTextBox__label">{label}</label>
      <div ref={itemsContainer} className={`autocompleteTextBox__items${isAddingNewItem ? ' autocompleteTextBox__items-active' : ''}`} onClick={evnt => addNewItemHandler(evnt)} >
        {items.map(
          (item, index) => {
            return (
              <AutoCompleteItem key={index} item={item} removeItemHandler={removeItemHandler}/>
            );
          }
        )}
        <NewItem filterOptionsHandler={filterOptionsHandler} existingItems={items} selectNewItemHandler={addItemHandler} onBlurHandler={newItemBlurEventHandler} shouldShow={isAddingNewItem} id={id}/>
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

const NewItem = ({filterOptionsHandler, existingItems, selectNewItemHandler, onBlurHandler, shouldShow, id}) => {
  const txtBoxRef = useRef(null);
  const newItemRef = useRef(null);
  const idRef = useRef(id);
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

    if(!clickOutEventRegistered && id != null){
      idRef.current = id;
      
      document.addEventListener("click", documentClickEventListener);
      setClickOutEventRegistered(true);
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
    let clickOutElement = document.getElementById(newItemRef.current.id);

    if(clickOutElement == null) return;

    if(clickOutElement.className.includes('hidden')) return;

    // if the user is clicking into the items area of an open drop down then do nothing
    if(evnt.target == document.querySelector(`#autocompleteTextBox-${idRef.current} .autocompleteTextBox__items`)){
      txtBoxRef.current.innerText = '';
      return;
    }

    let targetElement = evnt.target;

    do {
      if (targetElement == clickOutElement) {
          return;
      }
      // Go up the DOM.
      targetElement = targetElement.parentNode;
    } while (targetElement);

    txtBoxRef.current.innerText = '';
    onBlurHandler(evnt);
  }

  const selectItemHandler = (item) => {
    txtBoxRef.current.innerText = '';
    selectNewItemHandler(item);
  }

  return (
    <div ref={newItemRef} id={`autocompleteTextBoxNewItem-${id}`} className={`autocompleteTextBoxNewItem${shouldShow ? '' : ' hidden'}`} style={{width:parentWidth, height:parentHeight}}>
      <div className="autocompleteTextBoxNewItem__container">
        <div ref={txtBoxRef} className="autocompleteTextBoxNewItem__text" contentEditable="true" onClick={evnt => evnt.stopPropagation()} onInput={evnt => newItemUpdatedEventHandler(evnt)}></div>
        <ul className="autocompleteTextBoxNewItem__list">
          {newItemsOptions.map(
            (item, index) => {
              return (
                <li key={index} className="autocompleteTextBoxNewItem__listitem" onClick={evnt => selectItemHandler(item)}>{item}</li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export default AutoCompleteTextBox;