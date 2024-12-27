import React from "react";

const Question = ({
  question,
  onAnswer,
  current,
  total,
  onPrevious,
  onNext,
  currentAnswer,
}) => {
  const handleAnswerClick = (value) => {
    onAnswer(value); // Save the answer
    onNext(value); // Proceed to next question or result
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        Question {current} of {total}
      </h2>
      <p className="text-lg mb-4">{question.Question}</p>
      <div className="flex flex-col gap-4">
        <button
          className={`${
            currentAnswer === 1 ? "bg-blue-600" : "bg-blue-500"
          } text-white rounded-md p-3 hover:bg-blue-700`}
          onClick={() => handleAnswerClick(1)} // Pass the value directly
        >
          {question["Answer A"]}
        </button>
        <button
          className={`${
            currentAnswer === 4 ? "bg-green-600" : "bg-green-500"
          } text-white rounded-md p-3 hover:bg-green-700`}
          onClick={() => handleAnswerClick(4)} // Pass the value directly
        >
          {question["Answer B"]}
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-500 text-white rounded-md px-4 py-2 hover:bg-gray-600"
          onClick={onPrevious}
          disabled={current === 1} // Disable if it's the first question
        >
          Previous
        </button>
        {current !== total && (
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
            onClick={() => onNext()} // Explicit "Next" button remains for navigation clarity
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;