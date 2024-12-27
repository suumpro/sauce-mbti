import React, { useEffect, useState } from "react";
import { renderMarkdown } from "../utils";

const Result = ({ answers, questions, onRestart }) => {
  const [markdownContent, setMarkdownContent] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

  const calculateScores = () => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    Object.entries(answers).forEach(([index, value]) => {
      const question = questions[index];
      const dimensionA = question["Correct Question A"]?.slice(-1);
      const dimensionB = question["Correct Question B"]?.slice(-1);

      if (value <= 2) scores[dimensionA] += 3 - value;
      else scores[dimensionB] += value - 2;
    });

    return scores;
  };

  const determineMBTIType = (scores) => {
    return [
      scores.E > scores.I ? "E" : "I",
      scores.S > scores.N ? "S" : "N",
      scores.T > scores.F ? "T" : "F",
      scores.J > scores.P ? "J" : "P",
    ].join("");
  };

  const scores = calculateScores();
  const mbtiType = determineMBTIType(scores);

  useEffect(() => {
    const fetchMarkdown = async (fileName) => {
      try {
        const response = await fetch(`/markdown/${fileName}.md`);
        if (!response.ok) throw new Error("Failed to fetch markdown");
        const text = await response.text();
        setMarkdownContent(renderMarkdown(text));
      } catch (error) {
        console.error("Markdown fetch error:", error);
        setMarkdownContent("<p>Unable to load result content</p>");
      }
    };

    const fetchImage = async (fileName) => {
      try {
        const imagePath = `/images/${fileName}.webp`;
        const response = await fetch(imagePath);
        if (!response.ok) throw new Error("Image not found");
        setImageSrc(imagePath);
      } catch (error) {
        console.error("Image fetch error:", error);
        setImageSrc("/images/default.webp");
      }
    };

    fetchMarkdown(mbtiType);
    fetchImage(mbtiType);
  }, [mbtiType]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Your MBTI Type: {mbtiType}</h2>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={mbtiType}
          className="result-image mx-auto mb-4"
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: markdownContent }}
        className="text-left"
      />
      <button
        className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600"
        onClick={onRestart}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Result;