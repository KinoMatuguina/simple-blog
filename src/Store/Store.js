import React, {createContext, useReducer} from 'react';
import Blogs from '../Model/Blogs'
const initialState = Blogs;
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'add':
        let addNewState = state
        addNewState.push(action.payload)
        return addNewState;
      case 'edit':
        let editedState = state;
        let getEditedIndex = state.findIndex((curr) => {
            return curr.id == action.id
        })
        editedState.splice(getEditedIndex, 1, action.payload)
        return editedState
      case 'delete':
        let deletedState = state;

        let getDeletedIndex = state.findIndex((curr) => {
            return curr.id == action.id
        })
        deletedState.splice(getDeletedIndex, 1)
        return deletedState
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }