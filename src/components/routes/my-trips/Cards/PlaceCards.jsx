import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogInContext } from "@/Context/LogInContext/Login";
import { getPlaceDetails, PHOTO_URL } from "@/Service/GlobalApi";
import { MapPin } from "lucide-react";

function PlaceCards({ place }) {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });

  const { trip } = useContext(LogInContext);
  const city = trip?.tripData?.location;

  const [placeDets, setPlaceDets] = useState([]);
  const [photos, setPhotos] = useState("");
  const [Url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const getPlaceInfo = async () => {
    const data = {
      textQuery: place.name + city,
    };
    await getPlaceDetails(data)
      .then((res) => {
        setPlaceDets(res.data.places[0]);
        setPhotos(res.data.places[0].photos[0].name);
        setAddress(res.data.places[0].formattedAddress);
        setLocation(res.data.places[0].googleMapsUri);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    trip && getPlaceInfo();
  }, [trip]);

  useEffect(() => {
    const url = PHOTO_URL.replace("{replace}", photos);
    setUrl(url);
  }, [photos]);

  return (
    <Card className="border-foreground/20 p-1 h-full flex flex-col gap-3 hover:scale-105 duration-300 w-full">
      <div className="img h-full rounded-lg">
        <img
          src={Url || "/logo.png"}
          className="h-80 w-full object-cover"
          alt={place.name}
        />
      </div>
      <div className="text-content w-full flex items-center gap-3 justify-between flex-col h-full">
        <CardHeader className="w-full">
          <CardTitle className="opacity-90 w-full text-center text-xl font-black text-primary/80 md:text-3xl">
            {place.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 tracking-wide opacity-90 w-full text-center text-sm text-primary/80 md:text-md">
            {place.details}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="places-details space-y-1">
            <p className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide">
              🕒 Timings: {place.timings}
            </p>
            <p className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide">
              💵 Price: {place.pricing}
            </p>
            <p className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide line-clamp-1">
              📍 Location: {address ? address : place.address}
            </p>
          </div>
        </CardContent>
        <div className="mb-2">
          <Link
            to={
              location
                ? location
                : `https://www.google.com/maps/search/${place.name},${city}`
            }
            target="_blank"
          >
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> View on Map
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default PlaceCards;