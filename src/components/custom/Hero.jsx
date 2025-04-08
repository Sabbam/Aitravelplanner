import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { LogInContext } from "@/Context/LogInContext/Login";
import Marquee from "../ui/marquee";

function Hero({ heroRef }) {
  const { isAuthenticated } = useContext(LogInContext);

  const platforms = [
    {
      name: "Expedia",
      link: "https://www.expedia.com/",
    },
    {
      name: "Booking.com",
      link: "https://www.booking.com/",
    },
    {
      name: "Airbnb",
      link: "https://www.airbnb.com/",
    },
    {
      name: "Agoda",
      link: "https://www.agoda.com/",
    },
    {
      name: "TripAdvisor",
      link: "https://www.tripadvisor.com/",
    },
    {
      name: "MakeMyTrip",
      link: "https://www.makemytrip.com/",
    },
    {
      name: "Skyscanner",
      link: "https://www.skyscanner.com/",
    },
    {
      name: "Goibibo",
      link: "https://www.goibibo.com/",
    },
    {
      name: "Travelocity",
      link: "https://www.travelocity.com/",
    },
    {
      name: "Priceline",
      link: "https://www.priceline.com/",
    },
  ];

  const first = platforms.slice(0, platforms.length / 2);
  const second = platforms.slice(platforms.length / 2);

  return (
    <div
      ref={heroRef}
      className="flex items-center flex-col text-center justify-center min-h-screen py-10"
    >
      <div className="text px-10 md:px-40 flex flex-col items-center justify-center gap-4">
        <div className="heading p-2 md:py-5">
         
        <h1 className="font-black text-5xl md:text-9xl bg-gradient-to-r from-sky-400 via-white to-gray-400 bg-clip-text text-transparent text-center pb-4">
  Ai Travel Planner
</h1>


        </div>
        <div className="desc">
          <h5 className="opacity-90 mx-auto text-center text-lg font-medium tracking-tight text-primary/80 md:text-xl">
            Your trusted trip planner and adventure guide.
          </h5>
        </div>
        <div className="buttons flex flex-col gap-3 md:flex-row">
          <Link to="/plan-a-trip">
            <Button>
              {isAuthenticated
                ? "Let's Make Another Trip"
                : "Plan a Trip, It's Free"}
            </Button>
          </Link>
          {/* Optional Button */}
        </div>

        {/* Marquee of Platforms */}
        <div className="marquee relative flex w-[75vw] flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
          <Marquee reverse pauseOnHover className="[--duration:60s]">
            {second.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-name cursor-pointer border hover:border-foreground transition-all overflow-hidden rounded-md w-[200px] md:w-[250px] py-2 px-4 text-center"
              >
                <span className="text-lg font-medium text-primary">{item.name}</span>
              </a>
            ))}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:60s]">
            {first.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-name cursor-pointer border hover:border-foreground transition-all overflow-hidden rounded-md w-[200px] md:w-[250px] py-2 px-4 text-center"
              >
                <span className="text-lg font-medium text-primary">{item.name}</span>
              </a>
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
