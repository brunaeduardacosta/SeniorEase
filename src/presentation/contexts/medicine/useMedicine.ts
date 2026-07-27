import { useContext } from "react";

import {
 MedicineContext
}
from "./MedicineContext";


export function useMedicine(){

const context =
useContext(MedicineContext);


if(!context){

throw new Error(
"useMedicine precisa estar dentro de MedicineProvider"
);

}


return context;

}