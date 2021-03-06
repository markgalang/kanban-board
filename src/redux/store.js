import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import BoardReducer from "./reducers/BoardReducers";
import ModalReducer from "./reducers/ModalReducers";
import UserReducer from "./reducers/UserReducers";

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  board: BoardReducer,
  modals: ModalReducer,
  authenticatedUser: UserReducer,
});

const Store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default Store;
