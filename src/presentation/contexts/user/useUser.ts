import { useContext } from "react";
import { UserContext } from "./UserContext";


export function useUser(){

const context =
useContext(UserContext);


if(!context){

throw new Error(
"useUser deve estar dentro do UserProvider"
);

}


return context;

}