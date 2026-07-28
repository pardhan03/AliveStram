import { combineReducers } from "redux";
import authReducer from "./user/authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;