import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />

        <main>Content</main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
