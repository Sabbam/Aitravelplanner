import React, { useContext, useEffect } from "react";
import { Button } from "../ui/button.jsx";
import { LogInContext } from "@/Context/LogInContext/Login.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon, Plane, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../constants/ThemeToggle.jsx";

function Header({ headerRef }) {
  const { user, isAuthenticated, logout, loginWithPopup } = useContext(LogInContext);

  const LogOut = () => {
    logout();
  };

  const LogIn = () => {
    loginWithPopup();
  };

  // Google Translate Integration with Branding
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
        includedLanguages: 'af,ar,bn,bs,ca,cs,cy,da,de,el,en,es,et,fa,fi,fil,fr,ga,gl,gu,hi,hr,ht,hu,id,is,it,ja,jv,ka,km,kn,ko,la,lt,lv,mk,ml,mn,mr,my,ne,nb,pl,ps,pt,ro,ru,si,sk,sl,sq,sr,sw,sv,ta,te,th,tr,uk,ur,vi,wa,xh,yi,zh,zu',  // Full list of languages
        gaTrack: true,  // Enable Google Analytics tracking
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div ref={headerRef} className="w-full flex items-center justify-between shadow-sm p-3 md:px-40 border-b">
      <Link to={"/"}>
        <div className="logo flex gap-2 items-center">
          <div className="img inline-block h-5 w-5 md:h-10 md:w-10">
          <span className="hidden md:inline text-4xl">✈️</span>
          </div>
          <h1 className="text-lg md:text-3xl font-bold bg-gradient-to-r from-sky-400 via-white to-gray-400 bg-clip-text text-transparent">
  Ai Travel Planner
</h1>

        </div>
      </Link>

      <div className="flex items-center gap-5">
        {/* Theme Toggle */}
        <ThemeToggle />

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="user flex items-center gap-2 mr-3">
                <h2 className="hidden sm:block text-lg md:text-xl bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent capitalize">
                  Hi {user.given_name || user.nickname}
                </h2>
                <div className="userimg overflow-hidden h-10 w-10 rounded-full">
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} />
                  ) : (
                    <User />
                  )}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-center sm:text-left w-56">
              <DropdownMenuLabel className="font-semibold text-xl flex items-center gap-2">
                <User /> My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/all-trips">
                <DropdownMenuItem className="w-full cursor-pointer text-lg flex items-center gap-2">
                  <Plane /> My Trips
                </DropdownMenuItem>
              </Link>
              <Link to="/plan-a-trip">
                <DropdownMenuItem className="w-full cursor-pointer text-lg flex items-center gap-2">
                  <Plus /> Create Trip
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <div className="text-lg flex items-center justify-center p-2">
                <Button variant="destructive" className="w-full" onClick={LogOut}>
                  Log Out <LogOutIcon className="h-4" />
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={LogIn}>
            Sign In{" "}
            <DropdownMenuShortcut>
              <LogInIcon className="h-4" />
            </DropdownMenuShortcut>
          </Button>
        )}

        {/* "Download Our App" Button (Improved Look) */}
        {/* "Download Our App" Dropdown */}
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600 transition-all duration-200 hidden sm:block">
      Download Our App
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="text-sm w-44">
    <DropdownMenuItem 
      className="cursor-pointer" 
      onClick={() => window.location.href = "/application-baa93a3b-988e-46bb-a225-2f2b00923121.apk"}
    >
      📱 Android
    </DropdownMenuItem>
    <DropdownMenuItem 
      className="cursor-pointer" 
      onClick={() => window.location.href = "https://apps.apple.com/your-ios-app"}
    >
      🍏 iOS
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


        {/* Google Translate Button (Visible on Mobile & Desktop) */}
        <div
          id="google_translate_element"
          className="mr-4 sm:block sm:ml-3 md:ml-0 custom-google-translate"
        ></div>
      </div>

      {/* Custom CSS styling for Google Translate dropdown */}
      <style>
        {`
          /* Custom styles to reduce the Google Translate dropdown height */
          .custom-google-translate .goog-te-combo {
            height: 30px !important; /* Reduced height */
            padding: 0 10px; /* Better padding */
            font-size: 14px !important; /* Smaller text */
            border-radius: 4px !important; /* Rounded corners */
            border: 1px solid #ccc !important; /* Subtle border */
            box-shadow: none !important; /* Remove shadow */
          }

          .custom-google-translate .goog-te-gadget-simple {
            height: 30px !important; /* Same height for the gadget container */
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0 5px;
          }

          /* Hide branding */
          .custom-google-translate .goog-te-banner-frame {
            display: none !important;
          }

          .custom-google-translate .goog-te-gadget {
            background: none !important;
            border: none !important;
            font-size: 0 !important; /* Hide any excess elements like the "Powered by Google" */
          }

          /* Adjust the dropdown for mobile view */
          @media (max-width: 640px) {
            .custom-google-translate .goog-te-combo {
              width: auto; /* Allow it to adjust width */
            }
          }
        `}
      </style>
    </div>
  );
}

export default Header;
