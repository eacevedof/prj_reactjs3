import { createStore } from 'redux';
import reducer from './reducers';
import { obtenerStateStorage,  guardarStateStorage } from './localstorage';

// Definir state inicial
// const initialState = [];

// Obtener citas de localstorage
const storageState =  obtenerStateStorage();

const store = createStore(
    reducer, 
    storageState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe( () => {
    guardarStateStorage({
        citas: store.getState().citas
    })
} )

export default store;