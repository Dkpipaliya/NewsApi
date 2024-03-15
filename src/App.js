import "./App.css";
import NewsApi from "./NewsApi/NewsApi";
import Navbar from "./NewsApi/Navbar";
import Fotter from "./NewsApi/Fotter";

function App() {
  return (
    <div className="App">
        <Navbar />
        <NewsApi />
        <Fotter />
      
    </div>
  );
}

export default App;
