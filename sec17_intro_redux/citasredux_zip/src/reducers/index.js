import { combineReducers } from 'redux'; 
import citasReducer from './citasReducer';
import validacionReducer from './validacionReducer';

export default combineReducers({
    citas: citasReducer,
    error: validacionReducer
});