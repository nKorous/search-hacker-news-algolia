import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Home } from "./components/home/home";
import { store } from "./redux/redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
