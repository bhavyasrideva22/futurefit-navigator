import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { AssessmentState } from '@/types/assessment';

interface SectionProgressProps {
  currentSection: AssessmentState['currentSection'];
  completedSections: string[];
}

export function SectionProgress({ currentSection, completedSections }: SectionProgressProps) {
  const sections = [
    { id: 'psychometric', title: 'Psychological Fit', duration: '7 min' },
    { id: 'technical', title: 'Technical Aptitude', duration: '6 min' },
    { id: 'wiscar', title: 'WISCAR Analysis', duration: '5 min' },
    { id: 'results', title: 'Results & Guidance', duration: '2 min' },
  ];

  const getSectionStatus = (sectionId: string) => {
    if (completedSections.includes(sectionId)) return 'completed';
    if (sectionId === currentSection) return 'active';
    return 'pending';
  };

  const getIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'active':
        return <Clock className="w-5 h-5 text-professional" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {sections.map((section, index) => {
            const status = getSectionStatus(section.id);
            return (
              <div key={section.id} className="flex items-center gap-3 min-w-0">
                {getIcon(status)}
                <div className="min-w-0">
                  <div className={`font-medium text-sm ${
                    status === 'active' ? 'text-professional' :
                    status === 'completed' ? 'text-success' :
                    'text-muted-foreground'
                  }`}>
                    {section.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {section.duration}
                  </div>
                </div>
                {index < sections.length - 1 && (
                  <div className="hidden md:block w-8 h-px bg-border ml-4" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}