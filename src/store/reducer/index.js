import { combineReducers } from "redux";
import { productReducer } from "./product";

const rootReducer = combineReducers({
  products: productReducer,
});

export { rootReducer };
