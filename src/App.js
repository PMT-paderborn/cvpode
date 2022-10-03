import { useState } from "react";
import Search from "./screens/Search";
import Input from "./screens/Input";
import "./App.css";

function App() {
  const [hasSearchResults, setHasSearchResults] = useState(false);

  return (
    <div className="app-container" style={{ minHeight: hasSearchResults ? "500px" : "150px" }}>
      <div className="app-wrapper">
        <Input />
        {/* <Search setHasSearchResults={setHasSearchResults} /> */}
      </div>
    </div>
  );
}

export default App;
