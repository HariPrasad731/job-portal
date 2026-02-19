import React, { useState } from 'react';
import './PostedJobs.css';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../JobContext';

const PostedJobs = ({ onViewApplicants }) => {
  const navigate = useNavigate();

  const { jobs, deleteJob } = useJobs();

  const [activeMenu, setActiveMenu] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const toggleMenu = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const handleEditClick = (jobId) => {
    setActiveMenu(null);
    navigate(`/Job-portal/Employer/EditJob/${jobId}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedJobId(id);
    setShowDeleteModal(true);
    setActiveMenu(null);
  };

  const confirmDelete = () => {
    deleteJob(selectedJobId);
    setShowDeleteModal(false);
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  /*
    🔥 ADDED: Safe View Applicants handler

    - If parent passed onViewApplicants → use it (your existing logic)
    - Else → use dynamic route navigation
  */
  const handleViewApplicants = (job) => {
    if (onViewApplicants) {
      onViewApplicants(job);
    } else {
      navigate(`/Job-portal/Employer/ViewApplicants/${job.id}`);
    }
  };

  return (
    <div className="postedjobs-container">
      <h2 className="postedjobs-header">Jobs posted by you</h2>

      <div className="postedjobs-grid-layout postedjobs-table-header">
        <div />
        <span className="postedjobs-label">Applicants</span>
        <span className="postedjobs-label">New</span>
        <span className="postedjobs-label">Reviewed</span>
        <span className="postedjobs-label">Hired</span>
        <span className="postedjobs-label">Rejected</span>
        <div />
      </div>

      <div className="postedjobs-list">

        {jobs.length === 0 && (
          <div className="postedjobs-empty">
            No jobs posted yet.
          </div>
        )}

        {jobs.map((job) => (
          <div key={job.id} className="postedjobs-grid-layout postedjobs-card">
            
            <div className="postedjobs-info">
              <h3 className="postedjobs-title">
                {job.jobTitle}
                {job.isVerified && (
                  <span className="postedjobs-verified">
                    ✔ Verified
                  </span>
                )}
              </h3>

              <p className="postedjobs-loc flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                {[job.city, job.state, job.country]
                  .filter(Boolean)
                  .join(', ')}
              </p>

              <small>
                Created on: {job.postedDate || '-'}
              </small>
            </div>

            <span className="postedjobs-badge">{job.applicants || 0}</span>
            <span className="postedjobs-badge">{job.new || 0}</span>
            <span className="postedjobs-badge">{job.reviewed || 0}</span>
            <span className="postedjobs-badge">{job.hired || 0}</span>
            <span className="postedjobs-badge">{job.rejected || 0}</span>

            <div className="postedjobs-actions">

              {/* 🔥 UPDATED: Now using safe handler */}
              <button
                className="postedjobs-view-btn"
                onClick={() => handleViewApplicants(job)}
              >
                View applicants
              </button>

              <div className="postedjobs-menu-wrapper">
                <button
                  onClick={() => toggleMenu(job.id)}
                  className="postedjobs-dots"
                >
                  ⋮
                </button>

                {activeMenu === job.id && (
                  <div className="postedjobs-dropdown">
                    <button onClick={() => handleEditClick(job.id)}>
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteClick(job.id)}
                      className="delete-opt"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div className="postedjobs-modal-overlay">
          <div className="postedjobs-modal">
            <p>Do you want to remove this job post?</p>
            <div className="postedjobs-modal-btns">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className="postedjobs-toast">
          Your job post has been removed
          <span
            className="close-icon"
            onClick={() => setShowSuccessToast(false)}
          >
            ⊗
          </span>
        </div>
      )}
    </div>
  );
};

export default PostedJobs;
