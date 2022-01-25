import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, History, Quiz } from "./pages";
import { Header } from "./components/header";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
