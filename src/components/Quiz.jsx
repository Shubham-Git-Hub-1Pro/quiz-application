import { useEffect, useState } from "react";
import questionsData from "../data/questions";

function Quiz({ darkMode }) {
  const categories = ["All", ...Object.keys(questionsData)];
  const allQuestions = Object.values(questionsData).flat();

  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [selected, setSelected] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [finished, setFinished] = useState(false);

  const filteredQuestions =
    category === "All" ? allQuestions : questionsData[category];

  /* TIMER */
  useEffect(() => {
    if (time === 0) {
      setShowNext(true);
      return;
    }
    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const handleOptionClick = (option) => {
    if (selected) return;

    setSelected(option);
    setShowNext(true);

    if (option === filteredQuestions[index].answer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (index + 1 < filteredQuestions.length) {
      setIndex(index + 1);
      setTime(15);
      setSelected(null);
      setShowNext(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className={`max-w-xl mx-auto mt-20 p-8 rounded-lg text-center ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
        <h1 className="text-3xl font-bold">Quiz Finished 🎉</h1>
        <p className="mt-3 text-xl">Score: {score} / {filteredQuestions.length}</p>
      </div>
    );
  }

  const correctAnswer = filteredQuestions[index].answer;
  const progress = (time / 15) * 100;

  let timerColor = "#22c55e";
  if (progress <= 60) timerColor = "#eab308";
  if (progress <= 30) timerColor = "#ef4444";

  return (
    <div className={`max-w-xl mx-auto mt-8 p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      
      {/* CATEGORY */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setIndex(0);
              setScore(0);
              setTime(15);
              setSelected(null);
              setShowNext(false);
              setFinished(false);
            }}
            className={`px-3 py-1 rounded text-sm ${
              category === cat
                ? "bg-blue-500 text-white"
                : darkMode
                ? "bg-gray-600"
                : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TIMER */}
      <div className="flex justify-center mb-2">
        <svg className="w-20 h-20">
          <circle cx="40" cy="40" r="35" stroke="#e5e7eb" strokeWidth="5" fill="none" />
          <circle
            cx="40"
            cy="40"
            r="35"
            stroke={timerColor}
            strokeWidth="5"
            fill="none"
            strokeDasharray="220"
            strokeDashoffset={220 - (220 * progress) / 100}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
      </div>

      <p className="text-center text-red-500 font-semibold">Time Left: {time}s</p>

      <h2 className="text-lg mt-4 font-bold">{filteredQuestions[index].question}</h2>

      {/* OPTIONS */}
      <div className="mt-4 space-y-3">
        {filteredQuestions[index].options.map((option, i) => {
          const isCorrect = option === correctAnswer;
          const isSelected = option === selected;

          return (
            <button
              key={i}
              onClick={() => handleOptionClick(option)}
              className={`w-full border p-3 rounded text-left transition-all duration-300
                ${
                  selected
                    ? isCorrect
                      ? "bg-green-100 border-green-500 scale-105"
                      : isSelected
                      ? "bg-red-100 border-red-500 shake"
                      : "opacity-60"
                    : ""
                }
              `}
            >
              {option}
              {selected && isCorrect && <span className="float-right">✔</span>}
              {selected && isSelected && !isCorrect && <span className="float-right">✖</span>}
            </button>
          );
        })}
      </div>

      {/* NEXT BUTTON */}
      <button
        onClick={nextQuestion}
        disabled={!showNext}
        className={`mt-5 px-5 py-2 rounded transition-all duration-300
          ${
            showNext
              ? "bg-blue-500 text-white hover:scale-105 hover:shadow-lg"
              : "bg-blue-500 text-white opacity-40 cursor-not-allowed blur-[1px]"
          }
        `}
      >
        Next →
      </button>
    </div>
  );
}

export default Quiz;
