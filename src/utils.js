import Papa from "papaparse";
import { marked } from "marked";

export const loadCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => resolve(results.data),
          error: (error) => reject(error),
        });
      })
      .catch((error) => reject(error));
  });
};

export const renderMarkdown = (markdownText) => {
  try {
    return marked(markdownText, { breaks: true, gfm: true }); // Add options for better rendering
  } catch (error) {
    console.error("Markdown rendering error:", error);
    return "<p>Error rendering content</p>";
  }
};

