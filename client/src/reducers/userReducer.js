import { GET_USER, UPDATE_USER } from "../actions/userActions";

const initialState = {
    errors: '',
    success: ''
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPDATE_USER:
            return {
                ...state,
                data: action.payload,
                errors: action.error,
                success: action.success
            };   
        default:
            return state;
    }
}