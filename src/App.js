import './App.css';
import React from "react";
import DataTableMain from "./components/DataTabel/DataTabel";

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

function App() {
  return (
    <div className="App">
      <DataTableMain/>
    </div>
  );
}

export default App;
