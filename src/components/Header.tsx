import { Link, useLocation } from 'react-router-dom';
import { Search, History, Info, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();

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

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;