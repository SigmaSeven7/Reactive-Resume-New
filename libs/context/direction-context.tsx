import React, { createContext, useContext, useEffect, useState } from "react";
type Direction = "ltr" | "rtl";
type DirectionContextProps = {
  dir: Direction;
  setDir: (dir: Direction) => void;
};

const DirectionContext = createContext<DirectionContextProps | undefined>(undefined);

export const DirectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dir, setDir] = useState<Direction>("ltr");

  // useEffect(() => {
  //   const htmlElement = document.querySelector("html");
  //   if (htmlElement) {
  //     const dirAttribute = htmlElement.dataset.dir ?? "ltr";
  //     setDir(dirAttribute);
  //     localStorage.setItem("dir", dirAttribute);
  //   }
  // }, []);

  // useEffect(() => {
  //   const htmlElement = document.querySelector("html");
  //   if (htmlElement) {
  //     htmlElement.dataset.dir = dir;
  //   }
  // }, [dir]);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    const dirAttribute = (htmlElement?.dataset.dir ?? "ltr") as Direction;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (dirAttribute) {
      setDir(dirAttribute);
      localStorage.setItem("direction", dirAttribute);
    } else {
      const storedDir = localStorage.getItem("direction") as Direction | null;
      if (storedDir) {
        setDir(storedDir);
      }
    }
  }, []);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.dataset.dir = dir;
    }
    localStorage.setItem("direction", dir);
  }, [dir]);

  return <DirectionContext.Provider value={{ dir, setDir }}>{children}</DirectionContext.Provider>;
};

export const useDirection = (): DirectionContextProps => {
  const context = useContext(DirectionContext);
  if (!context) {
    // eslint-disable-next-line lingui/no-unlocalized-strings
    throw new Error("useDirection must be used within a DirectionProvider");
  }
  return context;
};
