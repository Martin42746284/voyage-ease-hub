import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Star, MapPin, Wifi, Car, Coffee, Dumbbell, 
  Camera, ArrowLeft, Calendar, Users, ChevronLeft, 
  ChevronRight, Phone, Mail, Clock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const mockHotel = {
  id: "1",
  name: "Eden Lodge Nosy Be",
  description: "Lodge de luxe face à la mer avec une vue imprenable sur l'océan Indien. Situé sur la plage d'Andilana, notre établissement vous offre un cadre idyllique pour vos vacances à Madagascar.",
  images: [
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop", 
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop"
  ],
  location: "Andilana Beach, Nosy Be",
  rating: 4.8,
  reviews: 156,
  contact: {
    phone: "+261 32 12 345 67",
    email: "contact@edenlodge.mg",
    checkIn: "14:00",
    checkOut: "11:00"
  },
  amenities: [
    { id: "wifi", label: "Wi-Fi gratuit", icon: Wifi },
    { id: "restaurant", label: "Restaurant", icon: Coffee },
    { id: "parking", label: "Parking gratuit", icon: Car },
    { id: "gym", label: "Salle de sport", icon: Dumbbell }
  ],
  rooms: [
    {
      id: "1",
      name: "Chambre Standard",
      description: "Chambre confortable avec vue jardin, lit double et salle de bain privée.",
      price: 95,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
      amenities: ["wifi", "climatisation", "minibar"]
    },
    {
      id: "2", 
      name: "Chambre Vue Mer",
      description: "Chambre spacieuse avec vue panoramique sur l'océan Indien et terrasse privée.",
      price: 150,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop",
      amenities: ["wifi", "climatisation", "minibar", "terrasse"]
    },
    {
      id: "3",
      name: "Suite Présidentielle",
      description: "Suite luxueuse avec salon séparé, jacuzzi privé et service de conciergerie.",
      price: 280,
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=400&h=300&fit=crop",
      amenities: ["wifi", "climatisation", "minibar", "jacuzzi", "service"]
    }
  ]
};

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(mockHotel.rooms[0]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === mockHotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? mockHotel.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux résultats
          </Button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {mockHotel.name}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{mockHotel.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-secondary text-secondary" />
                  <span className="font-medium">{mockHotel.rating}</span>
                  <span className="ml-1">({mockHotel.reviews} avis)</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">À partir de</div>
              <div className="text-3xl font-bold text-primary">
                {Math.min(...mockHotel.rooms.map(r => r.price))}€
              </div>
              <div className="text-sm text-muted-foreground">par nuit</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative h-96 overflow-hidden rounded-t-lg">
                  <img
                    src={mockHotel.images[currentImageIndex]}
                    alt={mockHotel.name}
                    className="w-full h-full object-cover"
                  />
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  <div className="absolute bottom-4 right-4">
                    <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
                      <Camera className="h-3 w-3 mr-1" />
                      {currentImageIndex + 1} / {mockHotel.images.length}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2 p-4 overflow-x-auto">
                  {mockHotel.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors",
                        index === currentImageIndex 
                          ? "border-primary" 
                          : "border-transparent"
                      )}
                    >
                      <img
                        src={image}
                        alt={`${mockHotel.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>À propos de cet établissement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {mockHotel.description}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Équipements et services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockHotel.amenities.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={amenity.id} className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{amenity.label}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Rooms */}
            <Card>
              <CardHeader>
                <CardTitle>Chambres disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHotel.rooms.map((room) => (
                    <Card 
                      key={room.id} 
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-elegant",
                        selectedRoom.id === room.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedRoom(room)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-32 h-24 flex-shrink-0">
                            <img
                              src={room.image}
                              alt={room.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold">{room.name}</h3>
                              <div className="text-right">
                                <div className="text-xl font-bold text-primary">
                                  {room.price}€
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  par nuit
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {room.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {room.amenities.map((amenity) => (
                                <Badge key={amenity} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-center">Réserver maintenant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {selectedRoom.price}€
                  </div>
                  <div className="text-sm text-muted-foreground">
                    par nuit • {selectedRoom.name}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Arrivée</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="date"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-md text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Départ</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="date"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-md text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Voyageurs</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <select className="w-full pl-10 pr-3 py-2 border border-border rounded-md text-sm">
                        <option>1 adulte</option>
                        <option>2 adultes</option>
                        <option>3 adultes</option>
                        <option>4 adultes</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-ocean hover:shadow-glow transition-all">
                  Réserver maintenant
                </Button>

                <div className="text-xs text-center text-muted-foreground">
                  Annulation gratuite jusqu'à 24h avant l'arrivée
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">{mockHotel.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">{mockHotel.contact.email}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Check-in:</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {mockHotel.contact.checkIn}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Check-out:</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {mockHotel.contact.checkOut}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}