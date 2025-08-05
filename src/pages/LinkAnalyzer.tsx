import { useState } from 'react';
import { Link, Shield, TrendingUp, Globe, ExternalLink, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const LinkAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  const analyzeLink = async () => {
    if (!url) {
      toast({
        title: "Please enter a URL",
        description: "Enter a product URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    // Simulate API analysis
    setTimeout(() => {
      setAnalysisResults({
        productInfo: {
          title: "Apple AirPods Pro (2nd Generation)",
          price: "$249.00",
          originalPrice: "$279.00",
          discount: "11%",
          availability: "In Stock",
          seller: "Amazon",
          image: "/placeholder.svg"
        },
        websiteTrust: {
          score: 85,
          status: "Trusted",
          factors: [
            { name: "SSL Certificate", status: "valid", icon: CheckCircle },
            { name: "Domain Age", status: "valid", icon: CheckCircle },
            { name: "Customer Reviews", status: "good", icon: CheckCircle },
            { name: "Return Policy", status: "clear", icon: CheckCircle }
          ]
        },
        priceAnalysis: {
          currentPrice: 249,
          averagePrice: 265,
          lowestPrice: 235,
          highestPrice: 279,
          trend: "decreasing",
          priceHistory: [279, 270, 265, 260, 255, 249]
        },
        reviews: {
          totalReviews: 45632,
          averageRating: 4.6,
          sentiment: "Positive",
          recentReviews: [
            "Excellent sound quality and noise cancellation",
            "Great for workouts, stays in place",
            "Battery life is impressive"
          ]
        }
      });
      setAnalyzing(false);
    }, 3000);
  };

  const getTrustColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getTrustIcon = (score: number) => {
    if (score >= 80) return CheckCircle;
    if (score >= 60) return AlertTriangle;
    return XCircle;
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Link Analyzer
          </h1>
          <p className="text-muted-foreground text-lg">
            Analyze product links for price tracking, authenticity, and website trustworthiness
          </p>
        </div>

        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Product URL Analysis
            </CardTitle>
            <CardDescription>
              Enter a product URL to extract details and verify the seller
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="https://example.com/product-page"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={analyzeLink} 
                variant="hero" 
                disabled={analyzing}
              >
                {analyzing ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {analyzing && (
          <Card className="mb-8 shadow-card">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="text-lg font-medium">Analyzing link...</p>
                <Progress value={45} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Extracting product data and checking website trustworthiness
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {analysisResults && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <div className="text-2xl">🎧</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{analysisResults.productInfo.title}</h3>
                    <p className="text-muted-foreground">Sold by {analysisResults.productInfo.seller}</p>
                    <Badge variant="secondary" className="mt-1">
                      {analysisResults.productInfo.availability}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="text-2xl font-bold text-primary">{analysisResults.productInfo.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Original Price</p>
                    <p className="text-lg line-through text-muted-foreground">{analysisResults.productInfo.originalPrice}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {analysisResults.productInfo.discount} off
                    </Badge>
                  </div>
                </div>

                <Button variant="accent" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Product Page
                </Button>
              </CardContent>
            </Card>

            {/* Website Trust Score */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Website Trust Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getTrustColor(analysisResults.websiteTrust.score)}`}>
                    {(() => {
                      const Icon = getTrustIcon(analysisResults.websiteTrust.score);
                      return <Icon className="h-5 w-5" />;
                    })()}
                    <span className="font-bold text-lg">{analysisResults.websiteTrust.score}/100</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{analysisResults.websiteTrust.status} Website</p>
                </div>

                <div className="space-y-3">
                  {analysisResults.websiteTrust.factors.map((factor: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="font-medium">{factor.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm capitalize text-green-600">{factor.status}</span>
                        <factor.icon className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Analysis */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Price Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Average</p>
                    <p className="font-bold">${analysisResults.priceAnalysis.averagePrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lowest</p>
                    <p className="font-bold text-green-600">${analysisResults.priceAnalysis.lowestPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Highest</p>
                    <p className="font-bold text-red-600">${analysisResults.priceAnalysis.highestPrice}</p>
                  </div>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Price Trend</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      ↓ Decreasing
                    </Badge>
                  </div>
                  <div className="h-16 bg-gradient-primary/10 rounded-lg flex items-end justify-between px-2 pb-2">
                    {analysisResults.priceAnalysis.priceHistory.map((price: number, index: number) => (
                      <div
                        key={index}
                        className="bg-primary/60 rounded-t-sm"
                        style={{ height: `${(price / 279) * 100}%`, width: '12px' }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Summary */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Customer Reviews Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{analysisResults.reviews.averageRating}/5</p>
                    <p className="text-sm text-muted-foreground">
                      {analysisResults.reviews.totalReviews.toLocaleString()} reviews
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {analysisResults.reviews.sentiment} Sentiment
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Recent Reviews</h4>
                  <div className="space-y-2">
                    {analysisResults.reviews.recentReviews.map((review: string, index: number) => (
                      <div key={index} className="p-3 bg-secondary rounded-lg">
                        <p className="text-sm">"{review}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkAnalyzer;