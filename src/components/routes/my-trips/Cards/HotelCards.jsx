import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogInContext } from "@/Context/LogInContext/Login";
import { getPlaceDetails, PHOTO_URL } from "@/Service/GlobalApi";
import { MapPin } from "lucide-react";

function HotelCards({ hotel }) {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });

  const [placeDets, setPlaceDets] = useState([]);
  const [photos, setPhotos] = useState("");
  const [Url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const { trip } = useContext(LogInContext);
  const city = trip?.tripData?.location;

  const getPlaceInfo = async () => {
    const data = {
      textQuery: hotel.name + city,
    };
    try {
      const res = await getPlaceDetails(data);
      const place = res.data.places[0];
      setPlaceDets(place);
      setPhotos(place.photos[0]?.name);
      setAddress(place.formattedAddress);
      setLocation(place.googleMapsUri);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (trip) getPlaceInfo();
  }, [trip]);

  useEffect(() => {
    if (photos) {
      const url = PHOTO_URL.replace("{replace}", photos);
      setUrl(url);
    }
  }, [photos]);

  const mapLink =
    location || `https://www.google.com/maps/search/${hotel.name},${city}`;

  return (
    <Card className="w-full max-w-md mx-auto border border-gray-200 rounded-lg shadow hover:shadow-md transition-all duration-300 overflow-hidden">
      <img
        src={Url || "/logo.png"}
        className="h-60 w-full object-cover"
        alt="Hotel"
      />
      <CardHeader className="text-center p-4">
        <CardTitle className="text-2xl font-bold text-primary/90">
          {hotel.name}
        </CardTitle>
        <CardDescription className="text-sm text-primary/80 line-clamp-2 mt-2">
          {hotel.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-2 text-primary/90">
        <p className="text-sm font-medium">⭐ Rating: {hotel.rating}</p>
        <p className="text-sm font-medium">💵 Price: {hotel.price}</p>
        <p className="text-sm font-medium line-clamp-1">
          📍 Location: {address || hotel.address}
        </p>
        <Link
          to={mapLink}
          target="_blank"
          className="block w-full mt-4"
        >
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-sm"
          >
            <MapPin size={16} /> View on Map
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default HotelCards;
