import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg)] z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-t-[var(--accent)] border-b-[var(--primary)] border-l-[var(--primary_soft)] border-r-[var(--accent)] rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
