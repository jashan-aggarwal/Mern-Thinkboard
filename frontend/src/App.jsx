import React from "react"
import { Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import CreatePage from "./pages/CreatePage.jsx"
import DetailPage from "./pages/DetailPage.jsx"

const App = () => {
  return (
    <div data-theme="dracula">
      <Routes>
        <Route path="/" element={<HomePage key="home" />} />
        <Route path="/create" element={<CreatePage key="create" />} />
        <Route path="/note/:id" element={<DetailPage key="detail" />} />
      </Routes>
    </div>
  );
};

export default App;
