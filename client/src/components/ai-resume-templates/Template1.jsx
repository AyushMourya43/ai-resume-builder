import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";

const Template1 = () => {
  const { resumeData, setResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData);

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar onEnhance={handleEnhance} />
        {/* Main content wrapper: flex-col to stack card and button */}
        <div className="flex flex-col items-center flex-grow p-10">
          {/* Card container */}
          <div className="bg-white text-gray-800 max-w-6xl w-full shadow-md p-10">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={localData.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      className="text-3xl font-bold mb-1"
                    />
                    <input
                      type="text"
                      value={localData.role}
                      onChange={(e) => handleFieldChange("role", e.target.value)}
                      className="text-md text-gray-600"
                    />
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold">{resumeData.name}</h1>
                    <h2 className="text-md text-gray-600">{resumeData.role}</h2>
                  </>
                )}
              </div>

              <div className="text-sm text-right space-y-1">
                {["location", "phone", "email", "linkedin"].map((field) =>
                  editMode ? (
                    <input
                      key={field}
                      type="text"
                      value={localData[field]}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      className="block w-full text-right"
                    />
                  ) : (
                    <p key={field}>
                      {field === "location" && "📍 "}
                      {field === "phone" && "📞 "}
                      {field === "email" && "✉️ "}
                      {field === "linkedin" && "🔗 "}
                      {resumeData[field]}
                    </p>
                  )
                )}
              </div>
            </div>

            {/* Removed button group from here */}

            <div className="mt-6 flex gap-6">
              {/* Left column */}
              <div className="w-1/3">
                {/* Skills */}
                <h3 className="font-bold text-lg border-b">Skills</h3>
                {editMode ? (
                  <textarea
                    value={localData.skills?.join(", ") || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "skills",
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                    className="w-full mt-2 p-2 border rounded"
                  />
                ) : (
                  <ul className="list-disc ml-4 mt-2">
                    {resumeData.skills?.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                )}

                {/* Education */}
                <h3 className="font-bold text-lg border-b mt-6">Education</h3>
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="mt-2">
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
                          className="font-semibold block w-full"
                        />
                        <input
                          type="text"
                          value={localData.education[idx].institution}
                          onChange={(e) => {
                            const updated = [...localData.education];
                            updated[idx].institution = e.target.value;
                            handleFieldChange("education", updated);
                          }}
                          className="block w-full"
                        />
                        <input
                          type="text"
                          value={localData.education[idx].duration}
                          onChange={(e) => {
                            const updated = [...localData.education];
                            updated[idx].duration = e.target.value;
                            handleFieldChange("education", updated);
                          }}
                          className="block w-full"
                        />
                        <input
                          type="text"
                          value={localData.education[idx].location}
                          onChange={(e) => {
                            const updated = [...localData.education];
                            updated[idx].location = e.target.value;
                            handleFieldChange("education", updated);
                          }}
                          className="text-sm block w-full"
                        />
                      </>
                    ) : (
                      <>
                        <p className="font-semibold">{edu.degree}</p>
                        <p>
                          {edu.institution} ({edu.duration})
                        </p>
                        <p className="text-sm text-gray-600">{edu.location}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Right column */}
              <div className="w-2/3">
                {/* Summary */}
                <h3 className="font-bold text-lg border-b">Summary</h3>
                {editMode ? (
                  <textarea
                    value={localData.summary}
                    onChange={(e) =>
                      handleFieldChange("summary", e.target.value)
                    }
                    className="w-full mt-2 p-2 border rounded"
                    rows={4}
                  />
                ) : (
                  <p className="mt-2">{resumeData.summary}</p>
                )}

                {/* Experience */}
                <h3 className="font-bold text-lg border-b mt-6">Experience</h3>
                {resumeData.experience.map((exp, idx) => (
                  <div key={idx} className="mt-2">
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
                          className="font-semibold block w-full"
                        />
                        <input
                          type="text"
                          value={localData.experience[idx].companyName}
                          onChange={(e) => {
                            const updated = [...localData.experience];
                            updated[idx].companyName = e.target.value;
                            handleFieldChange("experience", updated);
                          }}
                          className="block w-full"
                        />
                        <input
                          type="text"
                          value={localData.experience[idx].date}
                          onChange={(e) => {
                            const updated = [...localData.experience];
                            updated[idx].date = e.target.value;
                            handleFieldChange("experience", updated);
                          }}
                          className="block w-full"
                        />
                        <input
                          type="text"
                          value={localData.experience[idx].companyLocation}
                          onChange={(e) => {
                            const updated = [...localData.experience];
                            updated[idx].companyLocation = e.target.value;
                            handleFieldChange("experience", updated);
                          }}
                          className="block w-full"
                        />
                        <textarea
                          value={localData.experience[idx].accomplishment.join(
                            "\n"
                          )}
                          onChange={(e) => {
                            const updated = [...localData.experience];
                            updated[idx].accomplishment = e.target
                              .value.split("\n")
                              .filter(Boolean);
                            handleFieldChange("experience", updated);
                          }}
                          className="block w-full border rounded p-2 mt-1"
                        />
                      </>
                    ) : (
                      <>
                        <p className="font-semibold">
                          {exp.title} at {exp.companyName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {exp.date} | {exp.companyLocation}
                        </p>
                        <ul className="list-disc ml-4">
                          {exp.accomplishment.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Button group below the card, centered */}
          <div className="flex justify-center mt-6">
            {editMode ? (
              <>
                <button
                  className="bg-green-600 text-white px-4 py-1 rounded mx-2"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-1 rounded mx-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded mx-2"
                onClick={() => setEditMode(true)}
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

export default Template1;
