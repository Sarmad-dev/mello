"use client"
import { createContext, useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";

interface CardContextProps {
  cards: Doc<"cards">[];
  children: React.ReactNode;
}

const CardContext = createContext({});

export function CardContextProvider({ cards, children }: CardContextProps) {
  const [listCards, setListCards] = useState(cards);

  return (
    <CardContext.Provider value={{ listCards, setListCards }}>
      {children}
    </CardContext.Provider>
  );
}
