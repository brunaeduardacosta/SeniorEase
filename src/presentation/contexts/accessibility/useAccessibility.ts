import { useContext } from "react";
import { AccessibilityContext } from "./AccessibilityContext";


export function useAccessibility(){

 const context = useContext(AccessibilityContext);


 if(!context){
  throw new Error(
   "useAccessibility precisa estar dentro do Provider"
  );
 }


 return context;

}