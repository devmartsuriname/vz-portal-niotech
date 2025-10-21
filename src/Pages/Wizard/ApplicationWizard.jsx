import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizardState } from '@/hooks/useWizardState';
import { useWizardRules, getRuleByQuestionKey, getNextQuestionKey } from '@/hooks/useWizardRules';
import { useWizardSubmission } from '@/hooks/useWizardSubmission';
import WizardStep from './WizardStep';
import DocumentChecklist from './DocumentChecklist';
import PersonalInfoForm from './PersonalInfoForm';
import SubmissionSummary from './SubmissionSummary';
import BreadCumb from '@/Components/Common/BreadCumb';

const ApplicationWizard = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    answers,
    currentQuestionKey,
    updateAnswer,
    goToNextStep,
    goToPreviousStep,
    resetWizard,
    completeWizard,
    canGoBack
  } = useWizardState();

  const { data: rules, isLoading } = useWizardRules();
  const { evaluateWizard, submitApplication, isSubmitting } = useWizardSubmission();

  const [wizardPhase, setWizardPhase] = useState('questions'); // questions | documents | personal-info | summary
  const [evaluation, setEvaluation] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const currentRule = getRuleByQuestionKey(rules, currentQuestionKey);
  const isLastQuestion = currentRule?.result_application_type_id != null;

  const handleAnswerSelect = (value) => {
    updateAnswer(currentQuestionKey, value);

    if (isLastQuestion) {
      // Move to document checklist
      handleEvaluateAndProceed();
    } else {
      const nextKey = getNextQuestionKey(currentRule, value);
      if (nextKey) {
        goToNextStep(nextKey);
      }
    }
  };

  const handleEvaluateAndProceed = async () => {
    try {
      const result = await evaluateWizard(answers);
      setEvaluation(result);
      setWizardPhase('documents');
    } catch (error) {
      console.error('Evaluation failed:', error);
    }
  };

  const handleDocumentsComplete = (files) => {
    setUploadedFiles(files);
    setWizardPhase('personal-info');
  };

  const handlePersonalInfoComplete = (info) => {
    setPersonalInfo(info);
    setWizardPhase('summary');
  };

  const handleFinalSubmit = async () => {
    try {
      const submission = await submitApplication({
        answers,
        personalInfo,
        files: uploadedFiles
      });
      
      completeWizard();
      navigate(`/wizard/confirmation/${submission.id}`);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  const handleBack = () => {
    if (wizardPhase === 'documents') {
      setWizardPhase('questions');
    } else if (wizardPhase === 'personal-info') {
      setWizardPhase('documents');
    } else if (wizardPhase === 'summary') {
      setWizardPhase('personal-info');
    } else if (canGoBack) {
      goToPreviousStep();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Wizard laden...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <BreadCumb pageTitle="Aanvraag Wizard" />
      
      <section className="py-20">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Progress Bar */}
              <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 text-dark fw-semibold">
                    <i className="bi bi-list-check me-2 text-primary"></i>
                    Voortgang
                  </h5>
                  <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 fs-6">
                    {wizardPhase === 'questions' && `Stap ${currentStep + 1}`}
                    {wizardPhase === 'documents' && 'Documenten'}
                    {wizardPhase === 'personal-info' && 'Persoonlijke Gegevens'}
                    {wizardPhase === 'summary' && 'Overzicht'}
                  </span>
                </div>
                <div className="progress" style={{ height: '12px', borderRadius: '8px' }}>
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ 
                      width: wizardPhase === 'questions' ? '25%' : 
                             wizardPhase === 'documents' ? '50%' : 
                             wizardPhase === 'personal-info' ? '75%' : '100%',
                      background: 'linear-gradient(90deg, #7444FD 0%, #9F7AFF 100%)',
                      transition: 'width 0.5s ease'
                    }}
                    aria-valuenow={wizardPhase === 'questions' ? 25 : 
                                   wizardPhase === 'documents' ? 50 : 
                                   wizardPhase === 'personal-info' ? 75 : 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </div>

              {/* Wizard Content */}
              <div className="card border-0 shadow-lg" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4 p-md-5">
                  {wizardPhase === 'questions' && currentRule && (
                    <WizardStep
                      rule={currentRule}
                      currentAnswer={answers[currentQuestionKey]}
                      onAnswerSelect={handleAnswerSelect}
                    />
                  )}

                  {wizardPhase === 'documents' && evaluation && (
                    <DocumentChecklist
                      requiredDocuments={evaluation.required_documents || []}
                      onComplete={handleDocumentsComplete}
                    />
                  )}

                  {wizardPhase === 'personal-info' && (
                    <PersonalInfoForm
                      onComplete={handlePersonalInfoComplete}
                      initialData={personalInfo}
                    />
                  )}

                  {wizardPhase === 'summary' && (
                    <SubmissionSummary
                      answers={answers}
                      personalInfo={personalInfo}
                      files={uploadedFiles}
                      evaluation={evaluation}
                      onSubmit={handleFinalSubmit}
                      isSubmitting={isSubmitting}
                    />
                  )}

                  {/* Navigation Buttons */}
                  <div className="d-flex justify-content-between mt-4 pt-4 border-top">
                    <button
                      onClick={handleBack}
                      className="btn btn-outline-secondary"
                      disabled={wizardPhase === 'questions' && !canGoBack}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Vorige
                    </button>

                    {wizardPhase !== 'summary' && (
                      <button
                        onClick={resetWizard}
                        className="btn btn-link text-danger"
                      >
                        Opnieuw beginnen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplicationWizard;
