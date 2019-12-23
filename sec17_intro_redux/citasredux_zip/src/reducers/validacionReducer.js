const initialState = {
    error: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'VALIDAR_FORMULARIO': 
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}