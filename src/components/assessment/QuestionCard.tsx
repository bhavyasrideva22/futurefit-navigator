import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AssessmentQuestion, AssessmentResponse } from '@/types/assessment';
import { useAssessment } from '@/context/AssessmentContext';

interface QuestionCardProps {
  question: AssessmentQuestion;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ question, questionNumber, totalQuestions }: QuestionCardProps) {
  const { state, addResponse, nextQuestion, previousQuestion } = useAssessment();
  
  const currentResponse = state.responses.find(r => r.questionId === question.id);

  const handleAnswer = (value: number | string) => {
    const response: AssessmentResponse = {
      questionId: question.id,
      value,
      category: question.category,
    };
    addResponse(response);
  };

  const handleNext = () => {
    if (questionNumber < totalQuestions) {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    if (questionNumber > 1) {
      previousQuestion();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-professional">
            {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div 
            className="bg-professional h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
        <CardTitle className="text-xl">{question.text}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3">
          {question.options?.map((option, index) => (
            <Button
              key={index}
              variant={currentResponse?.value === index ? "default" : "outline"}
              className="justify-start text-left h-auto p-4 whitespace-normal"
              onClick={() => handleAnswer(index)}
            >
              {option}
            </Button>
          ))}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={questionNumber === 1}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!currentResponse || questionNumber === totalQuestions}
            className="bg-professional hover:bg-professional/90"
          >
            {questionNumber === totalQuestions ? 'Complete Section' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}