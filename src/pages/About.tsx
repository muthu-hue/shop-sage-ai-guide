import { Info, Sparkles, Zap, Shield, TrendingUp, Users, Award, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Search',
      description: 'Get instant results with our AI-powered search engine that scans multiple platforms simultaneously.'
    },
    {
      icon: Shield,
      title: 'Trust & Verification',
      description: 'Every link is verified for authenticity and seller reliability to ensure safe shopping experiences.'
    },
    {
      icon: TrendingUp,
      title: 'Price Intelligence',
      description: 'Track price history and get notifications for the best deals across different retailers.'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Search across major e-commerce platforms worldwide to find the best products and prices.'
    }
  ];

  const stats = [
    { label: 'Products Analyzed', value: '10M+', icon: Award },
    { label: 'Happy Users', value: '50K+', icon: Users },
    { label: 'Verified Stores', value: '500+', icon: Shield },
    { label: 'Countries Served', value: '25+', icon: Globe }
  ];

  const team = [
    {
      name: 'AI Research Team',
      role: 'Machine Learning & NLP',
      description: 'Developing cutting-edge algorithms for product recognition and price analysis.'
    },
    {
      name: 'Security Team',
      role: 'Trust & Safety',
      description: 'Ensuring all recommended links are safe and from verified sellers.'
    },
    {
      name: 'Product Team',
      role: 'User Experience',
      description: 'Creating intuitive interfaces that make shopping research effortless.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="h-20 w-20 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            About ShopSage
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your intelligent shopping assistant powered by advanced AI technology. 
            We help you make smarter purchasing decisions by finding genuine products 
            and trusted sellers across the web.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="shadow-card mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto">
              To revolutionize online shopping by providing AI-powered tools that help consumers 
              find authentic products, compare prices intelligently, and shop with confidence. 
              We believe everyone deserves access to genuine products at fair prices from trusted sellers.
            </p>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">ShopSage by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="shadow-card text-center">
                  <CardContent className="pt-6">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technology Section */}
        <Card className="shadow-card mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Powered by Advanced AI</CardTitle>
            <CardDescription className="text-lg">
              Our technology stack combines machine learning, natural language processing, 
              and real-time data analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Machine Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms that learn from millions of product data points
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Security First</h3>
                <p className="text-sm text-muted-foreground">
                  Multi-layer verification system to ensure seller authenticity
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Real-time Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Live price tracking and market analysis for better decisions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Expert Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Get in Touch</CardTitle>
            <CardDescription>
              Have questions or feedback? We'd love to hear from you.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold mb-2">Support</h3>
                <p className="text-muted-foreground">support@shopsage.ai</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Business</h3>
                <p className="text-muted-foreground">business@shopsage.ai</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Press</h3>
                <p className="text-muted-foreground">press@shopsage.ai</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;