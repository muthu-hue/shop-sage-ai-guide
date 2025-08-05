import { useState } from 'react';
import { Search as SearchIcon, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  };

  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: "$79.99",
      rating: 4.5,
      image: "/placeholder.svg",
      description: "High-quality wireless headphones with noise cancellation"
    },
    {
      id: 2,
      name: "Smart Fitness Tracker",
      price: "$129.99",
      rating: 4.3,
      image: "/placeholder.svg",
      description: "Advanced fitness tracking with heart rate monitoring"
    },
    {
      id: 3,
      name: "Portable Phone Charger",
      price: "$24.99",
      rating: 4.7,
      image: "/placeholder.svg",
      description: "Fast-charging portable battery pack"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Product Search
          </h1>
          <p className="text-muted-foreground text-lg">
            Find the perfect products with AI-powered search
          </p>
        </div>

        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              variant="hero" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <Card key={product.id} className="shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="aspect-square bg-gradient-secondary rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-4xl">📱</div>
                </div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Badge variant="secondary">★ {product.rating}</Badge>
                </div>
                <Button variant="accent" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;