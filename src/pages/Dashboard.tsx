import React, { useState } from "react";
import { 
  BarChart3, Hotel, Calendar, Users, Plus, 
  Settings, Star, TrendingUp, Eye, Edit 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockStats = {
  totalBookings: 147,
  monthlyRevenue: 18500,
  occupancyRate: 78,
  averageRating: 4.6
};

const mockHotels = [
  {
    id: "1",
    name: "Eden Lodge Nosy Be",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop",
    status: "active",
    rooms: 12,
    bookings: 34,
    revenue: 8400,
    rating: 4.8
  },
  {
    id: "2",
    name: "Vanila Hotel & Spa", 
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
    status: "active",
    rooms: 18,
    bookings: 28,
    revenue: 6200,
    rating: 4.4
  }
];

const mockBookings = [
  {
    id: "1",
    guestName: "Marie Dubois",
    hotelName: "Eden Lodge Nosy Be",
    checkIn: "2024-01-15",
    checkOut: "2024-01-20",
    status: "confirmed",
    total: 750
  },
  {
    id: "2",
    guestName: "Jean Martin",
    hotelName: "Vanila Hotel & Spa",
    checkIn: "2024-01-18",
    checkOut: "2024-01-22",
    status: "pending",
    total: 480
  },
  {
    id: "3",
    guestName: "Sophie Bernard",
    hotelName: "Eden Lodge Nosy Be",
    checkIn: "2024-01-20",
    checkOut: "2024-01-25",
    status: "confirmed",
    total: 900
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: "default",
      pending: "secondary", 
      cancelled: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status === "confirmed" ? "Confirmé" : 
         status === "pending" ? "En attente" : 
         "Annulé"}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Tableau de bord hôtelier
              </h1>
              <p className="text-white/80">
                Gérez vos établissements et réservations en un coup d'œil
              </p>
            </div>
            <Button variant="secondary" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un hôtel
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Réservations totales
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {mockStats.totalBookings}
                  </p>
                </div>
                <div className="h-12 w-12 bg-gradient-ocean rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Revenus mensuels
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {mockStats.monthlyRevenue.toLocaleString()}€
                  </p>
                </div>
                <div className="h-12 w-12 bg-gradient-sunset rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Taux d'occupation
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {mockStats.occupancyRate}%
                  </p>
                </div>
                <div className="h-12 w-12 bg-gradient-ocean rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Note moyenne
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {mockStats.averageRating}/5
                  </p>
                </div>
                <div className="h-12 w-12 bg-gradient-sunset rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="hotels">Mes hôtels</TabsTrigger>
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Réservations récentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium">{booking.guestName}</p>
                          <p className="text-sm text-muted-foreground">{booking.hotelName}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.checkIn} - {booking.checkOut}
                          </p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(booking.status)}
                          <p className="text-sm font-medium mt-1">{booking.total}€</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance mensuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        Graphique des performances
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hotels" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockHotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      variant="secondary" 
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm"
                    >
                      {hotel.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Chambres</p>
                        <p className="font-medium">{hotel.rooms}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Réservations</p>
                        <p className="font-medium">{hotel.bookings}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenus</p>
                        <p className="font-medium">{hotel.revenue.toLocaleString()}€</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Note</p>
                        <p className="font-medium flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-secondary text-secondary" />
                          {hotel.rating}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Toutes les réservations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{booking.guestName}</p>
                          {getStatusBadge(booking.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{booking.hotelName}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.checkIn} - {booking.checkOut}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{booking.total}€</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Gérer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom de l'établissement</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-border rounded-md"
                      placeholder="Eden Lodge Group"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email de contact</label>
                    <input 
                      type="email" 
                      className="w-full p-2 border border-border rounded-md"
                      placeholder="contact@edenlodge.mg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Téléphone</label>
                    <input 
                      type="tel" 
                      className="w-full p-2 border border-border rounded-md"
                      placeholder="+261 32 12 345 67"
                    />
                  </div>
                  <Button className="bg-gradient-ocean">
                    Sauvegarder les modifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}