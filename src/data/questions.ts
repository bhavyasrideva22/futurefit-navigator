import { AssessmentQuestion } from '@/types/assessment';

export const psychometricQuestions: AssessmentQuestion[] = [
  {
    id: 'psych_1',
    text: 'I enjoy reviewing detailed regulatory documents and ensuring compliance.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    construct: 'Conscientiousness',
  },
  {
    id: 'psych_2',
    text: 'I prefer structured, systematic approaches to solving problems.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    construct: 'Conscientiousness',
  },
  {
    id: 'psych_3',
    text: 'I find it satisfying to catch errors and inconsistencies in documents.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    construct: 'Detail-Orientation',
  },
  {
    id: 'psych_4',
    text: 'I remain calm and focused when dealing with complex regulatory requirements.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    construct: 'Emotional-Stability',
  },
  {
    id: 'psych_5',
    text: 'I value honesty and integrity above personal gain.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    construct: 'Honesty-Humility',
  },
  {
    id: 'psych_6',
    text: 'I prefer working with data and analytical tasks over creative projects.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    construct: 'Holland-Investigative',
  },
];

export const technicalQuestions: AssessmentQuestion[] = [
  {
    id: 'tech_1',
    text: 'If Company A exports goods worth $100,000 and the tariff rate is 15%, what is the total duty owed?',
    type: 'multiple-choice',
    options: ['$10,000', '$15,000', '$20,000', '$25,000'],
    category: 'technical',
    domain: 'Trade-Calculations',
  },
  {
    id: 'tech_2',
    text: 'Which document is required for most international shipments?',
    type: 'multiple-choice',
    options: ['Commercial Invoice', 'Insurance Certificate', 'Bank Statement', 'Tax Return'],
    category: 'technical',
    domain: 'Documentation',
  },
  {
    id: 'tech_3',
    text: 'What does "FOB" stand for in international trade terms?',
    type: 'multiple-choice',
    options: ['Free On Board', 'Freight On Board', 'Full Order Billing', 'Foreign Operations Base'],
    category: 'technical',
    domain: 'Incoterms',
  },
  {
    id: 'tech_4',
    text: 'A logical sequence follows: 2, 4, 8, 16, ?. What comes next?',
    type: 'multiple-choice',
    options: ['24', '28', '32', '36'],
    category: 'technical',
    domain: 'Logical-Reasoning',
  },
  {
    id: 'tech_5',
    text: 'Which organization oversees global trade rules?',
    type: 'multiple-choice',
    options: ['WTO', 'WHO', 'IMF', 'UNESCO'],
    category: 'technical',
    domain: 'Global-Trade',
  },
];

export const wiscarQuestions: AssessmentQuestion[] = [
  {
    id: 'wiscar_1',
    text: 'I stick with tasks even when they become challenging or tedious.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'wiscar',
    construct: 'Will-Grit',
  },
  {
    id: 'wiscar_2',
    text: 'I am genuinely curious about international trade regulations.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'wiscar',
    construct: 'Interest',
  },
  {
    id: 'wiscar_3',
    text: 'I have experience with legal or regulatory documentation.',
    type: 'likert',
    options: ['No Experience', 'Limited', 'Some', 'Considerable', 'Extensive'],
    category: 'wiscar',
    construct: 'Skill',
  },
  {
    id: 'wiscar_4',
    text: 'I can quickly understand complex relationships between different regulations.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'wiscar',
    construct: 'Cognitive',
  },
  {
    id: 'wiscar_5',
    text: 'I actively seek feedback to improve my performance.',
    type: 'likert',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
    category: 'wiscar',
    construct: 'Ability-to-Learn',
  },
  {
    id: 'wiscar_6',
    text: 'I understand that trade compliance work involves routine monitoring and reporting.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'wiscar',
    construct: 'Real-World',
  },
];

export const allQuestions = [
  ...psychometricQuestions,
  ...technicalQuestions,
  ...wiscarQuestions,
];