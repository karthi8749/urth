"use client";

import { createContext, useContext, useState, useEffect } from "react";

type IntroContextType = {
  isIntroComplete: boolean;
  setIntroComplete: (complete: boolean) => void;
};

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function HomepageIntroProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <IntroContext.Provider
      value={{ isIntroComplete, setIntroComplete: setIsIntroComplete }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (context === undefined) {
    throw new Error("useIntro must be used within HomepageIntroProvider");
  }
  return context;
}
