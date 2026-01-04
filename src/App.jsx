import { useState } from "react";
import Quiz from "./components/Quiz";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "min-h-screen bg-gray-900 text-white" : "min-h-screen bg-gray-100 text-black"}>
      
      <div className="max-w-screen-lg mx-auto py-6 text-right">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-black text-white px-4 py-1 rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
<h1 className="text-center text-5xl md:text-6xl font-extrabold text-blue-500 tracking-wide mb-6">
  Quiz App
</h1>


      <Quiz darkMode={darkMode} />
    </div>
  );
}

export default App;
