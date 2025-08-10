import { useState } from 'react';
import { Search as SearchIcon, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setHasSearched(true);
    // Simulate search results
    setSearchResults([
      {
        id: 1,
        title: "Best deals for " + searchQuery,
        description: "Here are the most genuine and trusted links for your search:",
        links: [
          { name: "Amazon", url: "https://amazon.com", price: "$99.99", verified: true },
          { name: "Best Buy", url: "https://bestbuy.com", price: "$104.99", verified: true },
          { name: "Walmart", url: "https://walmart.com", price: "$97.99", verified: true }
        ]
      }
    ]);
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
              >
                Search
              </Button>
            </div>

            <div className="space-y-6">
              {searchResults.map((result) => (
                <Card key={result.id} className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl">{result.title}</CardTitle>
                    <CardDescription>{result.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {result.links.map((link: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{link.name[0]}</span>
                            </div>
                            <div>
                              <p className="font-medium">{link.name}</p>
                              <p className="text-sm text-muted-foreground">{link.url}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-lg text-primary">{link.price}</span>
                            {link.verified && (
                              <div className="flex items-center gap-1 text-green-600 text-sm">
                                <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                                Verified
                              </div>
                            )}
                            <Button variant="accent" size="sm">
                              Visit Store
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;