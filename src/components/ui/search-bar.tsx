import React, { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch?: (data: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    onSearch?.({
      destination,
      checkIn,
      checkOut,
      guests,
    });
  };

  return (
    <div className={cn(
      "bg-card rounded-2xl shadow-card p-6 border border-border/50 backdrop-blur-sm",
      className
    )}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Nosy Be, Madagascar"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Arrivée
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Départ
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Voyageurs
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="pl-10 h-12"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleSearch}
          size="lg"
          className="bg-gradient-ocean hover:shadow-glow transition-all duration-300 px-8 h-12"
        >
          <Search className="mr-2 h-4 w-4" />
          Rechercher
        </Button>
      </div>
    </div>
  );
};