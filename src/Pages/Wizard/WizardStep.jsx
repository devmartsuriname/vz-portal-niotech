import { useState } from 'react';

const WizardStep = ({ rule, currentAnswer, onAnswerSelect }) => {
  const [selectedValue, setSelectedValue] = useState(currentAnswer || '');

  if (!rule) return null;

  const options = Array.isArray(rule.options) ? rule.options : [];

  const handleSelect = (value) => {
    setSelectedValue(value);
    // Auto-advance for single choice questions
    if (rule.question_type === 'single_choice') {
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
      <h3 className="mb-4 text-primary">{rule.question_text}</h3>

      {rule.question_type === 'single_choice' && (
        <div className="row g-3">
          {options.map((option) => (
            <div key={option} className="col-12">
              <div
                className={`card cursor-pointer transition-all ${
                  selectedValue === option
                    ? 'border-primary shadow-sm'
                    : 'border hover:border-primary'
                }`}
                onClick={() => handleSelect(option)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex align-items-center justify-content-between p-4">
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      name={rule.question_key}
                      value={option}
                      checked={selectedValue === option}
                      onChange={() => handleSelect(option)}
                      className="form-check-input me-3"
                      style={{ cursor: 'pointer' }}
                    />
                    <span className="fs-5">{option}</span>
                  </div>
                  {selectedValue === option && (
                    <i className="bi bi-check-circle-fill text-primary fs-4"></i>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {rule.question_type === 'number' && (
        <div className="mb-4">
          <input
            type="number"
            min="1"
            max="10"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="form-control form-control-lg"
            placeholder="Voer een nummer in"
          />
          <button
            onClick={handleConfirm}
            disabled={!selectedValue}
            className="btn btn-primary mt-3"
          >
            Volgende
          </button>
        </div>
      )}

      {rule.question_type === 'confirmation' && (
        <div className="text-center">
          <p className="text-muted mb-4">
            Klik op 'Doorgaan' om verder te gaan met het uploaden van documenten.
          </p>
          <button
            onClick={() => onAnswerSelect('confirmed')}
            className="btn btn-primary btn-lg"
          >
            Doorgaan
          </button>
        </div>
      )}
    </div>
  );
};

export default WizardStep;
