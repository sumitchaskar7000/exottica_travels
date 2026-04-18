"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "exottica-cookie-notice-closed";

export const CookieNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const closed = localStorage.getItem(STORAGE_KEY);
    if (!closed) setVisible(true);
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-md bg-white border-2 border-slate-300 rounded-lg shadow-lg p-4">
      <div className="flex justify-between gap-2">
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800 mb-1">Notice</p>
          <p className="text-xs text-slate-600">
            We and selected third parties use cookies or similar technologies for technical purposes
            and, with your consent, for other purposes as specified in the cookie policy. Close this
            notice to continue without accepting.
          </p>
        </div>
        <button
          type="button"
          onClick={close}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close notice"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
