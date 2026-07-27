import {
useEffect,
useState
} from "react";

import type {ReactNode} from "react";

import {
CalendarContext
} from "./CalendarContext";

import type {
CalendarEvent
} from "../../../domain/entities/CalendarEvent";


type Props={
 children:ReactNode;
}


export function CalendarProvider({
children
}:Props){


const [events,setEvents]=useState<CalendarEvent[]>(()=>{

const saved =
localStorage.getItem("calendar");


return saved
?
JSON.parse(saved)
:
[];

});



useEffect(()=>{

localStorage.setItem(
"calendar",
JSON.stringify(events)
);

},[events]);



function addEvent(event:CalendarEvent){

setEvents(prev=>[
...prev,
event
]);

}



function updateEvent(event:CalendarEvent){

setEvents(prev=>
prev.map(item=>
item.id===event.id
?
event
:
item
)
);

}



function removeEvent(id:string){

setEvents(prev=>
prev.filter(
item=>item.id!==id
)
);

}



return(

<CalendarContext.Provider

value={{
events,
addEvent,
updateEvent,
removeEvent
}}

>

{children}

</CalendarContext.Provider>


);


}