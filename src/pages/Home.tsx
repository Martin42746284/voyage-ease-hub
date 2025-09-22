import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/ui/search-bar";
import { HotelCard } from "@/components/ui/hotel-card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-nosybe.jpg";

const featuredHotels = [
  {
    id: "1",
    name: "Eden Lodge Nosy Be",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
    location: "Andilana Beach, Nosy Be",
    rating: 4.8,
    reviews: 156,
    price: 180,
    amenities: ["wifi", "restaurant", "parking"],
    description: "Lodge de luxe face à la mer avec une vue imprenable sur l'océan Indien."
  },
  {
    id: "2", 
    name: "Ylang Ylang Beach Resort",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
    location: "Madirokely, Nosy Be",
    rating: 4.6,
    reviews: 89,
    price: 120,
    amenities: ["wifi", "restaurant", "gym"],
    description: "Resort familial au cœur de la nature tropicale de Madagascar."
  },
  {
    id: "3",
    name: "Vanila Hotel & Spa",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    location: "Hell-Ville, Nosy Be",
    rating: 4.4,
    reviews: 203,
    price: 95,
    amenities: ["wifi", "restaurant", "parking"],
    description: "Hôtel moderne avec spa traditionnel malgache au centre-ville."
  }
];

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (searchData: any) => {
    navigate("/search", { state: searchData });
  };

  const handleViewDetails = (hotelId: string) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Découvrez Madagascar
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Trouvez l'hôtel parfait pour votre séjour à Nosy Be et dans toute l'île rouge
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="bg-white/10 text-white backdrop-blur-sm px-4 py-2">
                <MapPin className="h-4 w-4 mr-2" />
                +50 hôtels
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white backdrop-blur-sm px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Noté 4.5/5
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white backdrop-blur-sm px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                +1000 réservations
              </Badge>
            </div>
          </div>

          <SearchBar 
            onSearch={handleSearch}
            className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm"
          />
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Hôtels Recommandés
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez une sélection des meilleurs établissements de Nosy Be
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-accent to-accent/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pourquoi Choisir HotelMada ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Votre partenaire de confiance pour explorer Madagascar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-2xl shadow-card">
              <div className="h-16 w-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualité Garantie</h3>
              <p className="text-muted-foreground">
                Tous nos hôtels sont soigneusement sélectionnés et vérifiés pour vous offrir le meilleur séjour.
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-2xl shadow-card">
              <div className="h-16 w-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expertise Locale</h3>
              <p className="text-muted-foreground">
                Notre équipe locale vous guide vers les meilleurs endroits authentiques de Madagascar.
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-2xl shadow-card">
              <div className="h-16 w-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Réservation Simple</h3>
              <p className="text-muted-foreground">
                Réservez en quelques clics avec notre système sécurisé et notre service client réactif.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}