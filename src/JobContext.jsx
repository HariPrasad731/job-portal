import React, { createContext, useState, useContext } from 'react';
import { JobList } from './JobList';

const JobContext = createContext();

export const JobProvider = ({ children }) => {

  const initializeJobs = JobList.map(job => ({
    ...job,
    applicantsList: job.applicantsList || [],
    applicants: job.applicants || 0,
    new: job.new || 0,
    reviewed: job.reviewed || 0,
    hired: job.hired || 0,
    rejected: job.rejected || 0,
  }));

  const [jobs, setJobs] = useState(initializeJobs);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const getFormattedDate = () => {
    return new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  };

  const generateId = () => Date.now();

  const isJobSaved = (jobId) =>
    savedJobs.some((j) => String(j.id) === String(jobId));

  const isJobVerified = (jobId) =>
    jobs.find((j) => String(j.id) === String(jobId))?.isVerified;

  /* ==============================
      CREATE JOB
  ============================== */

  const postJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: generateId(),
      postedDate: getFormattedDate(),
      isVerified: false,
      applicantsList: [],
      applicants: 0,
      new: 0,
      reviewed: 0,
      hired: 0,
      rejected: 0,
    };

    setJobs((prev) => [newJob, ...prev]);
  };

  /* ==============================
      EDIT JOB
  ============================== */

  const editJob = (jobId, updatedData) => {
    setJobs((prev) =>
      prev.map((job) =>
        String(job.id) === String(jobId)
          ? { ...job, ...updatedData }
          : job
      )
    );
  };

  /* ==============================
      DELETE JOB
  ============================== */

  const deleteJob = (jobId) => {
    setJobs((prev) =>
      prev.filter((job) => String(job.id) !== String(jobId))
    );
    setSavedJobs((prev) =>
      prev.filter((job) => String(job.id) !== String(jobId))
    );
    setAppliedJobs((prev) =>
      prev.filter((job) => String(job.id) !== String(jobId))
    );
  };

  /* ==============================
      VERIFY JOB
  ============================== */

  const verifyJob = (jobId) => {
    setJobs((prev) =>
      prev.map((job) =>
        String(job.id) === String(jobId)
          ? { ...job, isVerified: true }
          : job
      )
    );
  };

  /* ==============================
      GET JOB BY ID
  ============================== */

  const getJobById = (jobId) => {
    return jobs.find(
      (job) => String(job.id) === String(jobId)
    );
  };

  const selectJob = (job) => {
    setSelectedJob(job);
  };

  /* ==============================
      ADD APPLICANT TO JOB
  ============================== */

  const addApplicantToJob = (jobId, applicantData) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (String(job.id) !== String(jobId)) return job;

        const updatedApplicants = [
          ...job.applicantsList,
          {
            ...applicantData,
            id: generateId(),
            appliedOn: new Date().toLocaleString(),
            status: 'Applied',
          }
        ];

        return {
          ...job,
          applicantsList: updatedApplicants,
          applicants: updatedApplicants.length,
          new: updatedApplicants.filter(a => a.status === 'Applied').length,
        };
      })
    );
  };

  /* ==============================
      UPDATE APPLICANT STATUS
  ============================== */

  const updateApplicantStatus = (jobId, applicantId, newStatus) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (String(job.id) !== String(jobId)) return job;

        const updatedApplicants = job.applicantsList.map(applicant =>
          String(applicant.id) === String(applicantId)
            ? { ...applicant, status: newStatus }
            : applicant
        );

        return {
          ...job,
          applicantsList: updatedApplicants,
          applicants: updatedApplicants.length,
          new: updatedApplicants.filter(a => a.status === 'Applied').length,
          reviewed: updatedApplicants.filter(a => a.status === 'In progress').length,
          hired: updatedApplicants.filter(a => a.status === 'Selected').length,
          rejected: updatedApplicants.filter(a => a.status === 'Rejected').length,
        };
      })
    );
  };

  /* ==============================
      APPLY JOB  🔥 FIXED
  ============================== */

  const applyForJob = (originalJob) => {
    const newAppliedJob = {
      ...originalJob,
      appliedDate: `Applied on ${getFormattedDate()}`,
      status: { text: 'Hiring in Progress', type: 'progress' },
    };

    setAppliedJobs((prev) => [...prev, newAppliedJob]);

    /*
      🔥 IMPORTANT:
      Do NOT remove job from employer list.
      Employer must still see job and applicants.
    */

    setSavedJobs((prev) =>
      prev.filter((j) => String(j.id) !== String(originalJob.id))
    );
  };

  /* ==============================
      SAVE JOB
  ============================== */

  const toggleSaveJob = (originalJob) => {
    if (isJobSaved(originalJob.id)) {
      setSavedJobs((prev) =>
        prev.filter((j) => String(j.id) !== String(originalJob.id))
      );
    } else {
      const newSavedJob = {
        ...originalJob,
        savedDate: `Saved on ${getFormattedDate()}`,
      };
      setSavedJobs((prev) => [...prev, newSavedJob]);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        appliedJobs,
        savedJobs,
        selectedJob,

        postJob,
        editJob,
        deleteJob,
        verifyJob,
        getJobById,
        selectJob,

        addApplicantToJob,
        updateApplicantStatus,

        applyForJob,
        toggleSaveJob,
        isJobSaved,
        isJobVerified,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
