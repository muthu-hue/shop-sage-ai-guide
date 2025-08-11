import { useState } from 'react';
import { Search as SearchIcon, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchHistory, SearchResult } from '@/contexts/SearchHistoryContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { addSearchToHistory } = useSearchHistory();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to search and save your history.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API search delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock results based on search query
    const mockResults: SearchResult[] = [
      {
        name: `${searchQuery} - Premium Model`,
        price: `$${(Math.random() * 500 + 50).toFixed(2)}`,
        store: "Amazon",
        url: "https://amazon.com",
        verified: true
      },
      {
        name: `${searchQuery} - Best Value`,
        price: `$${(Math.random() * 400 + 40).toFixed(2)}`,
        store: "Best Buy",
        url: "https://bestbuy.com",
        verified: true
      },
      {
        name: `${searchQuery} - Budget Option`,
        price: `$${(Math.random() * 300 + 30).toFixed(2)}`,
        store: "Walmart",
        url: "https://walmart.com",
        verified: true
      }
    ];
    
    setSearchResults(mockResults);
    addSearchToHistory(searchQuery, mockResults);
    setIsSearching(false);
  };


  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Product Search
          </h1>
          <p className="text-muted-foreground text-lg">
            Find genuine product links with AI-powered search
          </p>
        </div>

        {!hasSearched ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <div className="h-24 w-24 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center">
                <MessageSquare className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Search for the product to get the genuine link</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Enter any product name and I'll help you find the most trusted and genuine purchase links
              </p>
            </div>
            
            <div className="w-full max-w-2xl">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Button 
                  onClick={handleSearch} 
                  variant="hero" 
                  size="lg"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex gap-4 mb-8">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button 
                onClick={handleSearch} 
                variant="hero" 
                size="lg"
                disabled={isSearching}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>

            <div className="space-y-6">
              {searchResults.map((result) => (
                disabled={isSearching}
                <Card key={result.id} className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl">{result.title}</CardTitle>
                    <CardDescription>{result.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
              disabled={isSearching}
                    <div className="grid gap-4">
              {isSearching ? 'Searching...' : 'Search'}
                        <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{link.name[0]}</span>
            {searchResults.length > 0 && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl">Search Results for "{searchQuery}"</CardTitle>
                  <CardDescription>Here are the most genuine and trusted links for your search:</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                          <span className="font-bold text-lg text-primary">{result.price}</span>
                          {result.verified && (
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{result.store[0]}</span>
                          </div>
                          <div>
                          <Button variant="accent" size="sm" asChild>
                            <a href={result.url} target="_blank" rel="noopener noreferrer">
                            <p className="text-sm text-muted-foreground">from {result.store}</p>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;