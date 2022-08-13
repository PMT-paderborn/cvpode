import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Search from "./screens/Search";

function App() {
  return (
    <div className="app-container">
      <div className="app-wrapper">
        <Search />
      </div>
    </div>
  );
}

export default App;
