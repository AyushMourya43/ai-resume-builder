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

  // Check if we need additional pages for skills
  const skillsPerPage = 8; // Number of skills that fit on one page
  const totalSkills = localData.skills?.length || 0;
  const skillsPages = Math.ceil(totalSkills / skillsPerPage);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
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
                maxWidth: "8.5in", // Standard letter size width
                minHeight: "11in", // Standard letter size height
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                padding: "1in",
                margin: "0 auto",
                position: "relative",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Page 1: Main Content */}
              <div style={{ height: "100%" }}>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderBottom: "2px solid #3b82f6",
                    paddingBottom: "1rem",
                    marginBottom: "1.5rem",
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
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            padding: "0.5rem",
                          }}
                        />
                        <input
                          type="text"
                          value={localData.role || ""}
                          onChange={(e) => handleFieldChange("role", e.target.value)}
                          style={{
                            fontSize: "1.25rem",
                            color: "#6b7280",
                            width: "100%",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            padding: "0.5rem",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                          {localData.name || "Your Name"}
                        </h1>
                        <p style={{ fontSize: "1.25rem", color: "#6b7280" }}>
                          {localData.role || "Your Role"}
                        </p>
                      </>
                    )}
                  </div>
                  
                  <div style={{ textAlign: "right", flex: 1 }}>
                    {editMode ? (
                      <>
                        <input
                          type="text"
                          value={localData.phone || ""}
                          onChange={(e) => handleFieldChange("phone", e.target.value)}
                          style={{
                            display: "block",
                            width: "100%",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            padding: "0.25rem",
                            marginBottom: "0.25rem",
                          }}
                        />
                        <input
                          type="text"
                          value={localData.email || ""}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          style={{
                            display: "block",
                            width: "100%",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            padding: "0.25rem",
                            marginBottom: "0.25rem",
                          }}
                        />
                        <input
                          type="text"
                          value={localData.location || ""}
                          onChange={(e) => handleFieldChange("location", e.target.value)}
                          style={{
                            display: "block",
                            width: "100%",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            padding: "0.25rem",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <p style={{ marginBottom: "0.25rem" }}>{localData.phone || "Phone"}</p>
                        <p style={{ marginBottom: "0.25rem" }}>{localData.email || "Email"}</p>
                        <p>{localData.location || "Location"}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.75rem", color: "#3b82f6" }}>
                    Professional Summary
                  </h2>
                  {editMode ? (
                    <textarea
                      value={localData.summary || ""}
                      onChange={(e) => handleFieldChange("summary", e.target.value)}
                      style={{
                        width: "100%",
                        minHeight: "80px",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        padding: "0.5rem",
                        resize: "vertical",
                      }}
                    />
                  ) : (
                    <p style={{ lineHeight: "1.6", color: "#374151" }}>
                      {localData.summary || "Your professional summary here..."}
                    </p>
                  )}
                </div>

                {/* Skills */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.75rem", color: "#3b82f6" }}>
                    Skills
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {(localData.skills || []).slice(0, skillsPerPage).map((skill, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: "#3b82f6",
                          color: "white",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "20px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.75rem", color: "#3b82f6" }}>
                    Work Experience
                  </h2>
                  {currentExperienceItems.map((exp, idx) => (
                    <div key={startIndex + idx} style={{ marginBottom: "1rem" }}>
                      {editMode ? (
                        <div>
                          <input
                            type="text"
                            value={exp.title || ""}
                            onChange={(e) => {
                              const updated = [...localData.experience];
                              updated[startIndex + idx].title = e.target.value;
                              handleFieldChange("experience", updated);
                            }}
                            style={{
                              fontSize: "1.125rem",
                              fontWeight: "bold",
                              width: "100%",
                              border: "1px solid #d1d5db",
                              borderRadius: "4px",
                              padding: "0.25rem",
                              marginBottom: "0.25rem",
                            }}
                          />
                          <input
                            type="text"
                            value={exp.companyName || ""}
                            onChange={(e) => {
                              const updated = [...localData.experience];
                              updated[startIndex + idx].companyName = e.target.value;
                              handleFieldChange("experience", updated);
                            }}
                            style={{
                              width: "100%",
                              border: "1px solid #d1d5db",
                              borderRadius: "4px",
                              padding: "0.25rem",
                              marginBottom: "0.25rem",
                            }}
                          />
                          <input
                            type="text"
                            value={exp.date || ""}
                            onChange={(e) => {
                              const updated = [...localData.experience];
                              updated[startIndex + idx].date = e.target.value;
                              handleFieldChange("experience", updated);
                            }}
                            style={{
                              width: "100%",
                              border: "1px solid #d1d5db",
                              borderRadius: "4px",
                              padding: "0.25rem",
                              marginBottom: "0.25rem",
                            }}
                          />
                          <textarea
                            value={(exp.accomplishment || []).join("\n")}
                            onChange={(e) => {
                              const updated = [...localData.experience];
                              updated[startIndex + idx].accomplishment = e.target.value
                                .split("\n")
                                .filter(Boolean);
                              handleFieldChange("experience", updated);
                            }}
                            style={{
                              width: "100%",
                              minHeight: "60px",
                              border: "1px solid #d1d5db",
                              borderRadius: "4px",
                              padding: "0.25rem",
                              resize: "vertical",
                            }}
                          />
                        </div>
                      ) : (
                        <div>
                          <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.25rem" }}>
                            {exp.title || "Job Title"}
                          </h3>
                          <p style={{ color: "#6b7280", marginBottom: "0.25rem" }}>
                            {exp.companyName || "Company Name"} | {exp.date || "Date"}
                          </p>
                          <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.5" }}>
                            {(exp.accomplishment || []).map((item, i) => (
                              <li key={i} style={{ marginBottom: "0.25rem" }}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.75rem", color: "#3b82f6" }}>
                    Education
                  </h2>
                  {(localData.education || []).map((edu, idx) => (
                    <div key={idx} style={{ marginBottom: "1rem" }}>
                      {editMode ? (
                        <div>
                          <input
                            type="text"
                            value={edu.degree || ""}
                            onChange={(e) => {
                              const updated = [...localData.education];
                              updated[idx].degree = e.target.value;
                              handleFieldChange("education", updated);
                            }}
                            style={{
                              fontSize: "1.125rem",
                              fontWeight: "bold",
                              width: "100%",
                              border: "1px solid #d1d5db",
                              borderRadius: "4px",
                              padding: "0.25rem",
                              marginBottom: "0.25rem",
                            }}
                          />
                          <input
                            type="text"
                            value={edu.university || ""}
                            onChange={(e) => {
                              const updated = [...localData.education];
                              updated[idx].university = e.target.value;
                              handleFieldChange("education", updated);
                            }}
                            style={{
                              width: "100%",
                              border: "1px solid #d1d5db",
                              borderRadius: "4px",
                              padding: "0.25rem",
                              marginBottom: "0.25rem",
                            }}
                          />
                          <input
                            type="text"
                            value={edu.year || ""}
                            onChange={(e) => {
                              const updated = [...localData.education];
                              updated[idx].year = e.target.value;
                              handleFieldChange("education", updated);
                            }}
                            style={{
                              width: "100%",
                              border: "1px solid #d1d5db",
                              borderRadius: "4px",
                              padding: "0.25rem",
                            }}
                          />
                        </div>
                      ) : (
                        <div>
                          <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.25rem" }}>
                            {edu.degree || "Degree"}
                          </h3>
                          <p style={{ color: "#6b7280", marginBottom: "0.25rem" }}>
                            {edu.university || "University"}
                          </p>
                          <p style={{ color: "#6b7280" }}>{edu.year || "Year"}</p>
                        </div>
                      )}
                    </div>
                  ))}
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
                        backgroundColor: currentPage === 1 ? "#d1d5db" : "#3b82f6",
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
                        backgroundColor: currentPage === totalPages ? "#d1d5db" : "#3b82f6",
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
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    margin: "0 0.5rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    backgroundColor: "#9ca3af",
                    color: "#ffffff",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    margin: "0 0.5rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                style={{
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  margin: "0 0.5rem",
                  border: "none",
                  cursor: "pointer",
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
