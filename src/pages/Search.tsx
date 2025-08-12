import React, { useState } from 'react';
import { Search as SearchIcon, ShoppingBag, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchHistory } from '@/contexts/SearchHistoryContext';
import { toast } from 'sonner';

interface SearchResult {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  store: string;
  rating: number;
  reviews: number;
  image: string;
  url: string;
  verified: boolean;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { user } = useAuth();
  const { addSearch } = useSearchHistory();

  const generateMockResults = (searchQuery: string): SearchResult[] => {
    const stores = ['Amazon', 'eBay', 'Best Buy', 'Target', 'Walmart'];
    const basePrice = Math.floor(Math.random() * 500) + 50;
    
    return Array.from({ length: 5 }, (_, i) => ({
      id: `result-${i}`,
      title: `${searchQuery} - Premium Quality Model ${i + 1}`,
      price: `$${(basePrice + i * 20).toFixed(2)}`,
      originalPrice: i % 2 === 0 ? `$${(basePrice + i * 20 + 50).toFixed(2)}` : undefined,
      store: stores[i % stores.length],
      rating: 4.0 + Math.random() * 1,
      reviews: Math.floor(Math.random() * 1000) + 100,
      image: `https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop`,
      url: `https://example.com/product/${i}`,
      verified: true
    }));
  };

  const handleSearch = async () => {
    if (!user) {
      toast.error('Please sign in to search for products');
      return;
    }

    if (!query.trim()) {
      toast.error('Please enter a product name to search');
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResults = generateMockResults(query);
    setResults(mockResults);
    setHasSearched(true);
    setIsSearching(false);
    
    // Add to search history
    addSearch(query, mockResults.slice(0, 3));
    
    toast.success(`Found ${mockResults.length} genuine products for "${query}"`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-glow">
          <CardContent className="p-8 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Sign In Required
            </h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to search for genuine product links and save your search history.
            </p>
            <Button variant="hero" className="w-full">
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Search Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Product Search
            </h1>
            <p className="text-xl text-muted-foreground">
              Search for products to get genuine links from verified stores
            </p>
          </div>

          {/* Search Input */}
          <Card className="mb-8 shadow-card">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter product name (e.g., iPhone 15, Nike shoes, Gaming laptop...)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="text-lg h-12"
                    disabled={isSearching}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={isSearching || !query.trim()}
                  variant="hero"
                  size="lg"
                  className="px-8"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <SearchIcon className="w-5 h-5 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Initial State */}
          {!hasSearched && !isSearching && (
            <Card className="shadow-card">
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
                  <SearchIcon className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                  Search for the product to get the genuine link
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Enter any product name above and we'll find genuine links from verified stores 
                  with the best prices and authentic reviews.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Search Results */}
          {results.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Genuine Products Found
                </h2>
                <Badge variant="secondary" className="text-sm">
                  {results.length} verified results
                </Badge>
              </div>

              <div className="grid gap-6">
                {results.map((result) => (
                  <Card key={result.id} className="shadow-card hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                              {result.title}
                            </h3>
                            {result.verified && (
                              <Badge variant="default" className="ml-2 bg-green-100 text-green-800">
                                Verified
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{result.rating.toFixed(1)}</span>
                              <span className="text-muted-foreground">({result.reviews} reviews)</span>
                            </div>
                            <Badge variant="outline">{result.store}</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-bold text-primary">{result.price}</span>
                              {result.originalPrice && (
                                <span className="text-lg text-muted-foreground line-through">
                                  {result.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            <Button variant="hero" className="gap-2">
                              <ExternalLink className="w-4 h-4" />
                              View Product
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;