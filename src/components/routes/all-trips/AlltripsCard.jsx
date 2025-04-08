import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const AlltripsCard = ({ trip }) => {
  if (!trip) return null;

  const handleDownloadTrip = () => {
    const doc = new jsPDF("p", "mm", "a4");
    let y = 20;

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Ai Travel Planner Trip Summary", 20, y);
    y += 10;

    // Basic Info
    doc.setFontSize(12);
    autoTable(doc, {
      startY: y,
      head: [["Field", "Value"]],
      body: [
        ["Location", trip.userSelection?.location || "-"],
        ["Duration (Days)", trip.userSelection?.noOfDays || "-"],
        ["Budget", trip.userSelection?.Budget || "-"],
        ["People", trip.tripData?.people || "-"],
      ],
      margin: { left: 20, right: 20 },
      headStyles: { fillColor: [52, 152, 219] },
    });
    y = doc.lastAutoTable.finalY + 10;

    // Hotels Table
    if (trip.tripData?.hotels?.length) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Hotels List", 20, y);
      y += 5;

      const hotels = trip.tripData.hotels.map((hotel, index) => [
        index + 1,
        hotel.name || "-",
        hotel.address || "-",
        hotel.price ? `Rs. ${hotel.price}` : "-",
      ]);

      autoTable(doc, {
        startY: y,
        head: [["#", "Hotel Name", "Address", "Price"]],
        body: hotels,
        margin: { left: 20, right: 20 },
        theme: "striped",
        headStyles: { fillColor: [241, 196, 15] },
      });

      y = doc.lastAutoTable.finalY + 10;
    }

    // Itinerary Table
    if (trip.tripData?.itinerary?.length) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Day-wise Itinerary", 20, y);
      y += 5;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      const noteLines = [
        "Note: Some days may include placeholders like 'Relaxation Day' or 'Departure'",
        "for flexibility or due to limited itinerary details.",
      ];
      noteLines.forEach((line) => {
        doc.text(line, 20, y);
        y += 5;
      });
      y += 2;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      const itinerary = trip.tripData.itinerary.map((dayItem, index) => {
        const placesList = Array.isArray(dayItem.places)
          ? dayItem.places.map((place) =>
              typeof place === "object" && place.name ? place.name : String(place)
            ).join(", ")
          : "-";
        return [`Day ${index + 1}`, dayItem.day || `Day ${index + 1}`, placesList];
      });

      autoTable(doc, {
        startY: y,
        head: [["#", "Day", "Places to Visit"]],
        body: itinerary,
        margin: { left: 20, right: 20 },
        theme: "striped",
        headStyles: { fillColor: [46, 204, 113] },
      });

      y = doc.lastAutoTable.finalY + 10;
    }

    // Emergency Contacts Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Emergency Contacts and Helpline Numbers (India)", 20, y);
    y += 10;

    const emergencySections = [
      {
        title: "National Emergency Numbers",
        color: [231, 76, 60],
        body: [
          ["Police", "100"],
          ["Fire Services", "101"],
          ["Ambulance", "108"],
          ["Disaster Management", "1078"],
          ["Emergency Response (All-in-One)", "112"],
        ],
      },
      {
        title: "Special Helplines",
        color: [155, 89, 182],
        body: [
          ["Women Helpline", "181"],
          ["Child Helpline", "1098"],
          ["Senior Citizens", "14567"],
          ["Poison Control", "1800-11-6119"],
          ["Railway Police (GRP)", "182"],
          ["Cyber Crime", "1930"],
          ["Missing Child/Kidnapping", "1094"],
        ],
      },
      {
        title: "Medical & Health",
        color: [26, 188, 156],
        body: [
          ["COVID-19 Control (AP)", "0891-2501233"],
          ["Mental Health", "080-46110007"],
          ["AIDS Helpline", "1097"],
          ["Blood Donation (Red Cross)", "011-23711551"],
        ],
      },
      {
        title: "Govt. & Public Support",
        color: [52, 73, 94],
        body: [
          ["AP Citizen's Call Center", "1902"],
          ["Consumer Helpline", "1800-11-4000"],
          ["Road Accident Emergency", "1073"],
          ["National Highway Helpline", "1033"],
        ],
      },
    ];

    emergencySections.forEach((section) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(section.title, 20, y);
      y += 5;

      autoTable(doc, {
        startY: y,
        head: [["Service", "Contact Number"]],
        body: section.body,
        margin: { left: 20, right: 20 },
        theme: "striped",
        pageBreak: "avoid",
        headStyles: { fillColor: section.color },
      });

      y = doc.lastAutoTable.finalY + 10;
    });

   // Travel Agencies Info Table
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.text("Major Travel Booking Agencies (India)", 20, y);
y += 10;

const travelAgencies = [
  ["MakeMyTrip", "0124-4628747", "https://www.makemytrip.com"],
  ["Yatra", "1860-200-1800", "https://www.yatra.com"],
  ["EaseMyTrip", "011-43131313", "https://www.easemytrip.com"],
  ["Thomas Cook", "1800-2099-100", "https://www.thomascook.in"],
  ["SOTC Travel", "1800-209-3344", "https://www.sotc.in"],
  ["IRCTC (Railways)", "0755-6610661", "https://www.irctc.co.in"],
  ["RedBus (Bus Booking)", "1860-300-10101", "https://www.redbus.in"],
  ["Goibibo", "1800-208-1060", "https://www.goibibo.com"],
  ["ClearTrip", "09595-333333", "https://www.cleartrip.com"],
  ["Ola Cabs", "080-67350900", "https://www.olacabs.com"],
  ["Uber", "NA", "https://www.uber.com/in/en/"],
  ["IndiGo Airlines", "0124-6173838", "https://www.goindigo.in"],
  ["Air India", "1860-233-1407", "https://www.airindia.in"],
  ["SpiceJet", "0124-4983410", "https://www.spicejet.com"]
];

autoTable(doc, {
  startY: y,
  head: [["Agency Name", "Contact", "Website"]],
  body: travelAgencies,
  margin: { left: 20, right: 20 },
  theme: "striped",
  headStyles: { fillColor: [52, 152, 219] },
  styles: {
    cellWidth: 'wrap',
    fontSize: 10
  },
});
y = doc.lastAutoTable.finalY + 10;


    // Closing Message
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Enjoy your customized trip! Have a safe and memorable journey.", 20, y);
    y += 7;
    doc.setFont("helvetica", "bold");
    doc.text("Ai Travel Planner", 20, y);

    // Save PDF with correct filename
    const safeLocation = (trip.userSelection?.location || "trip").replace(/[^\w\s]/gi, "").replace(/\s+/g, "_");
    doc.save(`${safeLocation}-plan.pdf`);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-lg p-6 transition duration-300 hover:shadow-xl">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white tracking-tight">
          {trip.userSelection?.location || "Trip Destination"}
        </h2>

        <p className="text-base text-gray-600 dark:text-gray-400">
          {trip.userSelection?.noOfDays || "?"} Days &bull; ₹{trip.userSelection?.Budget || "?"}
        </p>

        <button
          onClick={handleDownloadTrip}
          className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-full transition ease-in-out duration-300"
        >
          📄 Download Trip PDF
        </button>
      </div>
    </div>
  );
};
export default AlltripsCard;
