import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Filter, SlidersHorizontal, Grid, List, MapPin } from "lucide-react";
import { SearchBar } from "@/components/ui/search-bar";
import { HotelCard } from "@/components/ui/hotel-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const mockHotels = [
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
  },
  {
    id: "4",
    name: "Manga Soa Lodge",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    location: "Ambatoloaka, Nosy Be", 
    rating: 4.2,
    reviews: 78,
    price: 85,
    amenities: ["wifi", "restaurant"],
    description: "Lodge authentique dans un cadre naturel préservé."
  },
  {
    id: "5",
    name: "Ocean Beach Resort",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    location: "Dzamandzar, Nosy Be",
    rating: 4.5,
    reviews: 134,
    price: 150,
    amenities: ["wifi", "restaurant", "gym", "parking"],
    description: "Resort en bord de plage avec toutes les commodités modernes."
  }
];

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state;

  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSearch = (searchData: any) => {
    // Update search results based on new search
  };

  const handleViewDetails = (hotelId: string) => {
    navigate(`/hotel/${hotelId}`);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const amenities = [
    { id: 'wifi', label: 'Wi-Fi gratuit' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'parking', label: 'Parking' },
    { id: 'gym', label: 'Salle de sport' },
    { id: 'pool', label: 'Piscine' },
    { id: 'spa', label: 'Spa' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-gradient-hero py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar 
            onSearch={handleSearch}
            className="bg-white/95 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Hôtels à {searchParams?.destination || "Nosy Be"}
            </h1>
            <p className="text-muted-foreground">
              {mockHotels.length} établissements trouvés
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtres
            </Button>

            <div className="flex border border-border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Filtres</h3>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Prix par nuit (€)</h4>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={300}
                      step={10}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Équipements</h4>
                    <div className="space-y-3">
                      {amenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity.id}
                            checked={selectedAmenities.includes(amenity.id)}
                            onCheckedChange={() => toggleAmenity(amenity.id)}
                          />
                          <label
                            htmlFor={amenity.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {amenity.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {mockHotels.map((hotel) => (
                  <Card key={hotel.id} className="overflow-hidden hover:shadow-elegant transition-shadow">
                    <div className="flex">
                      <div className="w-48 h-32 flex-shrink-0">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 pr-4">
                            <h3 className="font-semibold text-lg mb-1">{hotel.name}</h3>
                            <div className="flex items-center text-muted-foreground mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{hotel.location}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {hotel.description}
                            </p>
                            <div className="flex gap-2">
                              {hotel.amenities.map((amenity) => (
                                <Badge key={amenity} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {hotel.price}€
                            </div>
                            <div className="text-xs text-muted-foreground mb-3">
                              par nuit
                            </div>
                            <Button
                              onClick={() => handleViewDetails(hotel.id)}
                              className="w-full"
                            >
                              Voir détails
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}