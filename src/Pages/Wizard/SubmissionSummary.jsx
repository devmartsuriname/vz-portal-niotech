import { useState } from 'react';

const SubmissionSummary = ({ answers, personalInfo, files, evaluation, onSubmit, isSubmitting }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = () => {
    if (!acceptedTerms) {
      return;
    }
    onSubmit();
  };

  return (
    <div className="submission-summary">
      <h3 className="mb-4 text-primary">Overzicht Aanvraag</h3>
      <p className="text-muted mb-4">
        Controleer uw gegevens voordat u de aanvraag indient.
      </p>

      {/* Application Type */}
      <div className="card mb-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">Aanvraagtype</h5>
        </div>
        <div className="card-body">
          <p className="mb-0">
            <strong>{evaluation?.application_type_name || 'Onbekend'}</strong>
          </p>
          {evaluation?.confidence_level && (
            <small className="text-muted">
              Vertrouwensniveau: {evaluation.confidence_level}
            </small>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="card mb-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">Persoonlijke Gegevens</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <small className="text-muted d-block">Naam</small>
              <strong>{personalInfo.name}</strong>
            </div>
            <div className="col-md-6">
              <small className="text-muted d-block">E-mail</small>
              <strong>{personalInfo.email}</strong>
            </div>
            <div className="col-md-6">
              <small className="text-muted d-block">Telefoon</small>
              <strong>{personalInfo.phone}</strong>
            </div>
            <div className="col-md-6">
              <small className="text-muted d-block">Geboortedatum</small>
              <strong>{personalInfo.dateOfBirth}</strong>
            </div>
            <div className="col-12">
              <small className="text-muted d-block">Adres</small>
              <strong>{personalInfo.address}, {personalInfo.postalCode} {personalInfo.city}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Wizard Answers */}
      <div className="card mb-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">Uw Antwoorden</h5>
        </div>
        <div className="card-body">
          {Object.entries(answers).map(([key, value]) => (
            <div key={key} className="mb-2 pb-2 border-bottom">
              <small className="text-muted d-block text-capitalize">
                {key.replace(/_/g, ' ')}
              </small>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Uploaded Files */}
      <div className="card mb-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">Geüploade Documenten</h5>
        </div>
        <div className="card-body">
          {files.length === 0 ? (
            <p className="text-muted mb-0">Geen documenten geüpload</p>
          ) : (
            <ul className="list-unstyled mb-0">
              {files.map((file, index) => (
              <li key={index} className="d-flex align-items-center mb-2">
                  <i className="bx bxs-file-pdf text-danger me-2"></i>
                  <span>{file.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="card mb-4 border-primary">
        <div className="card-body">
          <div className="form-check">
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="form-check-input"
            />
            <label htmlFor="termsCheckbox" className="form-check-label">
              Ik verklaar dat de verstrekte informatie naar waarheid is ingevuld en ga akkoord met de{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                algemene voorwaarden
              </a>
              .
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!acceptedTerms || isSubmitting}
        className="btn btn-primary btn-lg w-100"
      >
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Aanvraag wordt ingediend...
          </>
        ) : (
          <>
            <i className="bx bx-check-circle me-2"></i>
            Aanvraag Indienen
          </>
        )}
      </button>

      {!acceptedTerms && (
        <p className="text-center text-muted small mt-3">
          Accepteer de voorwaarden om door te gaan
        </p>
      )}
    </div>
  );
};

export default SubmissionSummary;
