import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EHeader } from './EHeader';
import { Footer } from '../Components-LandingPage/Footer';
import './PostJobForm.css';

const PostJobForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: '',
    industrialType: '',
    department: '',
    workType: { hybrid: false, remote: false, onSite: false },
    shift: { general: false, night: false, rotational: false },
    workDuration: '',
    jobPostDuration: '',
    salary: '',
    experience: '',
    location: '',
    openings: '',
    jobCategory: 'Full-time',
    education: '',
    keySkills: '', 
    jobHighlights: '',
    jobDescription: '',
    responsibilities: ''
  });

  const [skillsList, setSkillsList] = useState(['Python', 'AWS']);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const [group, field] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [group]: { ...prev[group], [field]: checked }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      const newSkill = formData.keySkills.trim();
      
      if (newSkill && !skillsList.includes(newSkill)) {
        setSkillsList([...skillsList, newSkill]); 
        setFormData({ ...formData, keySkills: '' }); 
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const submissionData = { ...formData, skills: skillsList };
    navigate('/Job-portal/Employer/PostJobpreview', { state: submissionData });
  };

  return (
    <div className="jobpost-page-title">
      <EHeader />
      
      <main className="jobpost-main-content">
        <header className="jobpost-form-header">
          <h1>Post a Job</h1>
          <p>Complete the steps below to reach thousands of qualified candidates</p>
        </header>

        {/* --- MAIN FORM CONTAINER --- */}
        <div className="jobpost-form-container">
          <form className="jobpost-form" onSubmit={handleSubmit}>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Job title</label>
              <input className="jobpost-input" type="text" name="jobTitle" placeholder="e.g., Fullstack Developer" value={formData.jobTitle} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Industrial type</label>
              <select className="jobpost-select" name="industrialType" value={formData.industrialType} onChange={handleChange}>
                <option value="">Select</option>
                <option value="IT">IT Services</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Department</label>
              <select className="jobpost-select" name="department" value={formData.department} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Engineering">Engineering</option>
                <option value="HR">Human Resources</option>
              </select>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Work type</label>
              <div className="jobpost-inline-group">
                <label className="jobpost-checkbox-label">
                  <input type="checkbox" name="workType.hybrid" checked={formData.workType.hybrid} onChange={handleChange} /> Hybrid
                </label>
                <label className="jobpost-checkbox-label">
                  <input type="checkbox" name="workType.remote" checked={formData.workType.remote} onChange={handleChange} /> Remote
                </label>
                <label className="jobpost-checkbox-label">
                  <input type="checkbox" name="workType.onSite" checked={formData.workType.onSite} onChange={handleChange} /> On-site
                </label>
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Shift</label>
              <div className="jobpost-inline-group">
                <label className="jobpost-checkbox-label">
                  <input type="checkbox" name="shift.general" checked={formData.shift.general} onChange={handleChange} /> General
                </label>
                <label className="jobpost-checkbox-label">
                  <input type="checkbox" name="shift.night" checked={formData.shift.night} onChange={handleChange} /> Night
                </label>
                <label className="jobpost-checkbox-label">
                  <input type="checkbox" name="shift.rotational" checked={formData.shift.rotational} onChange={handleChange} /> Rotational
                </label>
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Work duration</label>
              <input className="jobpost-input" type="text" name="workDuration" placeholder='e.g., "3 Months", "6 Months", "Permanent"' value={formData.workDuration} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Job post duration</label>
              <input className="jobpost-input" type="text" name="jobPostDuration" placeholder='e.g., "1 Month", "2 Months", "6 Months"' value={formData.jobPostDuration} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Salary</label>
              <input className="jobpost-input" type="text" name="salary" placeholder="Max Annual CTC" value={formData.salary} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Experience</label>
              <input className="jobpost-input" type="text" name="experience" placeholder="Minimum years required" value={formData.experience} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Location</label>
              <input className="jobpost-input" type="text" name="location" placeholder="City name (e.g., Bengaluru)" value={formData.location} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Openings</label>
              <input className="jobpost-input" type="text" name="openings" placeholder="Total vacant positions" value={formData.openings} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Job category</label>
              <div className="jobpost-radio-container">
                <label className="jobpost-radio-label">
                  <input type="radio" name="jobCategory" value="Full-time" checked={formData.jobCategory === 'Full-time'} onChange={handleChange} /> Full-time
                </label>
                <label className="jobpost-radio-label">
                  <input type="radio" name="jobCategory" value="Internship" checked={formData.jobCategory === 'Internship'} onChange={handleChange} /> Internship
                </label>
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Education</label>
              <select className="jobpost-select" name="education" value={formData.education} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
              </select>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Key skills</label>
              <div className="jobpost-skills-wrapper">
                <input 
                  className="jobpost-input skills-input" 
                  type="text" 
                  name="keySkills" 
                  placeholder="e.g., Python, AWS, React, etc." 
                  value={formData.keySkills} 
                  onChange={handleChange} 
                  onKeyDown={handleKeyDown} 
                />
                <div className="jobpost-tags-area">
                  {skillsList.map((skill, index) => (
                    <span key={index} className="jobpost-tag">
                      {skill} <button type="button" onClick={() => removeSkill(skill)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Job highlights</label>
              <div className="jobpost-input-icon-wrapper">
                <input className="jobpost-input" type="text" name="jobHighlights" placeholder="Add top 3-5 selling points of the role" value={formData.jobHighlights} onChange={handleChange} />
                <span className="jobpost-plus-icon">+</span>
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Job description</label>
              <textarea className="jobpost-textarea" name="jobDescription" placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity unique..." value={formData.jobDescription} onChange={handleChange}></textarea>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Responsibilities</label>
              <div className="jobpost-input-icon-wrapper">
                <input className="jobpost-input" type="text" name="responsibilities" placeholder="Specific day-to-day tasks" value={formData.responsibilities} onChange={handleChange} />
                <span className="jobpost-plus-icon">+</span>
              </div>
            </div>
          </form>
        </div>

        {/* --- ACTIONS MOVED OUTSIDE OF THE WHITE CONTAINER --- */}
        <div className="jobpost-actions">
          <button type="button" className="jobpost-btn-cancel" onClick={() => navigate('/jobportal')}>
            Cancel
          </button>
          <button type="button" className="jobpost-btn-preview" onClick={handleSubmit}>
            Preview
          </button>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default PostJobForm;