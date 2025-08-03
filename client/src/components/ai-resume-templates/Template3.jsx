import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import PageContainer from "../PageContainer";

const Template3 = () => {
  const resumeRef = useRef(null);
  const { resumeData, setResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData);

  useEffect(() => {
    setLocalData(resumeData);
  }, [resumeData]);

  const handleFieldChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setResumeData(localData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalData(resumeData);
    setEditMode(false);
  };

  const handleEnhance = (section) => {
    console.log("Enhance requested for:", section);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar onEnhance={handleEnhance} resumeRef={resumeRef} />

        <div
          style={{
            flexGrow: 1,
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PageContainer>
            <div
              ref={resumeRef}
              style={{
                backgroundColor: "#ffffff",
                color: "#1f2937",
                width: "100%",
                fontFamily: "Georgia, serif",
              }}
            >
              {/* Header with accent color */}
              <div
                style={{
                  backgroundColor: "#1e40af",
                  color: "#ffffff",
                  padding: "2rem",
                  textAlign: "center",
                  marginBottom: "2rem",
                }}
              >
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={localData.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        backgroundColor: "transparent",
                        color: "#ffffff",
                        border: "none",
                        textAlign: "center",
                        width: "100%",
                        marginBottom: "0.5rem",
                      }}
                    />
                    <input
                      type="text"
                      value={localData.role}
                      onChange={(e) => handleFieldChange("role", e.target.value)}
                      style={{
                        fontSize: "1.25rem",
                        backgroundColor: "transparent",
                        color: "#ffffff",
                        border: "none",
                        textAlign: "center",
                        width: "100%",
                        opacity: "0.9",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                      {resumeData.name}
                    </h1>
                    <h2 style={{ fontSize: "1.25rem", opacity: "0.9" }}>
                      {resumeData.role}
                    </h2>
                  </>
                )}
              </div>

              {/* Contact Information */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "2rem",
                  marginBottom: "2rem",
                  flexWrap: "wrap",
                }}
              >
                {["location", "phone", "email", "linkedin"].map((field) =>
                  editMode ? (
                    <input
                      key={field}
                      type="text"
                      value={localData[field]}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      style={{
                        fontSize: "0.875rem",
                        padding: "0.5rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "0.25rem",
                        textAlign: "center",
                      }}
                    />
                  ) : (
                    <span key={field} style={{ fontSize: "0.875rem" }}>
                      {field === "location" && "📍 "}
                      {field === "phone" && "📞 "}
                      {field === "email" && "✉️ "}
                      {field === "linkedin" && "🔗 "}
                      {resumeData[field]}
                    </span>
                  )
                )}
              </div>

              {/* Two Column Layout */}
              <div style={{ display: "flex", gap: "2rem" }}>
                {/* Left Column */}
                <div style={{ width: "40%" }}>
                  {/* Summary */}
                  <div style={{ marginBottom: "2rem" }}>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        borderBottom: "2px solid #1e40af",
                        paddingBottom: "0.5rem",
                        marginBottom: "1rem",
                        color: "#1e40af",
                      }}
                    >
                      Professional Summary
                    </h3>
                    {editMode ? (
                      <textarea
                        value={localData.summary}
                        onChange={(e) => handleFieldChange("summary", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.25rem",
                          minHeight: "100px",
                          resize: "vertical",
                        }}
                      />
                    ) : (
                      <p style={{ lineHeight: "1.6" }}>{resumeData.summary}</p>
                    )}
                  </div>

                  {/* Skills */}
                  <div style={{ marginBottom: "2rem" }}>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        borderBottom: "2px solid #1e40af",
                        paddingBottom: "0.5rem",
                        marginBottom: "1rem",
                        color: "#1e40af",
                      }}
                    >
                      Skills
                    </h3>
                    {editMode ? (
                      <textarea
                        value={localData.skills?.join(", ") || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "skills",
                            e.target.value.split(",").map((s) => s.trim())
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.25rem",
                          minHeight: "80px",
                          resize: "vertical",
                        }}
                      />
                    ) : (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {resumeData.skills?.map((skill, idx) => (
                          <span
                            key={idx}
                            style={{
                              backgroundColor: "#1e40af",
                              color: "#ffffff",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "1rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Education */}
                  <div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        borderBottom: "2px solid #1e40af",
                        paddingBottom: "0.5rem",
                        marginBottom: "1rem",
                        color: "#1e40af",
                      }}
                    >
                      Education
                    </h3>
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} style={{ marginBottom: "1rem" }}>
                        {editMode ? (
                          <>
                            <input
                              type="text"
                              value={localData.education[idx].degree}
                              onChange={(e) => {
                                const updated = [...localData.education];
                                updated[idx].degree = e.target.value;
                                handleFieldChange("education", updated);
                              }}
                              style={{
                                fontWeight: "bold",
                                width: "100%",
                                padding: "0.25rem",
                                border: "1px solid #d1d5db",
                                borderRadius: "0.25rem",
                                marginBottom: "0.25rem",
                              }}
                            />
                            <input
                              type="text"
                              value={localData.education[idx].institution}
                              onChange={(e) => {
                                const updated = [...localData.education];
                                updated[idx].institution = e.target.value;
                                handleFieldChange("education", updated);
                              }}
                              style={{
                                width: "100%",
                                padding: "0.25rem",
                                border: "1px solid #d1d5db",
                                borderRadius: "0.25rem",
                                marginBottom: "0.25rem",
                              }}
                            />
                            <input
                              type="text"
                              value={localData.education[idx].duration}
                              onChange={(e) => {
                                const updated = [...localData.education];
                                updated[idx].duration = e.target.value;
                                handleFieldChange("education", updated);
                              }}
                              style={{
                                width: "100%",
                                padding: "0.25rem",
                                border: "1px solid #d1d5db",
                                borderRadius: "0.25rem",
                                marginBottom: "0.25rem",
                              }}
                            />
                            <input
                              type="text"
                              value={localData.education[idx].location}
                              onChange={(e) => {
                                const updated = [...localData.education];
                                updated[idx].location = e.target.value;
                                handleFieldChange("education", updated);
                              }}
                              style={{
                                width: "100%",
                                padding: "0.25rem",
                                border: "1px solid #d1d5db",
                                borderRadius: "0.25rem",
                                fontSize: "0.875rem",
                                color: "#6b7280",
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
                              {edu.degree}
                            </p>
                            <p style={{ marginBottom: "0.25rem" }}>
                              {edu.institution}
                            </p>
                            <p style={{ marginBottom: "0.25rem" }}>
                              {edu.duration}
                            </p>
                            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                              {edu.location}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div style={{ width: "60%" }}>
                  {/* Experience */}
                  <div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        borderBottom: "2px solid #1e40af",
                        paddingBottom: "0.5rem",
                        marginBottom: "1rem",
                        color: "#1e40af",
                      }}
                    >
                      Professional Experience
                    </h3>
                    {resumeData.experience.map((exp, idx) => (
                      <div key={idx} style={{ marginBottom: "2rem" }}>
                        {editMode ? (
                          <>
                            <input
                              type="text"
                              value={localData.experience[idx].title}
                              onChange={(e) => {
                                const updated = [...localData.experience];
                                updated[idx].title = e.target.value;
                                handleFieldChange("experience", updated);
                              }}
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.125rem",
                                width: "100%",
                                padding: "0.25rem",
                                border: "1px solid #d1d5db",
                                borderRadius: "0.25rem",
                                marginBottom: "0.5rem",
                              }}
                            />
                            <input
                              type="text"
                              value={localData.experience[idx].companyName}
                              onChange={(e) => {
                                const updated = [...localData.experience];
                                updated[idx].companyName = e.target.value;
                                handleFieldChange("experience", updated);
                              }}
                              style={{
                                width: "100%",
                                padding: "0.25rem",
                                border: "1px solid #d1d5db",
                                borderRadius: "0.25rem",
                                marginBottom: "0.25rem",
                              }}
                            />
                            <input
                              type="text"
                              value={localData.experience[idx].date}
                              onChange={(e) => {
                                const updated = [...localData.experience];
                                updated[idx].date = e.target.value;
                                handleFieldChange("experience", updated);
                              }}
                              style={{
                                width: "100%",
                                padding: "0.25rem",
                                border: "1px solid #d1d5db",
                                borderRadius: "0.25rem",
                                marginBottom: "0.25rem",
                              }}
                            />
                            <input
                              type="text"
                              value={localData.experience[idx].companyLocation}
                              onChange={(e) => {
                                const updated = [...localData.experience];
                                updated[idx].companyLocation = e.target.value;
                                handleFieldChange("experience", updated);
                              }}
                              style={{
                                width: "100%",
                                padding: "0.25rem",
                                border: "1px solid #d1d5db",
                                borderRadius: "0.25rem",
                                marginBottom: "0.5rem",
                                fontSize: "0.875rem",
                                color: "#6b7280",
                              }}
                            />
                            <textarea
                              value={localData.experience[idx].accomplishment.join("\n")}
                              onChange={(e) => {
                                const updated = [...localData.experience];
                                updated[idx].accomplishment = e.target.value
                                  .split("\n")
                                  .filter(Boolean);
                                handleFieldChange("experience", updated);
                              }}
                              style={{
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid #d1d5db",
                                borderRadius: "0.25rem",
                                minHeight: "80px",
                                resize: "vertical",
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <h4
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.125rem",
                                marginBottom: "0.5rem",
                                color: "#1e40af",
                              }}
                            >
                              {exp.title}
                            </h4>
                            <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                              {exp.companyName}
                            </p>
                            <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                              {exp.date} | {exp.companyLocation}
                            </p>
                            <ul style={{ paddingLeft: "1.5rem" }}>
                              {exp.accomplishment.map((item, i) => (
                                <li key={i} style={{ marginBottom: "0.25rem", lineHeight: "1.5" }}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </PageContainer>

          {/* Buttons */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  style={{
                    backgroundColor: "#16a34a",
                    color: "#ffffff",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.375rem",
                    margin: "0 0.5rem",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    backgroundColor: "#9ca3af",
                    color: "#ffffff",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.375rem",
                    margin: "0 0.5rem",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                style={{
                  backgroundColor: "#1e40af",
                  color: "#ffffff",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  margin: "0 0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3; 