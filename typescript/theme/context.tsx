import React from "react";

export type ThemeContextProps = {
  brand?: string;
  setBrand?: (brand: string) => void;
  presets?: (brand?: string) => Record<number, string>;
};

export const ThemeContext: React.Context<ThemeContextProps> =
  React.createContext<ThemeContextProps>({});
