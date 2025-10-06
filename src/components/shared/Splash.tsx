import React from "react";

const Splash: React.FC = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90">
    <div className="flex flex-col items-center">
      <svg className="text-primary h-12 w-12 animate-spin" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray="31.4 31.4"
          className="stroke-primary"
        />
      </svg>
      <div className="text-primary mt-4 font-medium">Loading...</div>
    </div>
  </div>
);

export default Splash;
