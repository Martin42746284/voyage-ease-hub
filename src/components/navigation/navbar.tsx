import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Hotel, User, Search, BarChart3, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/modals/auth-modal";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-ocean rounded-lg flex items-center justify-center">
              <Hotel className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">HotelMada</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Accueil
            </Link>
            <Link
              to="/search"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/search") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Recherche
            </Link>
            <Link
              to="/hotels"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/hotels") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Hôtels
            </Link>
            <Link
              to="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/contact") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <AuthModal>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="h-4 w-4 mr-2" />
                Connexion
              </Button>
            </AuthModal>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Hôtelier
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};