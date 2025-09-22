import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent/20">
      <div className="max-w-md mx-auto text-center px-4">
        <Card className="shadow-elegant">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="text-6xl font-bold text-primary mb-4">404</div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Page introuvable
              </h1>
              <p className="text-muted-foreground">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              </p>
            </div>

            <div className="space-y-3">
              <Link to="/" className="block">
                <Button className="w-full bg-gradient-ocean hover:shadow-glow transition-all">
                  <Home className="mr-2 h-4 w-4" />
                  Retour à l'accueil
                </Button>
              </Link>
              
              <Link to="/search" className="block">
                <Button variant="outline" className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Rechercher des hôtels
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Page précédente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
