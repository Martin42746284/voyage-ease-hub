import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, Navigation } from "lucide-react";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  // Mock hotels data for Madagascar
  const hotels = [
    {
      id: 1,
      name: "Eden Lodge Nosy Be",
      location: [48.2609, -13.3006], // Nosy Be coordinates
      rating: 4.8,
      price: 150,
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop"
    },
    {
      id: 2, 
      name: "Vanila Hotel & Spa",
      location: [48.2509, -13.2906], // Near Nosy Be
      rating: 4.4,
      price: 120,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Baobab Beach Resort",
      location: [47.5208, -18.8792], // Antananarivo area
      rating: 4.2,
      price: 95,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Andasibe Forest Lodge", 
      location: [48.4167, -18.9333], // Andasibe
      rating: 4.6,
      price: 180,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop"
    }
  ];

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken.trim()) return;

    mapboxgl.accessToken = mapboxToken.trim();
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [47.5208, -18.8792], // Madagascar center
        zoom: 6,
        pitch: 30,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add geolocate control
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        }),
        'top-right'
      );

      map.current.on('load', () => {
        setIsMapLoaded(true);
        
        // Add hotel markers
        hotels.forEach((hotel) => {
          // Create a custom marker element
          const markerElement = document.createElement('div');
          markerElement.className = 'hotel-marker';
          markerElement.innerHTML = `
            <div style="
              background: linear-gradient(135deg, hsl(217 91% 60%), hsl(217 91% 70%));
              width: 40px;
              height: 40px;
              border-radius: 50% 50% 50% 0;
              border: 3px solid white;
              box-shadow: 0 4px 15px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              transform: rotate(-45deg);
              cursor: pointer;
              transition: all 0.3s ease;
            ">
              <div style="
                color: white;
                font-size: 16px;
                transform: rotate(45deg);
                font-weight: bold;
              ">🏨</div>
            </div>
          `;
          
          // Add hover effect
          markerElement.addEventListener('mouseenter', () => {
            markerElement.style.transform = 'rotate(-45deg) scale(1.1)';
          });
          
          markerElement.addEventListener('mouseleave', () => {
            markerElement.style.transform = 'rotate(-45deg) scale(1)';
          });

          // Create popup content
          const popup = new mapboxgl.Popup({
            offset: 25,
            className: 'hotel-popup'
          }).setHTML(`
            <div style="
              padding: 12px;
              min-width: 200px;
            ">
              <img 
                src="${hotel.image}" 
                alt="${hotel.name}"
                style="
                  width: 100%;
                  height: 100px;
                  object-fit: cover;
                  border-radius: 8px;
                  margin-bottom: 8px;
                "
              />
              <h3 style="
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 4px;
                color: hsl(217 91% 60%);
              ">${hotel.name}</h3>
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
              ">
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 4px;
                ">
                  <span style="color: #f59e0b;">⭐</span>
                  <span style="font-weight: 600;">${hotel.rating}</span>
                </div>
                <div style="
                  font-weight: bold;
                  color: hsl(217 91% 60%);
                ">${hotel.price}€/nuit</div>
              </div>
              <button 
                onclick="window.open('/hotel/${hotel.id}', '_self')"
                style="
                  background: linear-gradient(135deg, hsl(217 91% 60%), hsl(217 91% 70%));
                  color: white;
                  border: none;
                  padding: 8px 16px;
                  border-radius: 6px;
                  font-weight: 600;
                  cursor: pointer;
                  width: 100%;
                  transition: all 0.3s ease;
                "
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'"
              >
                Voir les détails
              </button>
            </div>
          `);

          // Add marker to map
          new mapboxgl.Marker(markerElement)
            .setLngLat(hotel.location as [number, number])
            .setPopup(popup)
            .addTo(map.current!);
        });
      });

    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error);
      alert('Token Mapbox invalide. Veuillez vérifier votre token.');
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap();
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isMapLoaded && !mapboxToken) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 bg-gradient-ocean rounded-full flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Carte Interactive Madagascar</CardTitle>
            <p className="text-muted-foreground text-sm">
              Entrez votre token Mapbox public pour afficher la carte
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Votre token Mapbox public..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Obtenez votre token sur{' '}
                  <a 
                    href="https://mapbox.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-ocean"
                disabled={!mapboxToken.trim()}
              >
                <Navigation className="h-4 w-4 mr-2" />
                Charger la carte
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              Carte des Hôtels à Madagascar
            </h1>
            <p className="text-white/80">
              Découvrez les meilleurs hôtels par région
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div ref={mapContainer} className="h-screen w-full" />
        
        {/* Legend */}
        <Card className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Légende
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-ocean rounded-full"></div>
                <span>Hôtels disponibles</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-secondary" />
                <span>Note et prix</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Statistiques</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Hôtels:</span>
                <span className="font-medium">{hotels.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Régions:</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between">
                <span>Note moyenne:</span>
                <span className="font-medium">4.5/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Map;