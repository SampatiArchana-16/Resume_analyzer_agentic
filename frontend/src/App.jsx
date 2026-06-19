import { useState } from "react";
import axios from "./api";

import {
    FaChartLine,
    FaTools,
    FaExclamationTriangle,
    FaBriefcase
} from "react-icons/fa";

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

            setResult(res.data);

        } catch (error) {
            console.error(error);
            alert("Error while analyzing resume");
        } finally {
            setLoading(false);
        }
    };

    const Chip = ({ text, color }) => (
        <span
            style={{
                display: "inline-block",
                margin: "5px",
                padding: "8px 14px",
                borderRadius: "20px",
                background: color,
                color: "white",
                fontSize: "14px",
            }}
        >
            {text}
        </span>
    );

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#0f172a,#1e293b,#312e81)",
                color: "white",
                padding: "30px",
                fontFamily: "Arial",
            }}
        >
            <div
                style={{
                    maxWidth: "1100px",
                    margin: "auto",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        fontSize: "50px",
                        marginBottom: "10px",

                    }}
                >
                    Resume Analyzer Agent
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#cbd5e1",
                        marginBottom: "40px",
                       
                        marginTop: "30px"
                    }}
                >
                    Upload Resume • ATS Analysis • Career Guidance • Learning Roadmap
                </p>

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
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
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "8px",
                            background: "#2563eb",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        {loading ? "Analyzing..." : "Analyze"}
                    </button>
                </div>

                {loading && (
                    <h2 style={{ textAlign: "center" }}>
                        🤖 AI is analyzing your resume...
                    </h2>
                )}

                {result && (
                    <>
                        {/* DASHBOARD CARDS */}

                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                marginBottom: "30px",
                            }}
                        >
                            <div style={cardStyle}>
                                <FaChartLine size={35} />
                                <h3>ATS Score</h3>
                                <h1>{result.ats_score}</h1>
                            </div>

                            <div style={cardStyle}>
                                <FaTools size={35} />
                                <h3>Skills</h3>



                                <h1>
                                    {(result.skills_found || []).length}
                                </h1>
                            </div>

                            <div style={cardStyle}>
                                <FaExclamationTriangle size={35} />
                                <h3>Missing Skills</h3>
                                <h1>
                                    {(result.missing_skills || []).length}
                                </h1>
                            </div>

                            <div style={cardStyle}>
                                <FaBriefcase size={35} />
                                <h3>Roles</h3>
                                <h1>
                                    {(result.recommended_roles || []).length}
                                </h1>
                            </div>
                        </div>

                        {/* ATS BAR */}

                        <div
                            style={{
                                background: "#1e293b",
                                padding: "20px",
                                borderRadius: "15px",
                                marginBottom: "25px",
                            }}
                        >
                            <h2>
                                ATS Score: {result.ats_score}
                            </h2>

                            <div
                                style={{
                                    width: "100%",
                                    height: "25px",
                                    background: "#334155",
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        width: `${result.ats_score}%`,
                                        height: "100%",
                                        background:
                                            result.ats_score >= 80
                                                ? "#22c55e"
                                                : result.ats_score >= 60
                                                    ? "#f59e0b"
                                                    : "#ef4444",
                                        textAlign: "center",
                                        lineHeight: "25px",
                                    }}
                                >
                                    {result.ats_score}%
                                </div>
                            </div>
                        </div>

                        {/* SUMMARY */}

                        <Section title="Summary">
                            <p>{result.summary}</p>
                        </Section>

                        {/* ROLES */}

                        <Section title="Recommended Roles">
                            {(result.recommended_roles || []).map(
                                (role, index) => (
                                    <Chip
                                        key={index}
                                        text={role}
                                        color="#4f46e5"
                                    />
                                )
                            )}
                        </Section>

                        {/* SKILLS */}

                        <Section title="Skills Found">
                            {(result.skills_found || []).map(
                                (item, index) => (
                                    <Chip
                                        key={index}
                                        text={item}
                                        color="#2563eb"
                                    />
                                )
                            )}
                        </Section>

                        {/* MISSING */}

                        <Section title="Missing Skills">
                            {(result.missing_skills || []).map(
                                (item, index) => (
                                    <Chip
                                        key={index}
                                        text={item}
                                        color="#dc2626"
                                    />
                                )
                            )}
                        </Section>

                        {/* IMPROVEMENTS */}

                        <Section title="Improvements">
                            {(result.improvements || []).map(
                                (item, index) => (
                                    <Chip
                                        key={index}
                                        text={item}
                                        color="#7c3aed"
                                    />
                                )
                            )}
                        </Section>

                        {/* STRENGTHS */}

                        <Section title="Strengths">
                            {(result.strengths || []).map(
                                (item, index) => (
                                    <Chip
                                        key={index}
                                        text={item}
                                        color="#16a34a"
                                    />
                                )
                            )}
                        </Section>

                        {/* WEAKNESSES */}

                        <Section title="Weaknesses">
                            {(result.weaknesses || []).map(
                                (item, index) => (
                                    <Chip
                                        key={index}
                                        text={item}
                                        color="#b91c1c"
                                    />
                                )
                            )}
                        </Section>

                        {/* ROADMAP */}

                        <Section title="Learning Roadmap">
                            {(result.learning_roadmap || []).map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            background: "#334155",
                                            padding: "15px",
                                            borderRadius: "10px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        📚 {item}
                                    </div>
                                )
                            )}
                        </Section>
                    </>
                )}
                <div
                    style={{
                        textAlign: "center",
                        marginTop: "40px",
                        color: "#94a3b8"
                    }}
                >
                    Built with React + FastAPI + OpenAI
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div
            style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "15px",
                marginBottom: "20px",
            }}
        >
            <h2>{title}</h2>
            {children}
        </div>
    );
}

const cardStyle = {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
    transition: "0.3s",
    cursor: "pointer"
};

export default App;