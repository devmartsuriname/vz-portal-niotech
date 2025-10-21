import { useState } from 'react';

const WizardStep = ({ rule, currentAnswer, onAnswerSelect }) => {
  const [selectedValue, setSelectedValue] = useState(currentAnswer || '');

  if (!rule) return null;

  const options = Array.isArray(rule.options) ? rule.options : [];

  const handleSelect = (value) => {
    setSelectedValue(value);
    // Auto-advance for single choice questions
    if (rule.question_type === 'single-choice') {
      setTimeout(() => {
        onAnswerSelect(value);
      }, 300);
    }
  };

  const handleConfirm = () => {
    if (selectedValue) {
      onAnswerSelect(selectedValue);
    }
  };

  return (
    <div className="wizard-step">
      <div className="text-center mb-5">
        <h2 className="display-6 fw-bold text-primary mb-3">{rule.question_text}</h2>
        <p className="text-muted fs-5">Selecteer een optie om verder te gaan</p>
      </div>

      {rule.question_type === 'single-choice' && (
        <div className="row g-4">
          {options.map((option) => (
            <div key={option} className="col-12 col-md-6">
              <div
                className={`wizard-option-card card h-100 ${
                  selectedValue === option ? 'selected' : ''
                }`}
                onClick={() => handleSelect(option)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(option);
                  }
                }}
                aria-pressed={selectedValue === option}
              >
                <div className="card-body d-flex align-items-center justify-content-between p-4">
                  <div className="d-flex align-items-center flex-grow-1">
                    <div className="wizard-radio-wrapper me-3">
                      <input
                        type="radio"
                        name={rule.question_key}
                        value={option}
                        checked={selectedValue === option}
                        onChange={() => handleSelect(option)}
                        className="form-check-input"
                        tabIndex={-1}
                      />
                    </div>
                    <span className="fs-5 fw-medium">{option}</span>
                  </div>
                  {selectedValue === option && (
                    <i className="bi bi-check-circle-fill text-primary fs-3 ms-3"></i>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {rule.question_type === 'number' && (
        <div className="text-center">
          <div className="mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <input
              type="number"
              min="1"
              max="10"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="form-control form-control-lg text-center"
              placeholder="Voer een nummer in"
            />
          </div>
          <button
            onClick={handleConfirm}
            disabled={!selectedValue}
            className="btn btn-primary btn-lg px-5"
          >
            Volgende <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      )}

      {rule.question_type === 'confirmation' && (
        <div className="text-center">
          <div className="mb-4">
            <i className="bi bi-info-circle text-primary fs-1 mb-3 d-block"></i>
            <p className="text-muted fs-5 mb-4">
              Klik op 'Doorgaan' om verder te gaan met het uploaden van documenten.
            </p>
          </div>
          <button
            onClick={() => onAnswerSelect('confirmed')}
            className="btn btn-primary btn-lg px-5"
          >
            Doorgaan <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default WizardStep;
