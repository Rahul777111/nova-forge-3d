import React from 'react';
import './ResumeModal.css';

const RESUME_URL = '/resume.pdf';

export default function ResumeModal({ onClose }) {
  function handleDownload() {
    const a = document.createElement('a');
    a.href = RESUME_URL;
    a.download = 'DL_Narayana_Resume.pdf';
    a.click();
    onClose();
  }

  function handleView() {
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
    onClose();
  }

  return (
    <div className="resume-modal__overlay" onClick={onClose}>
      <div className="resume-modal" onClick={e => e.stopPropagation()}>
        <button className="resume-modal__close" onClick={onClose} aria-label="Close">&times;</button>
        <div className="resume-modal__icon">📄</div>
        <h2 className="resume-modal__title">D L Narayana &mdash; Resume</h2>
        <p className="resume-modal__sub">What would you like to do?</p>
        <div className="resume-modal__actions">
          <button className="resume-modal__btn resume-modal__btn--view" onClick={handleView}>
            <span className="resume-modal__btn-icon">👁️</span>
            View in Browser
          </button>
          <button className="resume-modal__btn resume-modal__btn--download" onClick={handleDownload}>
            <span className="resume-modal__btn-icon">⬇️</span>
            Download PDF
          </button>
        </div>
        <p className="resume-modal__note">This is a legitimate PDF resume — no scripts, no surprises.</p>
      </div>
    </div>
  );
}