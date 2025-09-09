import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Target, Users } from 'lucide-react';
import { AssessmentResults } from '@/types/assessment';

interface ResultsCardProps {
  results: AssessmentResults;
}

export function ResultsCard({ results }: ResultsCardProps) {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'YES': return 'text-success';
      case 'MAYBE': return 'text-warning';
      case 'NO': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'YES': return <CheckCircle className="w-6 h-6 text-success" />;
      case 'MAYBE': return <AlertCircle className="w-6 h-6 text-warning" />;
      case 'NO': return <XCircle className="w-6 h-6 text-destructive" />;
      default: return null;
    }
  };

  const getRecommendationMessage = (recommendation: string) => {
    switch (recommendation) {
      case 'YES': return "You're a Great Fit for Trade Compliance!";
      case 'MAYBE': return "You Show Promise for Trade Compliance";
      case 'NO': return "Consider Alternative Career Paths";
      default: return "";
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Main Recommendation */}
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {getRecommendationIcon(results.recommendation)}
          </div>
          <CardTitle className={`text-2xl ${getRecommendationColor(results.recommendation)}`}>
            {getRecommendationMessage(results.recommendation)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-lg font-semibold mb-2">
                Confidence Score: {results.confidence}%
              </div>
              <Progress value={results.confidence} className="w-full max-w-md mx-auto" />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {results.personality.map((trait, index) => (
                <Badge key={index} variant="secondary">{trait}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Assessment Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Psychological Fit</span>
                <span className="font-semibold">{results.scores.psychometric}/100</span>
              </div>
              <Progress value={results.scores.psychometric} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Technical Readiness</span>
                <span className="font-semibold">{results.scores.technical}/100</span>
              </div>
              <Progress value={results.scores.technical} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>WISCAR Overall</span>
                <span className="font-semibold">{results.scores.wiscar.overall}/100</span>
              </div>
              <Progress value={results.scores.wiscar.overall} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              WISCAR Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(results.scores.wiscar).filter(([key]) => key !== 'overall').map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm capitalize">{key}</span>
                  <span className="text-sm font-semibold">{value}/100</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Strengths and Gaps */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-success">Key Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-warning">Areas for Development</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.gaps.map((gap, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{gap}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps and Suggested Roles */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {results.nextSteps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-professional text-professional-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Suggested Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.suggestedRoles.map((role, index) => (
                <Badge key={index} variant="outline" className="block text-center p-2">
                  {role}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}