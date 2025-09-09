export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'likert' | 'rating' | 'scenario';
  options?: string[];
  category: 'psychometric' | 'technical' | 'wiscar' | 'domain';
  construct?: string; // Big5, Holland Code, etc.
  domain?: string;
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string;
  category: string;
}

export interface AssessmentScores {
  psychometric: number;
  technical: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
    overall: number;
  };
  overall: number;
}

export interface AssessmentResults {
  scores: AssessmentScores;
  recommendation: 'YES' | 'MAYBE' | 'NO';
  confidence: number;
  strengths: string[];
  gaps: string[];
  nextSteps: string[];
  suggestedRoles: string[];
  personality: string[];
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  responses: AssessmentResponse[];
  results?: AssessmentResults;
}