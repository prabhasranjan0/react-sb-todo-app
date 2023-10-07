import { Provider } from "react-redux";
import "./App.css";
import Router from "./router";
import store from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
