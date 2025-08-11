import { Link, useLocation } from 'react-router-dom';
import { Search, History, Info, Sparkles, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Sparkles },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'History', href: '/history', icon: History },
    { name: 'About', href: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ShopSage
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Button
                key={item.name}
                variant={isActive ? "default" : "ghost"}
                asChild
                className="flex items-center gap-2"
              >
                <Link to={item.href}>
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </nav>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-primary text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/history" className="flex items-center">
                  <History className="mr-2 h-4 w-4" />
                  Search History
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="hero" size="sm" onClick={() => setShowAuthModal(true)}>
              Get Started
            </Button>
          </div>
        )}
      </div>
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
};

export default Header;