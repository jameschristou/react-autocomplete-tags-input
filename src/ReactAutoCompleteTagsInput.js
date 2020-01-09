import './sass/autoCompleteTextbox.scss';

import React, {useState, useRef, useEffect} from "react";

const ReactAutoCompleteTagsInput = ({items, addItemHandler, deleteItemHandler, filterOptionsHandler, emptyTagsText}) => {
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const itemsContainer = useRef();
  const [id, setId] = useState(null);

  useEffect(() => {
    console.log('useEffect:AutoCompleteTextBox');

    if(id == null){
      setId(generateRandomId());
    }
  });

  const generateRandomId = () => {
    // generates a random 5 digit id which should be enough to prevent conflict between many instances of 
    // this component on the one page
    return Math.floor(Math.random()*10000);
  }

  const toggleAddNewItemClickHandler = (evnt) => {
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

  const selectNewItemHandler = (item) => {
    console.log('Adding item');

    addItemHandler(item);

    setIsAddingNewItem(false);
  }

  const newItemBlurEventHandler = (evnt) => {
    evnt.stopPropagation();

    setIsAddingNewItem(false);
    console.log('newItemBlurEventHandler');
  }

  return (
    <div className="autocompleteTextBox" id={`autocompleteTextBox-${id}`}>
      <div ref={itemsContainer} className={`autocompleteTextBox__items${isAddingNewItem ? ' autocompleteTextBox__items-active' : ''}`} onClick={evnt => toggleAddNewItemClickHandler(evnt)} >
        <Items items={items} deleteItemHandler={deleteItemHandler} emptyTagsText={emptyTagsText}/>
        <AddNewItemButton shouldShow={!isAddingNewItem} onClickHandler={toggleAddNewItemClickHandler}/>
        <NewItem filterOptionsHandler={filterOptionsHandler} selectedItems={items} selectNewItemHandler={selectNewItemHandler} onBlurHandler={newItemBlurEventHandler} shouldShow={isAddingNewItem} id={id}/>
      </div>
    </div>
  );
}

const Items = ({items, deleteItemHandler, emptyTagsText}) => {
  if(items.length == 0){
    return (
      <span className="autocompleteTextBoxNoItems__text">{!emptyTagsText || emptyTagsText.trim().length == 0 ? "None" : emptyTagsText}</span>
    );
  }

  return (
    <React.Fragment>
      {items.map(
        (item, index) => {
          return (
            <AutoCompleteItem key={index} item={item} deleteItemHandler={deleteItemHandler}/>
          );
        }
      )}
    </React.Fragment>
  );
}

const AddNewItemButton = ({shouldShow, onClickHandler}) => {
  return (
    <div className={`autocompleteTextBoxItem${shouldShow ? '' : ' hidden'}`}>
      <button className="autocompleteTextBoxAddBtn" onClick={evnt => onClickHandler(evnt)}>+</button>
    </div>
  )
}

const AutoCompleteItem = ({itemIndex, item, deleteItemHandler}) => {
  return (
    <div className="autocompleteTextBoxItem" onClick={evnt => evnt.stopPropagation()}>
      <span className="autocompleteTextBoxItem__text">{item}</span>
      <button className="autocompleteTextBoxItem__remove" onClick={event => deleteItemHandler(item)}>
        <svg width="26" height="26" viewBox="-1 -2 26 26" focusable="false" role="presentation">
          <path d="M12 10.586L6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586z"></path>
        </svg>
      </button>
    </div>
  );
}

const NewItem = ({filterOptionsHandler, selectedItems, selectNewItemHandler, onBlurHandler, shouldShow, id}) => {
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
    let notSelectedOptions = options.filter(o => selectedItems.indexOf(o) < 0);

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
    if(evnt.target == document.querySelector(`#autocompleteTextBox-${idRef.current} .autocompleteTextBox__items`)
      || evnt.target == document.querySelector(`#autocompleteTextBox-${idRef.current} .autocompleteTextBoxAddBtn`)){
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

export default ReactAutoCompleteTagsInput;