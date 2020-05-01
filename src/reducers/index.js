import { combineReducers } from 'redux';

const INITIAL_STATE = {
    shortcutList: [],
    areaList: ['Allie',
        'Gator',
        'Lizzie',
        'Reptar'],
    deviceList: []
}

const rootReducer = (state = INITIAL_STATE, action) => {
    return INITIAL_STATE;
};

export default combineReducers({
    rootReducer
})