import React from "react";
import { cn } from "@/lib/utils";
import logo from "/assets/logoWhite.png";

const LoadingScreen = ({
  message = "MINDSPACE is now loading, please wait...",
  className,
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-darkblue backdrop-blur-sm p-4",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner with logo in center */}
        <div className="relative">
          <div
            className="animate-spin rounded-full border-4 border-white/20 h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20"
            style={{ borderTopColor: "#ffffff" }}
          />
          <div
            className="absolute inset-0 animate-pulse rounded-full border-4 border-white/10"
          />
          {/* Logo in the center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              className="rounded-full object-contain w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
            />
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ backgroundColor: "#ffffff", animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ backgroundColor: "#ffffff", animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ backgroundColor: "#ffffff", animationDelay: "300ms" }}
          />
        </div>

        {/* Loading message */}
        <p
          className="text-center text-base sm:text-lg font-medium text-white animate-pulse max-w-xs sm:max-w-md"
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
