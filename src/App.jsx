import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faTimes } from "@fortawesome/free-solid-svg-icons";
import Header from "./components/custom/Header.jsx";
import Hero from "./components/custom/Hero.jsx";
import CreateTrip from "./components/routes/plan-a-trip/CreateTrip.jsx";
import Mytrips from "./components/routes/my-trips/[tripId]/Mytrips.jsx";
import Footer from "./components/custom/Footer.jsx";
import Alltrips from "./components/routes/all-trips/Alltrips.jsx";
import ProgressBar from "./components/constants/ProgressBar.jsx";
import { LogInContext } from "./Context/LogInContext/Login.jsx";
import toast from "react-hot-toast";

function App() {
  const { isAuthenticated } = useContext(LogInContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false); // State to toggle chatbot visibility
  const location = useLocation();

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  useEffect(() => {
    if (!loggedIn && isAuthenticated) {
      setLoggedIn(true);
      toast.success("Logged In Successfully");
    }
  }, [isAuthenticated]);

  return (
    <>
      <ProgressBar />
      <div className="app tracking-tighter min-w-[320px]">
        <Header />
        <div className="container max-w-[1024px] w-full min-w-[320px] h-auto">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/plan-a-trip" element={<CreateTrip />} />
            <Route
              path="/my-trips/:tripId"
              element={isAuthenticated ? <Mytrips /> : <Hero />}
            />
            <Route
              path="/all-trips"
              element={isAuthenticated ? <Alltrips /> : <Hero />}
            />
          </Routes>
        </div>
        <Footer />

        {/* Chatbot Toggle Button */}
        <button
          onClick={toggleChatbot}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
            backgroundColor: "#007BFF",
            color: "#FFF",
            padding: "10px",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <FontAwesomeIcon
            icon={showChatbot ? faTimes : faComments}
            style={{ fontSize: "20px" }}
          />
        </button>

        {/* Chatbot Iframe */}
        {showChatbot && (
          <div
            style={{
              position: "fixed",
              bottom: "80px",
              right: "20px",
              width: "400px",
              height: "600px",
              backgroundColor: "#FFF",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              zIndex: 9998,
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/eATkXN5TiFozn1TXZq6pZ"
              style={{ width: "100%", height: "100%", border: "none" }}
              frameBorder="0"
              title="Chatbot"
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
