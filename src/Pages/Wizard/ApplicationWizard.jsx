import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
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
    wizardPhase,
    setWizardPhase,
    updateAnswer,
    goToNextStep,
    goToPreviousStep,
    resetWizard,
    completeWizard,
    canGoBack
  } = useWizardState();

  const { data: rules, isLoading } = useWizardRules();
  const { evaluateWizard, submitApplication, isSubmitting } = useWizardSubmission();

  const [evaluation, setEvaluation] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Safety validation: Ensure wizard state is consistent on mount
  useEffect(() => {
    // If we're not in questions phase but have no evaluation, reset everything
    if (wizardPhase === 'documents' && !evaluation) {
      console.warn('Invalid state: documents phase without evaluation, resetting wizard');
      resetWizard();
      setEvaluation(null);
      setPersonalInfo({});
      setUploadedFiles([]);
    }
    // If we're in summary but no personal info, go back
    if (wizardPhase === 'summary' && Object.keys(personalInfo).length === 0) {
      console.warn('Invalid state: summary phase without personal info, going back');
      setWizardPhase('personal-info');
    }
  }, [wizardPhase, evaluation, personalInfo, resetWizard, setWizardPhase]);

  const currentRule = getRuleByQuestionKey(rules, currentQuestionKey);

  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleAnswerSelect = async (value) => {
    const newAnswers = { ...answers, [value]: value };
    updateAnswer(currentQuestionKey, value);

    // Check if there's a next question
    const nextKey = getNextQuestionKey(currentRule, value);
    
    if (nextKey) {
      // There's a next question, go to it
      console.log(`Moving to next question: ${nextKey}`);
      goToNextStep(nextKey);
    } else if (!isEvaluating) {
      // No next question means we've completed the wizard - evaluate now
      console.log('No next question found, evaluating wizard...');
      setIsEvaluating(true);
      await handleEvaluateAndProceed();
      setIsEvaluating(false);
    }
  };

  const handleEvaluateAndProceed = async () => {
    try {
      console.log('Starting evaluation with answers:', answers);
      const result = await evaluateWizard(answers);
      console.log('Evaluation result:', result);
      
      if (!result) {
        toast.error('Evaluatie mislukt. Probeer het opnieuw.');
        return;
      }
      
      setEvaluation(result);
      setWizardPhase('documents');
    } catch (error) {
      console.error('Evaluation failed:', error);
      toast.error('Er is een fout opgetreden bij het evalueren van uw antwoorden.');
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
      <BreadCumb Title="Aanvraag Wizard" />
      <div className="wizard-breadcrumb-spacer" />
      
      <section className="pt-24 pb-20 min-vh-100">
        <div className="container mb-24">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Progress Bar */}
              <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 text-dark fw-semibold">
                    <i className="bx bx-list-check me-2 text-primary"></i>
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
                      <i className="bx bx-left-arrow-alt me-2"></i>
                      Vorige
                    </button>

                  {wizardPhase !== 'summary' && (
                      <button
                        onClick={() => {
                          resetWizard();
                          setEvaluation(null);
                          setPersonalInfo({});
                          setUploadedFiles([]);
                        }}
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
