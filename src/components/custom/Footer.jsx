import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
  AiFillTwitterCircle,
} from "react-icons/ai";

function Footer({ footerRef }) {
  const socialIcons = [
    {
      name: "GitHub",
      icon: <AiFillGithub />,
      link: "https://github.com/sabbam",
    },
    {
      name: "LinkedIn",
      icon: <AiFillLinkedin />,
      link: "https://linkedin.com/in/sabbam-chandraneel",
    },
    {
      name: "Instagram",
      icon: <AiFillInstagram />,
      link: "#",
    },
    {
      name: "Email",
      icon: <AiFillMail />,
      link: "mailto:sabbam2004@gmail.com",
    },
    {
      name: "Twitter",
      icon: <AiFillTwitterCircle />,
      link: "#",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="w-full bg-gradient-to-tr from-sky-200 to-gray-50 text-gray-800 border-t shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col items-center text-center gap-4">
        {/* Footer Title */}
        <p className="font-semibold text-lg md:text-xl bg-gradient-to-r from-sky-600 via-blue-400 to-sky-700 bg-clip-text text-transparent">
          Made with ❤️ by AI Travel Planner
        </p>

        {/* Social Media Icons */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {socialIcons.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-700 hover:text-sky-600 transition-all duration-200"
              aria-label={item.name}
            >
              {item.icon}
            </Link>
          ))}
        </div>

       
      </div>

      {/* Scoped Styling */}
      <style>
        {`
          footer a:hover {
            transform: scale(1.1);
          }

          @media (max-width: 640px) {
            footer {
              text-align: center;
              padding-bottom: 2rem;
            }
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
