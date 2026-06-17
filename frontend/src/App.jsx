import { useState } from "react";
import axios from "./api";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "/analyze",
        formData
      );

      console.log("API RESPONSE:");
      console.log(res.data);

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
        padding: "30px",
        fontFamily: "Arial"
      }}
    >
      <h1>Resume Analyzer Agent</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button
        onClick={uploadResume}
        style={{
          marginLeft: "10px"
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>

          {/* ATS SCORE */}

          <h2>
            ATS Score:
            {" "}
            {result.ats_score || "N/A"}
          </h2>

          {/* SKILLS FOUND */}

          <h3>Skills Found</h3>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {(result.skills_found || []).map((skill, index) => (
              <li key={index}>
                {skill}
              </li>
            ))}
          </ul>

          {/* MISSING SKILLS */}

          <h3>Missing Skills</h3>

          <ul>
            {(result.missing_skills || []).map(
              (skill, index) => (
                <li key={index}>
                  {skill}
                </li>
              )
            )}
          </ul>

          {/* IMPROVEMENTS */}

          <h3>Improvements</h3>

          <ul>
            {(result.improvements || []).map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

          {/* DEBUG */}

          {result.error && (
            <>
              <h3>Error</h3>
              <pre>
                {JSON.stringify(
                  result,
                  null,
                  2
                )}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;