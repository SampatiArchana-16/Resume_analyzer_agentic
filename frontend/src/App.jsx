import { useState } from "react";
import axios from "./api";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/analyze", formData);

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Error while analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "30px",
        color: "white",
        fontFamily: "Arial"
      }}
    >
      <h1>Resume Analyzer Agent</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadResume}
        style={{ marginLeft: "10px" }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "20px",
            background: "#1e1e2f",
            padding: "25px",
            borderRadius: "12px"
          }}
        >
          <h2>ATS Score: {result.ats_score}</h2>

          <h3>Summary</h3>
          <p>{result.summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;