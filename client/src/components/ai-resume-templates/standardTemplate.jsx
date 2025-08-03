import React, { useState, useRef } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import PageContainer from "../PageContainer";

const StandardTemplate = () => {
  const resumeRef = useRef(null);
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

    return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar onEnhance={handleEnhance} resumeRef={resumeRef} />
        <div className="flex-grow p-10 flex flex-col items-center">
          <PageContainer>
            <div ref={resumeRef} className="bg-white p-8 w-full space-y-6">
      <h1 className="text-3xl font-bold text-center">{resumeData.name}</h1>
      <h2 className="text-xl text-center text-gray-600">{resumeData.role}</h2>
      <p className="text-center">📍 {resumeData.location} | 📞 {resumeData.phone} | ✉️ {resumeData.email}</p>
      <p className="text-center">🔗 <a href={`https://${resumeData.linkedin}`} className="text-blue-600 underline">{resumeData.linkedin}</a></p>

      <section>
        <h3 className="text-xl font-semibold">Summary</h3>
        <p>{resumeData.summary}</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold">Experience</h3>
        {resumeData.experience.map((exp, idx) => (
          <div key={idx} className="mb-2">
            <h4 className="font-bold">{exp.title} at {exp.companyName} ({exp.date})</h4>
            <p className="italic">{exp.companyLocation}</p>
            <ul className="list-disc ml-6">
              {exp.accomplishment.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        ))}
      </section>

              {/* Education Section */}
              <section>
                <h3 className="text-xl font-semibold">Education</h3>
                {resumeData.education?.map((edu, idx) => (
                  <div key={idx} className="mb-2">
                    <h4 className="font-bold">{edu.degree}</h4>
                    <p>{edu.institution} ({edu.duration})</p>
                    <p className="italic">{edu.location}</p>
                  </div>
                ))}
              </section>

              {/* Skills Section */}
              <section>
                <h3 className="text-xl font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills?.map((skill, idx) => (
                    <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Buttons */}
              <div className="mt-6 flex justify-center gap-4">
                {editMode ? (
                  <>
                    <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">
                      Save
                    </button>
                    <button onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Edit
                  </button>
                )}
              </div>
            </div>
          </PageContainer>
        </div>
      </div>
    </div>
  );
};

export default StandardTemplate;
