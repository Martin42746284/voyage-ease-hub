import React from "react";
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Card, CardContent, CardFooter } from "./card";
import { cn } from "@/lib/utils";

interface HotelCardProps {
  hotel: {
    id: string;
    name: string;
    image: string;
    location: string;
    rating: number;
    reviews: number;
    price: number;
    amenities: string[];
    description: string;
  };
  onViewDetails?: (hotelId: string) => void;
  className?: string;
}

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-4 w-4" />,
  parking: <Car className="h-4 w-4" />,
  restaurant: <Coffee className="h-4 w-4" />,
  gym: <Dumbbell className="h-4 w-4" />,
};

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  onViewDetails,
  className,
}) => {
  return (
    <Card className={cn(
      "overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1",
      className
    )}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
            {hotel.price}€ / nuit
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span className="font-medium text-sm">{hotel.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({hotel.reviews})
            </span>
          </div>
        </div>

        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{hotel.location}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {hotel.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-1 text-xs text-muted-foreground"
            >
              {amenityIcons[amenity] || <span className="h-4 w-4" />}
              <span className="capitalize">{amenity}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => onViewDetails?.(hotel.id)}
        >
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  );
};