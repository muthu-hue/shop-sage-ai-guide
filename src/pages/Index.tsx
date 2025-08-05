import { Link } from 'react-router-dom';
import { Search, Image, Link as LinkIcon, Sparkles, Zap, Shield, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Product Search',
      description: 'AI-powered search to find exactly what you need across multiple platforms',
      link: '/search'
    },
    {
      icon: Image,
      title: 'Image Analysis',
      description: 'Upload product images to extract attributes and verify authenticity',
      link: '/image-analysis'
    },
    {
      icon: LinkIcon,
      title: 'Link Analyzer',
      description: 'Analyze product URLs for price tracking and website trustworthiness',
      link: '/link-analyzer'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant results with our AI-powered analysis'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Verify product authenticity and seller reliability'
    },
    {
      icon: TrendingUp,
      title: 'Price Intelligence',
      description: 'Track price history and get the best deals'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="AI Shopping Assistant" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Shopping Intelligence
            </Badge>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Your Intelligent Shopping Assistant
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover, analyze, and verify products with AI. From image recognition to price tracking, 
              ShopSage helps you make smarter shopping decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/search">
                  <Search className="h-5 w-5 mr-2" />
                  Start Searching
                </Link>
              </Button>
              <Button variant="outline" size="xl">
                <Star className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Smart Shopping</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to research, analyze, and purchase products with confidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105">
                  <CardHeader className="text-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="accent" className="w-full" asChild>
                      <Link to={feature.link}>
                        Try {feature.title}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose ShopSage?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology meets user-friendly design for the ultimate shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Shop Smarter?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who trust ShopSage for their shopping decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/search">
                  Get Started Now
                </Link>
              </Button>
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
