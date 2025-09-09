import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Clock, TrendingUp, CheckCircle, Users, Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Powered by AI & Psychometric Science
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-professional via-professional to-professional/70 bg-clip-text text-transparent">
                FutureFit Readiness
              </span>
              <br />
              <span className="text-foreground">Assessment™</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Discover if you're ready for a career as a <strong>Trade Compliance Officer</strong> with our comprehensive, scientifically-validated assessment
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/assessment">
              <Button size="lg" className="bg-professional hover:bg-professional/90 px-8 py-4 text-lg">
                Start Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>25 minutes • Free • Instant results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Take This Assessment?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get scientifically-backed insights into your career fit using proven psychological frameworks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Target className="w-12 h-12 mx-auto text-professional mb-4" />
                <CardTitle>Precise Career Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Uses Big Five personality model, Holland Codes, and WISCAR framework to assess your fit for trade compliance roles
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="w-12 h-12 mx-auto text-professional mb-4" />
                <CardTitle>Comprehensive Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Evaluates psychological fit, technical readiness, and learning potential across multiple dimensions
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-professional mb-4" />
                <CardTitle>Personalized Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive tailored next steps, learning paths, and alternative career suggestions based on your results
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Components */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You'll Experience</h2>
            <p className="text-lg text-muted-foreground">
              Four comprehensive sections designed to evaluate your career readiness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-professional/10 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-professional font-bold">1</span>
                </div>
                <CardTitle className="text-lg">Psychological Fit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Personality alignment, work preferences, and behavioral indicators
                </p>
                <Badge variant="outline" className="text-xs">7 minutes</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-professional/10 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-professional font-bold">2</span>
                </div>
                <CardTitle className="text-lg">Technical Aptitude</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Logical reasoning, trade knowledge, and analytical capabilities
                </p>
                <Badge variant="outline" className="text-xs">6 minutes</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-professional/10 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-professional font-bold">3</span>
                </div>
                <CardTitle className="text-lg">WISCAR Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Will, Interest, Skill, Cognitive readiness, Ability to learn, Real-world fit
                </p>
                <Badge variant="outline" className="text-xs">5 minutes</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-professional/10 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-professional font-bold">4</span>
                </div>
                <CardTitle className="text-lg">Results & Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Personalized recommendations and career pathway guidance
                </p>
                <Badge variant="outline" className="text-xs">2 minutes</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Career Info */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-professional" />
                <div>
                  <CardTitle className="text-2xl">About Trade Compliance Officer Careers</CardTitle>
                  <p className="text-muted-foreground">High-demand roles in global trade</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Trade Compliance Officers ensure companies follow all regulations related to international trade. 
                They monitor global trade laws, ensure adherence to export/import controls, and manage risk 
                related to sanctions, customs, and licenses.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Typical Career Paths
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Trade Compliance Analyst</li>
                    <li>• Export Compliance Officer</li>
                    <li>• Global Trade Manager</li>
                    <li>• Customs Compliance Consultant</li>
                    <li>• Regulatory Affairs Associate</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Key Success Traits
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• High attention to detail</li>
                    <li>• Risk management mindset</li>
                    <li>• Integrity and ethical orientation</li>
                    <li>• Analytical thinking</li>
                    <li>• Legal and regulatory awareness</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-professional/5 to-professional/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Career Fit?</h2>
            <p className="text-lg text-muted-foreground">
              Take the first step towards understanding your potential in trade compliance
            </p>
          </div>

          <Link to="/assessment">
            <Button size="lg" className="bg-professional hover:bg-professional/90 px-8 py-4 text-lg">
              Begin Your Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground">
            No signup required • Instant results • Completely confidential
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
