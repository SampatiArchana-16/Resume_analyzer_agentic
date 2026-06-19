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

      const res = await axios.post(
        "/analyze",
        formData
      );

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
        maxWidth: "1000px",
        margin: "auto",
        padding: "30px",
        color: "white",
        fontFamily: "Arial"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        Resume Analyzer Agent
      </h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
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
            marginLeft: "10px",
            padding: "8px 16px",
            cursor: "pointer"
          }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {result && (
        <div
          style={{
            background: "#1e1e2f",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
          }}
        >
          {/* ATS SCORE */}

          <h2
            style={{
              textAlign: "center",
              color:
                result.ats_score >= 80
                  ? "#22c55e"
                  : result.ats_score >= 60
                  ? "#f59e0b"
                  : "#ef4444"
            }}
          >
            ATS Score: {result.ats_score}
          </h2>

          {/* Progress Bar */}

          <div
            style={{
              width: "100%",
              background: "#333",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "25px"
            }}
          >
            <div
              style={{
                width: `${result.ats_score || 0}%`,
                background:
                  result.ats_score >= 80
                    ? "#22c55e"
                    : result.ats_score >= 60
                    ? "#f59e0b"
                    : "#ef4444",
                color: "white",
                textAlign: "center",
                padding: "8px"
              }}
            >
              {result.ats_score}%
            </div>
          </div>

          {/* SUMMARY */}

          <h3>Summary</h3>

          <p
            style={{
              lineHeight: "1.7"
            }}
          >
            {result.summary}
          </p>

          {/* ROLES */}

          <h3>Recommended Roles</h3>

          <div>
            {(result.recommended_roles || []).map(
              (role, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    margin: "5px",
                    padding: "8px 12px",
                    background: "#374151",
                    borderRadius: "20px"
                  }}
                >
                  {role}
                </span>
              )
            )}
          </div>

          {/* SKILLS */}

          <h3>Skills Found</h3>

          <div>
            {(result.skills_found || []).map(
              (item, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    margin: "5px",
                    padding: "8px 12px",
                    background: "#2563eb",
                    borderRadius: "20px"
                  }}
                >
                  {item}
                </span>
              )
            )}
          </div>

          {/* MISSING SKILLS */}

          <h3>Missing Skills</h3>

          <div>
            {(result.missing_skills || []).map(
              (item, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    margin: "5px",
                    padding: "8px 12px",
                    background: "#dc2626",
                    borderRadius: "20px"
                  }}
                >
                  {item}
                </span>
              )
            )}
          </div>

          {/* IMPROVEMENTS */}

          <h3>Improvements</h3>

          <div>
            {(result.improvements || []).map(
              (item, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    margin: "5px",
                    padding: "8px 12px",
                    background: "#7c3aed",
                    borderRadius: "20px"
                  }}
                >
                  {item}
                </span>
              )
            )}
          </div>

          {/* STRENGTHS */}

          <h3>Strengths</h3>

          <div>
            {(result.strengths || []).map(
              (item, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    margin: "5px",
                    padding: "8px 12px",
                    background: "#16a34a",
                    borderRadius: "20px"
                  }}
                >
                  {item}
                </span>
              )
            )}
          </div>

          {/* WEAKNESSES */}

          <h3>Weaknesses</h3>

          <div>
            {(result.weaknesses || []).map(
              (item, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    margin: "5px",
                    padding: "8px 12px",
                    background: "#991b1b",
                    borderRadius: "20px"
                  }}
                >
                  {item}
                </span>
              )
            )}
          </div>

          {/* LEARNING ROADMAP */}

          <h3>Learning Roadmap</h3>

          <div>
            {(result.learning_roadmap || []).map(
              (item, index) => (
                <div
                  key={index}
                  style={{
                    background: "#374151",
                    padding: "12px",
                    marginTop: "10px",
                    borderRadius: "10px"
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;