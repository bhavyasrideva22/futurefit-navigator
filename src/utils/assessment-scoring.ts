import { AssessmentResponse, AssessmentScores, AssessmentResults } from '@/types/assessment';

export function calculateScores(responses: AssessmentResponse[]): AssessmentScores {
  const psychometricResponses = responses.filter(r => r.category === 'psychometric');
  const technicalResponses = responses.filter(r => r.category === 'technical');
  const wiscarResponses = responses.filter(r => r.category === 'wiscar');

  // Calculate psychometric score (0-100)
  const psychometricScore = psychometricResponses.length > 0 
    ? (psychometricResponses.reduce((sum, r) => sum + Number(r.value), 0) / (psychometricResponses.length * 5)) * 100
    : 0;

  // Calculate technical score (0-100)
  const technicalScore = technicalResponses.length > 0
    ? (technicalResponses.filter(r => isCorrectAnswer(r)).length / technicalResponses.length) * 100
    : 0;

  // Calculate WISCAR scores
  const wiscarScoresByConstruct = {
    will: calculateConstructScore(wiscarResponses, 'Will-Grit'),
    interest: calculateConstructScore(wiscarResponses, 'Interest'),
    skill: calculateConstructScore(wiscarResponses, 'Skill'),
    cognitive: calculateConstructScore(wiscarResponses, 'Cognitive'),
    ability: calculateConstructScore(wiscarResponses, 'Ability-to-Learn'),
    realWorld: calculateConstructScore(wiscarResponses, 'Real-World'),
  };

  const wiscarOverall = Object.values(wiscarScoresByConstruct).reduce((sum, score) => sum + score, 0) / 6;

  const overall = (psychometricScore * 0.4 + technicalScore * 0.3 + wiscarOverall * 0.3);

  return {
    psychometric: Math.round(psychometricScore),
    technical: Math.round(technicalScore),
    wiscar: {
      ...Object.fromEntries(
        Object.entries(wiscarScoresByConstruct).map(([key, value]) => [key, Math.round(value)])
      ) as any,
      overall: Math.round(wiscarOverall),
    },
    overall: Math.round(overall),
  };
}

function calculateConstructScore(responses: AssessmentResponse[], construct: string): number {
  const constructResponses = responses.filter(r => {
    // This would normally check the question metadata, simplified for demo
    return r.questionId.includes(construct.toLowerCase().split('-')[0]);
  });

  if (constructResponses.length === 0) return 0;
  
  return (constructResponses.reduce((sum, r) => sum + Number(r.value), 0) / (constructResponses.length * 5)) * 100;
}

function isCorrectAnswer(response: AssessmentResponse): boolean {
  // Simplified correct answers mapping
  const correctAnswers: Record<string, number> = {
    'tech_1': 1, // $15,000
    'tech_2': 0, // Commercial Invoice
    'tech_3': 0, // Free On Board
    'tech_4': 2, // 32
    'tech_5': 0, // WTO
  };

  return correctAnswers[response.questionId] === Number(response.value);
}

export function generateResults(scores: AssessmentScores): AssessmentResults {
  const { overall, psychometric, technical, wiscar } = scores;
  
  let recommendation: 'YES' | 'MAYBE' | 'NO';
  let confidence: number;

  if (overall >= 75 && psychometric >= 70 && technical >= 60) {
    recommendation = 'YES';
    confidence = Math.min(95, overall + 10);
  } else if (overall >= 55 && (psychometric >= 60 || technical >= 50)) {
    recommendation = 'MAYBE';
    confidence = overall;
  } else {
    recommendation = 'NO';
    confidence = Math.max(20, overall - 10);
  }

  const strengths: string[] = [];
  const gaps: string[] = [];

  if (psychometric >= 75) strengths.push('Strong psychological fit for compliance work');
  if (technical >= 75) strengths.push('Solid technical and analytical foundation');
  if (wiscar.overall >= 75) strengths.push('Excellent learning readiness and career alignment');
  if (wiscar.will >= 80) strengths.push('High persistence and determination');
  if (wiscar.interest >= 80) strengths.push('Strong genuine interest in trade compliance');

  if (psychometric < 60) gaps.push('May need to develop structured thinking patterns');
  if (technical < 50) gaps.push('Requires foundational knowledge in trade and compliance');
  if (wiscar.skill < 60) gaps.push('Limited current skill base - need training');
  if (wiscar.cognitive < 60) gaps.push('May benefit from analytical skill development');

  const nextSteps: string[] = [];
  const suggestedRoles: string[] = [];

  if (recommendation === 'YES') {
    nextSteps.push('Begin with "Introduction to International Trade" course');
    nextSteps.push('Explore trade compliance certifications');
    nextSteps.push('Consider internships or entry-level positions');
    suggestedRoles.push('Trade Compliance Analyst', 'Customs Broker Assistant', 'Compliance Specialist');
  } else if (recommendation === 'MAYBE') {
    nextSteps.push('Strengthen foundational knowledge first');
    nextSteps.push('Take exploratory courses in business law');
    nextSteps.push('Consider informational interviews with professionals');
    suggestedRoles.push('Regulatory Research Assistant', 'Documentation Specialist');
  } else {
    nextSteps.push('Explore alternative career paths');
    nextSteps.push('Consider roles in supply chain or procurement');
    suggestedRoles.push('Data Analyst', 'Quality Assurance Analyst', 'Procurement Associate');
  }

  const personality: string[] = [];
  if (psychometric >= 70) personality.push('Detail-Oriented');
  if (wiscar.will >= 70) personality.push('Persistent');
  if (wiscar.interest >= 70) personality.push('Curious');
  if (technical >= 70) personality.push('Analytical');

  return {
    scores,
    recommendation,
    confidence,
    strengths,
    gaps,
    nextSteps,
    suggestedRoles,
    personality,
  };
}