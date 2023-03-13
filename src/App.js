import React, { useState } from "react";
import Result from "./Result";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [file, setFile] = useState("");
  const [label, setLabel] = useState("");
  const [tags, setTags] = useState([]);

  const handleTitle = () => {
    window.location.href = "/";
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const handleAddTag = () => {
    if (label !== "") {
      setTags([...tags, label]);
      setLabel("");
    }
  };

  const handleDeleteTag = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("label", tags.join(","));
    fetch(
      process.env.REACT_APP_API_URL,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error(error);
        alert("Form submission failed. Please try again.");
      });
  };

  return (
    <div>
      <h1 onClick={handleTitle}>Annotation with AI</h1>
      {result === null ? (
        <div>
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <label htmlFor="file">UPLOAD FILE</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
            />
            <label htmlFor="label">LABEL</label>
            <div className="tag-input">
              <input
                type="text"
                id="label"
                name="label"
                value={label}
                onChange={handleLabelChange}
              />
              <button type="button" onClick={handleAddTag}>
                ADD
              </button>
            </div>
            <div id="tag-list">
              {tags.map((tag) => (
                <div className="tag" key={tag}>
                  <span className="tag-label">{tag}</span>
                  <button
                    type="button"
                    className="tag-delete"
                    onClick={() => handleDeleteTag(tag)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button type="submit" id="submit">
              SUBMIT
            </button>
          </form>
        </div>
      ) : (
        <Result result={result} />
      )}
    </div>
  );
}

export default App;
