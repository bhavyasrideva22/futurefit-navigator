import { useEffect } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { SectionProgress } from '@/components/assessment/SectionProgress';
import { ResultsCard } from '@/components/assessment/ResultsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { psychometricQuestions, technicalQuestions, wiscarQuestions } from '@/data/questions';
import { ArrowLeft, Clock, Users, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Assessment() {
  const { state, goToSection, completeAssessment } = useAssessment();

  const getSectionQuestions = () => {
    switch (state.currentSection) {
      case 'psychometric':
        return psychometricQuestions;
      case 'technical':
        return technicalQuestions;
      case 'wiscar':
        return wiscarQuestions;
      default:
        return [];
    }
  };

  const questions = getSectionQuestions();
  const currentQuestion = questions[state.currentQuestionIndex];

  const getCompletedSections = () => {
    const sections = [];
    const psychometricCompleted = psychometricQuestions.every(q => 
      state.responses.some(r => r.questionId === q.id)
    );
    const technicalCompleted = technicalQuestions.every(q => 
      state.responses.some(r => r.questionId === q.id)
    );
    const wiscarCompleted = wiscarQuestions.every(q => 
      state.responses.some(r => r.questionId === q.id)
    );

    if (psychometricCompleted) sections.push('psychometric');
    if (technicalCompleted) sections.push('technical');
    if (wiscarCompleted) sections.push('wiscar');

    return sections;
  };

  const completedSections = getCompletedSections();

  const handleSectionComplete = () => {
    const allQuestionsAnswered = questions.every(q => 
      state.responses.some(r => r.questionId === q.id)
    );

    if (allQuestionsAnswered) {
      switch (state.currentSection) {
        case 'psychometric':
          goToSection('technical');
          break;
        case 'technical':
          goToSection('wiscar');
          break;
        case 'wiscar':
          completeAssessment();
          break;
      }
    }
  };

  useEffect(() => {
    if (state.currentQuestionIndex >= questions.length && questions.length > 0) {
      handleSectionComplete();
    }
  }, [state.currentQuestionIndex, questions.length]);

  if (state.currentSection === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
        <div className="max-w-4xl mx-auto py-8 space-y-8">
          <div className="text-center space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-professional to-professional/70 bg-clip-text text-transparent">
              FutureFit Readiness Assessment™
            </h1>
            <p className="text-xl text-muted-foreground">Trade Compliance Officer</p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Assessment Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <Clock className="w-8 h-8 mx-auto text-professional" />
                  <div className="font-semibold">25 Minutes</div>
                  <div className="text-sm text-muted-foreground">Total Duration</div>
                </div>
                <div className="text-center space-y-2">
                  <Target className="w-8 h-8 mx-auto text-professional" />
                  <div className="font-semibold">4 Sections</div>
                  <div className="text-sm text-muted-foreground">Comprehensive Analysis</div>
                </div>
                <div className="text-center space-y-2">
                  <TrendingUp className="w-8 h-8 mx-auto text-professional" />
                  <div className="font-semibold">Personalized</div>
                  <div className="text-sm text-muted-foreground">Career Guidance</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">What You'll Discover:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-professional rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Psychological Fit:</strong> How well your personality aligns with trade compliance work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-professional rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Technical Readiness:</strong> Your current knowledge and analytical abilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-professional rounded-full mt-2 flex-shrink-0" />
                    <span><strong>WISCAR Analysis:</strong> Your Will, Interest, Skill, Cognitive ability, Ability to learn, and Real-world alignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-professional rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Career Guidance:</strong> Personalized next steps and role recommendations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">About Trade Compliance Officers:</h4>
                <p className="text-sm text-muted-foreground">
                  Trade Compliance Officers ensure companies follow international trade regulations. 
                  They monitor global trade laws, manage export/import controls, and handle risk 
                  related to sanctions, customs, and licensing requirements.
                </p>
              </div>

              <Button 
                onClick={() => goToSection('psychometric')}
                className="w-full bg-professional hover:bg-professional/90 py-6 text-lg"
              >
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (state.currentSection === 'results' && state.results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
        <div className="max-w-6xl mx-auto py-8 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Your Assessment Results</h1>
            <p className="text-muted-foreground">
              Based on your responses, here's your personalized career guidance
            </p>
          </div>
          <ResultsCard results={state.results} />
          <div className="text-center space-y-4">
            <Link to="/">
              <Button variant="outline">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-4xl mx-auto py-8 space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Exit Assessment
          </Link>
          <h1 className="text-2xl font-bold">FutureFit Assessment</h1>
        </div>

        <SectionProgress 
          currentSection={state.currentSection} 
          completedSections={completedSections}
        />

        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            questionNumber={state.currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        )}
      </div>
    </div>
  );
}