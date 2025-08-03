import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import PageContainer from "../PageContainer";

const Template17 = () => {
  const resumeRef = useRef(null);
  const { resumeData, setResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Number of experience items per page

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

  // Calculate pagination
  const totalExperienceItems = localData.experience?.length || 0;
  const totalPages = Math.ceil(totalExperienceItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExperienceItems = localData.experience?.slice(startIndex, endIndex) || [];

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
                maxWidth: "8.5in",
                minHeight: "11in",
                padding: "1in",
                margin: "0 auto",
                position: "relative",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {/* Header with different style */}
              <div
                style={{
                  backgroundColor: "#6366f1",
                  color: "#ffffff",
                  padding: "2rem",
                  textAlign: "center",
                  marginBottom: "2rem",
                  borderRadius: "8px",
                }}
              >
                <div style={{ flex: 1 }}>
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={localData.name || ""}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        style={{
                          fontSize: "2.5rem",
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                          width: "100%",
                          backgroundColor: "transparent",
                          color: "#ffffff",
                          border: "none",
                          textAlign: "center",
                        }}
                      />
                      <input
                        type="text"
                        value={localData.role || ""}
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
                        {localData.name || "Your Name"}
                      </h1>
                      <p style={{ fontSize: "1.25rem", opacity: "0.9" }}>
                        {localData.role || "Your Role"}
                      </p>
                    </>
                  )}
                </div>
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
                      value={localData[field] || ""}
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
                      {localData[field] || field}
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
                        borderBottom: "2px solid #6366f1",
                        paddingBottom: "0.5rem",
                        marginBottom: "1rem",
                        color: "#6366f1",
                      }}
                    >
                      Professional Summary
                    </h3>
                    {editMode ? (
                      <textarea
                        value={localData.summary || ""}
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
                      <p style={{ lineHeight: "1.6" }}>
                        {localData.summary || "Your professional summary here..."}
                      </p>
                    )}
                  </div>

                  {/* Skills */}
                  <div style={{ marginBottom: "2rem" }}>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        borderBottom: "2px solid #6366f1",
                        paddingBottom: "0.5rem",
                        marginBottom: "1rem",
                        color: "#6366f1",
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
                        {(localData.skills || []).map((skill, index) => (
                          <span
                            key={index}
                            style={{
                              backgroundColor: "#6366f1",
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
                        borderBottom: "2px solid #6366f1",
                        paddingBottom: "0.5rem",
                        marginBottom: "1rem",
                        color: "#6366f1",
                      }}
                    >
                      Education
                    </h3>
                    {(localData.education || []).map((edu, idx) => (
                      <div key={idx} style={{ marginBottom: "1rem" }}>
                        {editMode ? (
                          <>
                            <input
                              type="text"
                              value={localData.education[idx].degree || ""}
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
                              value={localData.education[idx].institution || ""}
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
                              value={localData.education[idx].duration || ""}
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
                              value={localData.education[idx].location || ""}
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
                              {edu.degree || "Degree"}
                            </p>
                            <p style={{ marginBottom: "0.25rem" }}>
                              {edu.institution || "Institution"}
                            </p>
                            <p style={{ marginBottom: "0.25rem" }}>
                              {edu.duration || "Duration"}
                            </p>
                            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                              {edu.location || "Location"}
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
                        borderBottom: "2px solid #6366f1",
                        paddingBottom: "0.5rem",
                        marginBottom: "1rem",
                        color: "#6366f1",
                      }}
                    >
                      Professional Experience
                    </h3>
                    {currentExperienceItems.map((exp, idx) => (
                      <div key={startIndex + idx} style={{ marginBottom: "2rem" }}>
                        {editMode ? (
                          <>
                            <input
                              type="text"
                              value={localData.experience[startIndex + idx].title || ""}
                              onChange={(e) => {
                                const updated = [...localData.experience];
                                updated[startIndex + idx].title = e.target.value;
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
                              value={localData.experience[startIndex + idx].companyName || ""}
                              onChange={(e) => {
                                const updated = [...localData.experience];
                                updated[startIndex + idx].companyName = e.target.value;
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
                              value={localData.experience[startIndex + idx].date || ""}
                              onChange={(e) => {
                                const updated = [...localData.experience];
                                updated[startIndex + idx].date = e.target.value;
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
                              value={localData.experience[startIndex + idx].companyLocation || ""}
                              onChange={(e) => {
                                const updated = [...localData.experience];
                                updated[startIndex + idx].companyLocation = e.target.value;
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
                              value={(localData.experience[startIndex + idx].accomplishment || []).join("\n")}
                              onChange={(e) => {
                                const updated = [...localData.experience];
                                updated[startIndex + idx].accomplishment = e.target.value
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
                                color: "#6366f1",
                              }}
                            >
                              {exp.title || "Job Title"}
                            </h4>
                            <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                              {exp.companyName || "Company Name"}
                            </p>
                            <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                              {exp.date || "Date"} | {exp.companyLocation || "Location"}
                            </p>
                            <ul style={{ paddingLeft: "1.5rem" }}>
                              {(exp.accomplishment || []).map((item, i) => (
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

              {/* Page Navigation */}
              {totalPages > 1 && (
                <div style={{ 
                  position: "absolute", 
                  bottom: "1rem", 
                  left: "50%", 
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center"
                }}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: currentPage === 1 ? "#d1d5db" : "#6366f1",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    Previous
                  </button>
                  <span style={{ fontSize: "0.875rem" }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: currentPage === totalPages ? "#d1d5db" : "#6366f1",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
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
                  backgroundColor: "#6366f1",
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

export default Template17;
