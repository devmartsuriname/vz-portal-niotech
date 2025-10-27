import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'wizard_progress';
const EXPIRATION_HOURS = 24;

export const useWizardState = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionPath, setQuestionPath] = useState(['application_type']);
  const [wizardPhase, setWizardPhase] = useState('questions');
  const [isComplete, setIsComplete] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { data, timestamp } = JSON.parse(saved);
        const hoursSince = (Date.now() - timestamp) / (1000 * 60 * 60);
        
        if (hoursSince < EXPIRATION_HOURS) {
          // Validate that we have a proper question path
          const questionPath = data.questionPath || ['application_type'];
          const currentStep = data.currentStep || 0;
          const savedPhase = data.wizardPhase || 'questions';
          
          // Ensure we always start with application_type and don't load corrupted state
          if (questionPath.length === 0 || questionPath[0] !== 'application_type') {
            console.warn('Invalid saved wizard state detected, resetting to start');
            localStorage.removeItem(STORAGE_KEY);
            return;
          }
          
          // Validate wizardPhase - if phase is advanced but no corresponding data exists, reset
          if (savedPhase !== 'questions' && Object.keys(data.answers || {}).length === 0) {
            console.warn('Invalid wizard phase without answers, resetting to questions');
            localStorage.removeItem(STORAGE_KEY);
            return;
          }
          
          setAnswers(data.answers || {});
          setCurrentStep(currentStep);
          setQuestionPath(questionPath);
          setWizardPhase(savedPhase);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error('Failed to load wizard progress:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save progress whenever it changes
  const saveProgress = useCallback(() => {
    const data = {
      answers,
      currentStep,
      questionPath,
      wizardPhase,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  }, [answers, currentStep, questionPath, wizardPhase]);

  useEffect(() => {
    if (Object.keys(answers).length > 0 || wizardPhase !== 'questions') {
      saveProgress();
    }
  }, [answers, currentStep, questionPath, wizardPhase, saveProgress]);

  const updateAnswer = useCallback((questionKey, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionKey]: value
    }));
  }, []);

  const goToNextStep = useCallback((nextQuestionKey) => {
    setCurrentStep(prev => prev + 1);
    if (nextQuestionKey) {
      setQuestionPath(prev => [...prev, nextQuestionKey]);
    }
  }, []);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setQuestionPath(prev => prev.slice(0, -1));
    }
  }, [currentStep]);

  const resetWizard = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setQuestionPath(['application_type']);
    setWizardPhase('questions');
    setIsComplete(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const completeWizard = useCallback(() => {
    setIsComplete(true);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    currentStep,
    answers,
    questionPath,
    wizardPhase,
    setWizardPhase,
    isComplete,
    currentQuestionKey: questionPath[currentStep],
    updateAnswer,
    goToNextStep,
    goToPreviousStep,
    resetWizard,
    completeWizard,
    canGoBack: currentStep > 0
  };
};
