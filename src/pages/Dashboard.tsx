import React, { useMemo, useState } from "react";
import {
  BarChart3,
  Calendar,
  Users,
  Plus,
  Star,
  TrendingUp,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddHotelModal } from "@/components/modals/add-hotel-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AddHotelForm, HotelFormData } from "@/components/forms/add-hotel-form";
import { useToast } from "@/hooks/use-toast";

const mockStats = {
  totalBookings: 147,
  monthlyRevenue: 18500,
  occupancyRate: 78,
  averageRating: 4.6,
};

const mockHotels = [
  {
    id: "1",
    name: "Eden Lodge Nosy Be",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop",
    status: "active",
    rooms: 12,
    bookings: 34,
    revenue: 8400,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Vanila Hotel & Spa",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
    status: "active",
    rooms: 18,
    bookings: 28,
    revenue: 6200,
    rating: 4.4,
  },
];

const mockBookings = [
  {
    id: "1",
    guestName: "Marie Dubois",
    hotelName: "Eden Lodge Nosy Be",
    checkIn: "2024-01-15",
    checkOut: "2024-01-20",
    status: "confirmed",
    total: 750,
  },
  {
    id: "2",
    guestName: "Jean Martin",
    hotelName: "Vanila Hotel & Spa",
    checkIn: "2024-01-18",
    checkOut: "2024-01-22",
    status: "pending",
    total: 480,
  },
  {
    id: "3",
    guestName: "Sophie Bernard",
    hotelName: "Eden Lodge Nosy Be",
    checkIn: "2024-01-20",
    checkOut: "2024-01-25",
    status: "confirmed",
    total: 900,
  },
];

type Booking = (typeof mockBookings)[number];

