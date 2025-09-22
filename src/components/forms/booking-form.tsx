import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const bookingSchema = z.object({
  checkIn: z.date({ required_error: "La date d'arrivée est requise" }),
  checkOut: z.date({ required_error: "La date de départ est requise" }),
  guests: z.number().min(1, "Au moins 1 voyageur requis").max(10, "Maximum 10 voyageurs"),
  guestName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  guestEmail: z.string().email("Email invalide"),
  guestPhone: z.string().min(8, "Numéro de téléphone invalide"),
  specialRequests: z.string().optional(),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "La date de départ doit être après la date d'arrivée",
  path: ["checkOut"],
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  roomPrice: number;
  roomName: string;
  hotelName: string;
  onSubmit?: (data: BookingFormData) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  roomPrice,
  roomName,
  hotelName,
  onSubmit,
}) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: 2,
    },
  });

  const watchedValues = watch();
  const nights = watchedValues.checkIn && watchedValues.checkOut 
    ? Math.ceil((watchedValues.checkOut.getTime() - watchedValues.checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = nights * roomPrice;

  const onFormSubmit = async (data: BookingFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast({
        title: "Réservation confirmée !",
        description: `Votre réservation au ${hotelName} a été confirmée.`,
      });
      onSubmit?.(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la réservation.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <CreditCard className="h-5 w-5" />
          Réserver maintenant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Room Info */}
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">
              {roomPrice}€
            </div>
            <div className="text-sm text-muted-foreground">
              par nuit • {roomName}
            </div>
          </div>

          <Separator />

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="checkIn">Arrivée *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !watchedValues.checkIn && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watchedValues.checkIn ? (
                      format(watchedValues.checkIn, "dd/MM")
                    ) : (
                      <span>Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={watchedValues.checkIn}
                    onSelect={(date) => setValue("checkIn", date!)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.checkIn && (
                <p className="text-xs text-destructive">{errors.checkIn.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut">Départ *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !watchedValues.checkOut && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watchedValues.checkOut ? (
                      format(watchedValues.checkOut, "dd/MM")
                    ) : (
                      <span>Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={watchedValues.checkOut}
                    onSelect={(date) => setValue("checkOut", date!)}
                    disabled={(date) => date <= (watchedValues.checkIn || new Date())}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.checkOut && (
                <p className="text-xs text-destructive">{errors.checkOut.message}</p>
              )}
            </div>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">Voyageurs *</Label>
            <Select
              onValueChange={(value) => setValue("guests", parseInt(value))}
              defaultValue="2"
            >
              <SelectTrigger>
                <Users className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "voyageur" : "voyageurs"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.guests && (
              <p className="text-xs text-destructive">{errors.guests.message}</p>
            )}
          </div>

          <Separator />

          {/* Guest Information */}
          <div className="space-y-4">
            <h3 className="font-medium">Informations du voyageur</h3>
            
            <div className="space-y-2">
              <Label htmlFor="guestName">Nom complet *</Label>
              <Input
                {...register("guestName")}
                placeholder="Jean Dupont"
              />
              {errors.guestName && (
                <p className="text-xs text-destructive">{errors.guestName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestEmail">Email *</Label>
              <Input
                {...register("guestEmail")}
                type="email"
                placeholder="jean@exemple.com"
              />
              {errors.guestEmail && (
                <p className="text-xs text-destructive">{errors.guestEmail.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestPhone">Téléphone *</Label>
              <Input
                {...register("guestPhone")}
                type="tel"
                placeholder="+261 32 12 345 67"
              />
              {errors.guestPhone && (
                <p className="text-xs text-destructive">{errors.guestPhone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Demandes spéciales</Label>
              <Textarea
                {...register("specialRequests")}
                placeholder="Lit d'appoint, étage élevé, etc."
                rows={3}
              />
            </div>
          </div>

          {/* Price Summary */}
          {nights > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{roomPrice}€ x {nights} {nights === 1 ? "nuit" : "nuits"}</span>
                  <span>{totalPrice}€</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{totalPrice}€</span>
                </div>
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-ocean hover:shadow-glow transition-all"
            disabled={isSubmitting || !watchedValues.checkIn || !watchedValues.checkOut}
          >
            {isSubmitting ? "Réservation..." : `Confirmer la réservation`}
          </Button>

          <div className="text-xs text-center text-muted-foreground">
            Annulation gratuite jusqu'à 24h avant l'arrivée
          </div>
        </form>
      </CardContent>
    </Card>
  );
};