import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Upload, X, MapPin, Phone, Mail, Wifi, Car, Coffee, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const hotelSchema = z.object({
  name: z.string().min(2, "Le nom de l'hôtel doit contenir au moins 2 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  address: z.string().min(5, "L'adresse doit être complète"),
  city: z.string().min(2, "La ville est requise"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  email: z.string().email("Email invalide"),
  website: z.string().url("URL invalide").optional().or(z.literal("")),
  checkInTime: z.string().min(1, "Heure d'arrivée requise"),
  checkOutTime: z.string().min(1, "Heure de départ requise"),
  amenities: z.array(z.string()).min(1, "Sélectionnez au moins un équipement"),
});

type HotelFormData = z.infer<typeof hotelSchema>;

interface AddHotelFormProps {
  onSubmit?: (data: HotelFormData & { images: string[] }) => void;
  onCancel?: () => void;
}

const availableAmenities = [
  { id: "wifi", label: "Wi-Fi gratuit", icon: Wifi },
  { id: "parking", label: "Parking", icon: Car },
  { id: "restaurant", label: "Restaurant", icon: Coffee },
  { id: "gym", label: "Salle de sport", icon: Dumbbell },
  { id: "pool", label: "Piscine", icon: "🏊" },
  { id: "spa", label: "Spa", icon: "💆" },
  { id: "reception24", label: "Réception 24h", icon: "🕐" },
  { id: "aircon", label: "Climatisation", icon: "❄️" },
];

export const AddHotelForm: React.FC<AddHotelFormProps> = ({ onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      checkInTime: "14:00",
      checkOutTime: "11:00",
      amenities: [],
    },
  });

  const toggleAmenity = (amenityId: string) => {
    const newAmenities = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter(id => id !== amenityId)
      : [...selectedAmenities, amenityId];
    
    setSelectedAmenities(newAmenities);
    setValue("amenities", newAmenities);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setUploadedImages(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const onFormSubmit = async (data: HotelFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Hôtel ajouté avec succès !",
        description: "Votre établissement a été ajouté et sera vérifié sous 24h.",
      });
      onSubmit?.({ ...data, images: uploadedImages });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout de l'hôtel.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Ajouter un nouvel hôtel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations générales</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'hôtel *</Label>
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="Eden Lodge Nosy Be"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ville *</Label>
                <Input
                  {...register("city")}
                  id="city"
                  placeholder="Nosy Be"
                />
                {errors.city && (
                  <p className="text-xs text-destructive">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                {...register("description")}
                id="description"
                placeholder="Décrivez votre établissement, ses points forts et son environnement..."
                rows={4}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adresse complète *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("address")}
                  id="address"
                  placeholder="Plage d'Andilana, Nosy Be 207, Madagascar"
                  className="pl-10"
                />
              </div>
              {errors.address && (
                <p className="text-xs text-destructive">{errors.address.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...register("phone")}
                    id="phone"
                    placeholder="+261 32 12 345 67"
                    className="pl-10"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="contact@edenlodge.mg"
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Site web (optionnel)</Label>
              <Input
                {...register("website")}
                id="website"
                placeholder="https://www.edenlodge.mg"
              />
              {errors.website && (
                <p className="text-xs text-destructive">{errors.website.message}</p>
              )}
            </div>
          </div>

          {/* Check-in/out times */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Horaires</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkInTime">Heure d'arrivée *</Label>
                <Input
                  {...register("checkInTime")}
                  id="checkInTime"
                  type="time"
                />
                {errors.checkInTime && (
                  <p className="text-xs text-destructive">{errors.checkInTime.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkOutTime">Heure de départ *</Label>
                <Input
                  {...register("checkOutTime")}
                  id="checkOutTime"
                  type="time"
                />
                {errors.checkOutTime && (
                  <p className="text-xs text-destructive">{errors.checkOutTime.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Équipements et services *</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableAmenities.map((amenity) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={amenity.id}
                    className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-muted/20 transition-colors"
                    onClick={() => toggleAmenity(amenity.id)}
                  >
                    <Checkbox
                      id={amenity.id}
                      checked={selectedAmenities.includes(amenity.id)}
                      onChange={() => toggleAmenity(amenity.id)}
                    />
                    <Label htmlFor={amenity.id} className="flex items-center gap-2 cursor-pointer text-sm">
                      {typeof Icon === "string" ? (
                        <span className="text-lg">{Icon}</span>
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                      {amenity.label}
                    </Label>
                  </div>
                );
              })}
            </div>
            {errors.amenities && (
              <p className="text-xs text-destructive">{errors.amenities.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Photos de l'hôtel</h3>
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Glissez vos images ici ou cliquez pour sélectionner
              </p>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Label htmlFor="image-upload">
                <Button variant="outline" type="button" asChild>
                  <span>Sélectionner des images</span>
                </Button>
              </Label>
            </div>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-gradient-ocean hover:shadow-glow transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ajout en cours..." : "Ajouter l'hôtel"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};