type PendingReview = {
  id: string;
  hotelName: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [editHotelOpen, setEditHotelOpen] = useState(false);
  const [hotelToEdit, setHotelToEdit] = useState<{ id: string; name: string } | null>(
    null
  );

  const [manageBookingOpen, setManageBookingOpen] = useState(false);
  const [bookingToManage, setBookingToManage] = useState<Booking | null>(null);

  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([
    {
      id: "r1",
      hotelName: "Eden Lodge Nosy Be",
      userName: "Paul R.",
      rating: 5,
      title: "Superbe séjour",
      comment:
        "Excellent accueil, chambre propre et spacieuse. Le personnel est très attentionné.",
      date: "2024-01-18",
    },
    {
      id: "r2",
      hotelName: "Vanila Hotel & Spa",
      userName: "Alice M.",
      rating: 3,
      title: "Bien mais bruyant",
      comment:
        "Bon emplacement mais nuisances sonores la nuit. Petit-déjeuner correct.",
      date: "2024-01-17",
    },
  ]);

  const [approvedReviews, setApprovedReviews] = useState<PendingReview[]>([]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: "default",
      pending: "secondary",
      cancelled: "destructive",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status === "confirmed"
          ? "Confirmé"
          : status === "pending"
          ? "En attente"
          : "Annulé"}
      </Badge>
    );
  };

  const bookingCounts = useMemo(
    () => ({
      total: bookings.length,
      pending: bookings.filter((b) => b.status === "pending").length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
    }),
    [bookings]
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Tableau de bord hôtelier</h1>
              <p className="text-white/80">
                Gérez vos établissements et réservations en un coup d'œil
              </p>
            </div>
            <AddHotelModal>
              <Button variant="secondary" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un hôtel
              </Button>
            </AddHotelModal>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  <p className="text-sm text-muted-foreground mb-2">Revenus mensuels</p>
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
                  <p className="text-sm text-muted-foreground mb-2">Note moyenne</p>
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="hotels">Mes hôtels</TabsTrigger>
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Réservations récentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
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

              <Card>
                <CardHeader>
                  <CardTitle>Performance mensuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Graphique des performances</p>
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
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm">
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
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/hotel/${hotel.id}`)}>
                        <Eye className="h-4 w-4 mr-2" /> Voir
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setHotelToEdit({ id: hotel.id, name: hotel.name });
                          setEditHotelOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" /> Modifier
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
                <CardTitle>
                  Toutes les réservations ({bookingCounts.total}) · En attente {bookingCounts.pending} · Confirmées {bookingCounts.confirmed}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            setBookingToManage(booking);
                            setManageBookingOpen(true);
                          }}
                        >
                          Gérer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Avis en attente de validation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingReviews.length === 0 && (
                    <p className="text-sm text-muted-foreground">Aucun avis en attente.</p>
                  )}
                  {pendingReviews.map((r) => (
                    <div key={r.id} className="p-4 border rounded-lg flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{r.hotelName}</p>
                        <p className="font-medium">{r.userName} · {r.rating}/5</p>
                        <p className="font-semibold mt-1">{r.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(r.date).toLocaleDateString("fr-FR")}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setApprovedReviews((prev) => [...prev, r]);
                            setPendingReviews((prev) => prev.filter((x) => x.id !== r.id));
                            toast({ title: "Avis approuvé", description: "L'avis est désormais visible." });
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" /> Approuver
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            setPendingReviews((prev) => prev.filter((x) => x.id !== r.id));
                            toast({ title: "Avis rejeté", description: "L'avis a été retiré." });
                          }}
                        >
                          <XCircle className="h-4 w-4 mr-2" /> Rejeter
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Derniers avis approuvés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {approvedReviews.length === 0 && (
                    <p className="text-sm text-muted-foreground">Aucun avis approuvé pour le moment.</p>
                  )}
                  {approvedReviews.map((r) => (
                    <div key={r.id} className="p-3 border rounded">
                      <p className="text-sm text-muted-foreground">{r.hotelName}</p>
                      <p className="font-medium">{r.userName} · {r.rating}/5</p>
                      <p className="font-semibold">{r.title}</p>
                      <p className="text-sm text-muted-foreground">{r.comment}</p>
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
                    <label className="block text-sm font-medium mb-2">
                      Nom de l'établissement
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-border rounded-md"
                      placeholder="Eden Lodge Group"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email de contact
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border border-border rounded-md"
                      placeholder="contact@edenlodge.mg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-border rounded-md"
                      placeholder="+261 32 12 345 67"
                    />
                  </div>
                  <Button className="bg-gradient-ocean">Sauvegarder les modifications</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Hotel Modal */}
      <Dialog open={editHotelOpen} onOpenChange={setEditHotelOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0">
          <AddHotelForm
            mode="edit"
            initialValues={{ name: hotelToEdit?.name ?? "" }}
            onCancel={() => setEditHotelOpen(false)}
            onSubmit={(data: HotelFormData & { images: string[] }) => {
              toast({ title: "Hôtel mis à jour", description: `${data.name} enregistré.` });
              setEditHotelOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Manage Booking Modal */}
      <Dialog open={manageBookingOpen} onOpenChange={setManageBookingOpen}>
        <DialogContent className="max-w-xl p-6">
          {bookingToManage && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Gérer la réservation</h3>
              <div className="text-sm text-muted-foreground">
                <p>Client: <span className="font-medium text-foreground">{bookingToManage.guestName}</span></p>
                <p>Hôtel: <span className="font-medium text-foreground">{bookingToManage.hotelName}</span></p>
                <p>Période: {bookingToManage.checkIn} - {bookingToManage.checkOut}</p>
                <p>Total: {bookingToManage.total}€</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setBookings((prev) => prev.map((b) => (b.id === bookingToManage.id ? { ...b, status: "confirmed" } : b)));
                    toast({ title: "Réservation confirmée" });
                    setManageBookingOpen(false);
                  }}
                >
                  Confirmer
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setBookings((prev) => prev.map((b) => (b.id === bookingToManage.id ? { ...b, status: "cancelled" } : b)));
                    toast({ title: "Réservation annulée" });
                    setManageBookingOpen(false);
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
