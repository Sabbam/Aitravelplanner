import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const configPlace = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    "X-Goog-FieldMask": [
      "places.id",
      "places.name",
      "places.displayName",
      "places.formattedAddress",
      "places.photos",
      "places.googleMapsUri",
      "places.location",
      "places.priceLevel",
      "places.rating",
    ],
  },
};

const configCity = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    "X-Goog-FieldMask": [
      "places.name",
      "places.displayName",
      "places.photos",
      "places.googleMapsUri",
      "places.location",
    ],
  },
};

export const PHOTO_URL =
  "https://places.googleapis.com/v1/{replace}/media?maxHeightPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export const getPlaceDetails = (data) =>
  axios.post(BASE_URL, data, configPlace);

export const getCityDetails = (data) =>
  axios.post(BASE_URL, data, configCity);

// -----------------------------
// Emergency Helpline Numbers
// -----------------------------
const emergencyContacts = {
  "India": {
    police: "100",
    ambulance: "102",
    fire: "101",
    womenHelpline: "1091",
  },
  "United States": {
    police: "911",
    ambulance: "911",
    fire: "911",
  },
  "United Kingdom": {
    police: "999",
    ambulance: "999",
    fire: "999",
  },
  "Canada": {
    police: "911",
    ambulance: "911",
    fire: "911",
  },
  "Australia": {
    police: "000",
    ambulance: "000",
    fire: "000",
  },
  "Germany": {
    police: "110",
    ambulance: "112",
    fire: "112",
  },
  "France": {
    police: "17",
    ambulance: "15",
    fire: "18",
  },
  // Extend this list as needed
};

// -----------------------------
// Extract Emergency Numbers
// -----------------------------
export const getEmergencyNumbers = (placeDetails) => {
  const location =
    placeDetails?.places?.[0]?.formattedAddress ||
    placeDetails?.places?.[0]?.displayName?.text ||
    "";

  let matchedCountry = Object.keys(emergencyContacts).find((country) =>
    location.includes(country)
  );

  return emergencyContacts[matchedCountry] || {
    message: "Emergency contact data not available for this location",
  };
};
