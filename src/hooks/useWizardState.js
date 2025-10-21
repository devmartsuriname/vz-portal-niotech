import React, { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'wizard_progress';
const EXPIRATION_HOURS = 24;

export const useWizardState = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionPath, setQuestionPath] = useState(['application_type']);
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
          
          // Ensure we always start with application_type and don't load corrupted state
          if (questionPath.length === 0 || questionPath[0] !== 'application_type') {
            console.warn('Invalid saved wizard state detected, resetting to start');
            localStorage.removeItem(STORAGE_KEY);
            return;
          }
          
          setAnswers(data.answers || {});
          setCurrentStep(currentStep);
          setQuestionPath(questionPath);
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
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  }, [answers, currentStep, questionPath]);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      saveProgress();
    }
  }, [answers, currentStep, questionPath, saveProgress]);

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
