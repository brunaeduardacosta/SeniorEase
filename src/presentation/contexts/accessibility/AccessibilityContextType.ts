export type AccessibilityContextType = {
  fontSize:number;
  setFontSize: (value:number)=>void;
  highContrast:boolean;
  setHighContrast: (value:boolean)=>void;
  simplifiedMode:boolean;
  setSimplifiedMode: (value:boolean)=>void;
  elementSpacing: "small" | "medium" | "large";
  setElementSpacing: (value: "small" | "medium" | "large")=>void;
  largeCursor: boolean;
  setLargeCursor: (value: boolean) => void;
  extraConfirmation: boolean;
setExtraConfirmation: (value: boolean) => void;
};