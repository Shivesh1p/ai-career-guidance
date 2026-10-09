import { useState } from "react";
import axios from "axios";
import { Briefcase, Brain, Map, ChevronRight, Loader2, Sparkles, Upload, FileText } from "lucide-react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("manual");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [guidance, setGuidance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!skills.trim() || !experience.trim()) {
      setError("Please fill in both fields!");
      return;
    }
    setLoading(true);
    setError("");
    setGuidance("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze", {
        skills,
        experience,
      });
      setGuidance(response.data.guidance);
    } catch (err) {
      setError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleResumeAnalyze = async () => {
    if (!resumeFile) {
      setError("Please upload a PDF resume!");
      return;
    }
    setLoading(true);
    setError("");
    setGuidance("");
    try {
      const formData = new FormData();
      formData.append("file", resumeFile);
      const response = await axios.post(
        "http://127.0.0.1:8000/analyze-resume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setGuidance(response.data.guidance);
    } catch (err) {
      setError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const formatGuidance = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <h3 key={i} className="section-title">{line.replace(/\*\*/g, "")}</h3>;
      }
      if (line.match(/^\d\./)) {
        return <p key={i} className="numbered-item">{line.replace(/\*\*/g, "")}</p>;
      }
      if (line.startsWith("*")) {
        return <p key={i} className="bullet-item">{line.replace(/\*/g, "•")}</p>;
      }
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} className="normal-text">{line.replace(/\*\*/g, "")}</p>;
    });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Sparkles size={28} className="logo-icon" />
            <span>CareerAI</span>
          </div>
          <p className="tagline">AI-Powered Career Guidance System</p>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <h1>Discover Your <span className="gradient-text">Dream Career</span></h1>
        <p>Enter your skills or upload your resume — our AI will craft a personalized career roadmap just for you.</p>
      </section>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "manual" ? "active" : ""}`}
          onClick={() => { setActiveTab("manual"); setGuidance(""); setError(""); }}
        >
          <Brain size={16} /> Manual Input
        </button>
        <button
          className={`tab ${activeTab === "resume" ? "active" : ""}`}
          onClick={() => { setActiveTab("resume"); setGuidance(""); setError(""); }}
        >
          <FileText size={16} /> Upload Resume
        </button>
      </div>

      {/* Input Section */}
      <section className="input-section">
        <div className="card">
          {activeTab === "manual" ? (
            <>
              <div className="input-group">
                <label><Brain size={18} /> Your Skills</label>
                <textarea
                  placeholder="e.g. Python, React, Machine Learning, LangChain, NLP..."
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="input-group">
                <label><Briefcase size={18} /> Your Experience & Projects</label>
                <textarea
                  placeholder="e.g. Built a RAG-Based QA System, NLP Chatbot, Final year B.E. IT student..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  rows={4}
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button
                className={`analyze-btn ${loading ? "loading" : ""}`}
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 size={20} className="spin" /> Analyzing your profile...</>
                ) : (
                  <><ChevronRight size={20} /> Analyze My Career</>
                )}
              </button>
            </>
          ) : (
            <>
              <div className="upload-area"
                onClick={() => document.getElementById("resume-input").click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type === "application/pdf") setResumeFile(file);
                }}
              >
                <Upload size={40} className="upload-icon" />
                <p className="upload-text">
                  {resumeFile ? resumeFile.name : "Click or drag & drop your PDF resume here"}
                </p>
                <p className="upload-hint">Only PDF files supported</p>
                <input
                  id="resume-input"
                  type="file"
                  accept=".pdf"
                  style={{ display: "none" }}
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button
                className={`analyze-btn ${loading ? "loading" : ""}`}
                onClick={handleResumeAnalyze}
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 size={20} className="spin" /> Analyzing your resume...</>
                ) : (
                  <><Upload size={20} /> Analyze My Resume</>
                )}
              </button>
            </>
          )}
        </div>
      </section>

      {/* Result */}
      {guidance && (
        <section className="result-section">
          <div className="result-header">
            <Map size={24} />
            <h2>Your Personalized Career Roadmap</h2>
          </div>
          <div className="result-card">
            {formatGuidance(guidance)}
          </div>
        </section>
      )}

      <footer className="footer">
        <p>Built with ❤️ using React + FastAPI + Llama 3.3</p>
      </footer>
    </div>
  );
}

export default App;