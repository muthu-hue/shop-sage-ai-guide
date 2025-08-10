import { useState } from 'react';
import { History as HistoryIcon, Search, Trash2, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const History = () => {
  const { toast } = useToast();
  const [searchHistory, setSearchHistory] = useState([
    {
      id: 1,
      query: "Wireless Bluetooth Headphones",
      timestamp: "2024-01-15 14:30",
      results: 5,
      topResult: {
        name: "Sony WH-1000XM4",
        price: "$279.99",
        store: "Amazon"
      }
    },
    {
      id: 2,
      query: "Gaming Laptop",
      timestamp: "2024-01-14 09:15",
      results: 8,
      topResult: {
        name: "ASUS ROG Strix G15",
        price: "$1,299.99",
        store: "Best Buy"
      }
    },
    {
      id: 3,
      query: "iPhone 15 Pro",
      timestamp: "2024-01-13 16:45",
      results: 12,
      topResult: {
        name: "iPhone 15 Pro 256GB",
        price: "$1,099.99",
        store: "Apple Store"
      }
    },
    {
      id: 4,
      query: "Running Shoes",
      timestamp: "2024-01-12 11:20",
      results: 15,
      topResult: {
        name: "Nike Air Zoom Pegasus",
        price: "$129.99",
        store: "Nike"
      }
    },
    {
      id: 5,
      query: "Smart Watch",
      timestamp: "2024-01-11 13:10",
      results: 7,
      topResult: {
        name: "Apple Watch Series 9",
        price: "$399.99",
        store: "Amazon"
      }
    }
  ]);

  const clearHistory = () => {
    setSearchHistory([]);
    toast({
      title: "History Cleared",
      description: "Your search history has been cleared successfully.",
    });
  };

  const removeItem = (id: number) => {
    setSearchHistory(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Search item has been removed from history.",
    });
  };

  const searchAgain = (query: string) => {
    // In a real app, this would navigate to search with the query
    toast({
      title: "Searching Again",
      description: `Searching for "${query}"...`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Search History
          </h1>
          <p className="text-muted-foreground text-lg">
            Keep track of your previous searches and easily revisit products
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5 text-primary" />
            <span className="text-lg font-medium">
              {searchHistory.length} search{searchHistory.length !== 1 ? 'es' : ''} in history
            </span>
          </div>
          {searchHistory.length > 0 && (
            <Button variant="outline" onClick={clearHistory}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {searchHistory.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <HistoryIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Search History</h3>
                <p className="text-muted-foreground mb-6">
                  Your search history will appear here once you start searching for products
                </p>
                <Button variant="hero" asChild>
                  <a href="/search">
                    <Search className="h-4 w-4 mr-2" />
                    Start Searching
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {searchHistory.map((item) => (
              <Card key={item.id} className="shadow-card hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Search className="h-4 w-4 text-primary" />
                        {item.query}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.timestamp}
                        </span>
                        <Badge variant="secondary">
                          {item.results} results found
                        </Badge>
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary rounded-lg p-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Top Result:</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.topResult.name}</p>
                        <p className="text-sm text-muted-foreground">from {item.topResult.store}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{item.topResult.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="accent" 
                      size="sm"
                      onClick={() => searchAgain(item.query)}
                    >
                      <Search className="h-3 w-3 mr-1" />
                      Search Again
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;