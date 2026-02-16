import React from "react";
import { FaUser } from "react-icons/fa"; 
import "./ViewApplicants.css";

const ViewApplicants = () => {
  const applicants = [
    { id: 1, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Invited" },
    { id: 2, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Applied" },
    { id: 3, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "In progress" },
    { id: 4, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Selected" },
    { id: 5, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Rejected" },
    { id: 6, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "On hold" },
    { id: 7, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Invited" },
    { id: 8, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Invited" },
    { id: 9, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Invited" },
    { id: 10, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Invited" },
  ];

  return (
    <div className="view-applicants-page" style={{ paddingTop: "0px", marginTop: "0px" }}>
      
      <h1 className="page-main-title" style={{ marginTop: "-25px", paddingTop: "0px" }}>
        View applicants
      </h1>
      
      <div className="applicants-list-container">
        <div className="applicant-shared-card header-row-style">
          <div className="column-name-layout">
            <div className="header-avatar-placeholder">
              <FaUser style={{ color: "#808080", fontSize: "22px" }} />
            </div>
            <div className="text-stack">
              <span className="header-label">Name</span>
              <span className="header-sub-label">Applied role</span>
            </div>
          </div>
          <div className="header-label">Phone number</div>
          <div className="header-label">Designation</div>
          <div className="header-label">Location</div>
          <div className="header-label">Applied on</div>
          <div className="header-label">Status</div>
        </div>

        {applicants.map((applicant) => (
          <div key={applicant.id} className="applicant-shared-card data-row-style">
            <div className="column-name-layout">
              <img 
                src="https://via.placeholder.com/40" 
                alt="Profile" 
                className="applicant-avatar-img" 
              />
              <div className="text-stack">
                <span className="applicant-full-name">{applicant.name}</span>
                <span className="applicant-role-info">Applied for {applicant.designation}</span>
              </div>
            </div>
            <div className="applicant-data-text">{applicant.phone}</div>
            <div className="applicant-data-text">{applicant.designation}</div>
            <div className="applicant-data-text">{applicant.location}</div>
            <div className="applicant-data-text">{applicant.appliedOn}</div>
            <div className="applicant-status-text">{applicant.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApplicants;
