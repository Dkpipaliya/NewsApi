import logo from "./logo.svg";
import "./App.css";
import Register from "./Componet/Register";
import NewsApi from "./NewsApi/NewsApi";

function App() {
  return (
    <div className="App">
      <NewsApi />
    </div>
  );
}

export default App;
