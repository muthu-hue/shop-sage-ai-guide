import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface SearchResult {
  name: string;
  price: string;
  store: string;
  url: string;
  verified: boolean;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: string;
  results: SearchResult[];
  userId: string;
}

interface SearchHistoryContextType {
  searchHistory: SearchHistoryItem[];
  addSearchToHistory: (query: string, results: SearchResult[]) => void;
  clearHistory: () => void;
  removeHistoryItem: (id: string) => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (context === undefined) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
};

export const SearchHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load user's search history
      const allHistory = JSON.parse(localStorage.getItem('shopsage_search_history') || '[]');
      const userHistory = allHistory.filter((item: SearchHistoryItem) => item.userId === user.id);
      setSearchHistory(userHistory);
    } else {
      setSearchHistory([]);
    }
  }, [user]);

  const addSearchToHistory = (query: string, results: SearchResult[]) => {
    if (!user) return;

    const newHistoryItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query,
      timestamp: new Date().toLocaleString(),
      results,
      userId: user.id
    };

    const allHistory = JSON.parse(localStorage.getItem('shopsage_search_history') || '[]');
    const updatedHistory = [newHistoryItem, ...allHistory];
    
    localStorage.setItem('shopsage_search_history', JSON.stringify(updatedHistory));
    setSearchHistory(prev => [newHistoryItem, ...prev]);
  };

  const clearHistory = () => {
    if (!user) return;

    const allHistory = JSON.parse(localStorage.getItem('shopsage_search_history') || '[]');
    const otherUsersHistory = allHistory.filter((item: SearchHistoryItem) => item.userId !== user.id);
    
    localStorage.setItem('shopsage_search_history', JSON.stringify(otherUsersHistory));
    setSearchHistory([]);
  };

  const removeHistoryItem = (id: string) => {
    if (!user) return;

    const allHistory = JSON.parse(localStorage.getItem('shopsage_search_history') || '[]');
    const updatedHistory = allHistory.filter((item: SearchHistoryItem) => item.id !== id);
    
    localStorage.setItem('shopsage_search_history', JSON.stringify(updatedHistory));
    setSearchHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <SearchHistoryContext.Provider value={{
      searchHistory,
      addSearchToHistory,
      clearHistory,
      removeHistoryItem
    }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};