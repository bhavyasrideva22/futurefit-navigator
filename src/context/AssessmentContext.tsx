import React, { createContext, useContext, useReducer } from 'react';
import { AssessmentState, AssessmentResponse } from '@/types/assessment';
import { calculateScores, generateResults } from '@/utils/assessment-scoring';

interface AssessmentContextType {
  state: AssessmentState;
  addResponse: (response: AssessmentResponse) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToSection: (section: AssessmentState['currentSection']) => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

type AssessmentAction =
  | { type: 'ADD_RESPONSE'; payload: AssessmentResponse }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'GO_TO_SECTION'; payload: AssessmentState['currentSection'] }
  | { type: 'COMPLETE_ASSESSMENT' }
  | { type: 'RESET_ASSESSMENT' };

const initialState: AssessmentState = {
  currentSection: 'intro',
  currentQuestionIndex: 0,
  responses: [],
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'ADD_RESPONSE':
      const existingResponseIndex = state.responses.findIndex(
        r => r.questionId === action.payload.questionId
      );
      
      let newResponses;
      if (existingResponseIndex >= 0) {
        newResponses = [...state.responses];
        newResponses[existingResponseIndex] = action.payload;
      } else {
        newResponses = [...state.responses, action.payload];
      }
      
      return { ...state, responses: newResponses };

    case 'NEXT_QUESTION':
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };

    case 'PREVIOUS_QUESTION':
      return { 
        ...state, 
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1) 
      };

    case 'GO_TO_SECTION':
      return { 
        ...state, 
        currentSection: action.payload,
        currentQuestionIndex: 0 
      };

    case 'COMPLETE_ASSESSMENT':
      const scores = calculateScores(state.responses);
      const results = generateResults(scores);
      return { 
        ...state, 
        currentSection: 'results',
        results 
      };

    case 'RESET_ASSESSMENT':
      return initialState;

    default:
      return state;
  }
}

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const addResponse = (response: AssessmentResponse) => {
    dispatch({ type: 'ADD_RESPONSE', payload: response });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const goToSection = (section: AssessmentState['currentSection']) => {
    dispatch({ type: 'GO_TO_SECTION', payload: section });
  };

  const completeAssessment = () => {
    dispatch({ type: 'COMPLETE_ASSESSMENT' });
  };

  const resetAssessment = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
  };

  return (
    <AssessmentContext.Provider
      value={{
        state,
        addResponse,
        nextQuestion,
        previousQuestion,
        goToSection,
        completeAssessment,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}