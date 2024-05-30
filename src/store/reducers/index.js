/* eslint-disable prettier/prettier */
// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import account from './account';
import topic from './topic';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu: menu,
    account: account,
    topic: topic
});

export default reducers;
