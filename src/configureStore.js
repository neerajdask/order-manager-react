import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { verifyAuth } from "./actions";
import rootReducer from "./reducers";

export default function configureStore(persistedState) {
  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
  );
  store.dispatch(verifyAuth());
  return store;
}
