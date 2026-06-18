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
        onChange={(e) =>
          setFile(e.target.files[0])
        }
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
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)"
          }}
        >

          <h2
            style={{
              color:
                result.ats_score >= 80
                  ? "#4CAF50"
                  : result.ats_score >= 60
                    ? "#FFC107"
                    : "#F44336"
            }}
          >
            ATS Score: {result.ats_score}
          </h2>


          <h3>Summary</h3>
          <p>{result.summary || "No Summary"}</p>

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
                    background: "#2d3748",
                    borderRadius: "20px"
                  }}
                >
                  {role}
                </span>
              )
            )}
          </div>

          <h3>Skills Found</h3>
          <div>
            {(result.skills_found || []).map((item, index) => (

              <span
                key={index}
                style={{
                  display: "inline-block",
                  margin: "5px",
                  padding: "8px 12px",
                  background: "#2d3748",
                  borderRadius: "20px"
                }}
              >
                {item}
              </span>

            ))}
          </div>

          <h3>Missing Skills</h3>
          <div>
            {(result.missing_skills || []).map(
              (skill, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    margin: "5px",
                    padding: "8px 12px",
                    background: "#7f1d1d",
                    borderRadius: "20px"
                  }}
                >
                  {skill}
                </span>
              )
            )}
          </div>

          <h3>Improvements</h3>
          <div>
            {(result.missing_skills || []).map(
              (skill, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    margin: "5px",
                    padding: "8px 12px",
                    background: "#7f1d1d",
                    borderRadius: "20px"
                  }}
                >
                  {skill}
                </span>
              )
            )}
          </div>

          <h3>Strengths</h3>
          <ul style={{ listStyle: "none" }}>
            {(result.strengths || []).map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>

          <h3>Weaknesses</h3>
          <ul style={{ listStyle: "none" }}>
            {(result.weaknesses || []).map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>

          <h3>Learning Roadmap</h3>
          <ul style={{ listStyle: "none" }}>
            {(result.learning_roadmap || []).map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>

          <hr />


        </div>
      )}
    </div>


  );
}

export default App;
