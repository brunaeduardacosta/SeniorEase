import type {
  InputHTMLAttributes
} from "react";


type InputProps =
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
  };


export function Input({
  label,
  error,
  style,
  ...props
}:InputProps){


return (

<div
style={{
  display:"flex",
  flexDirection:"column",
  gap:"8px",
}}
>


{
label && (

<label
style={{
 fontSize:"17px",
 fontWeight:600,
 color:"#1E293B",
}}
>

{label}

</label>

)
}



<input

{...props}

style={{

padding:"16px",

fontSize:"18px",

borderRadius:"14px",

border:
error
? "2px solid #DC2626"
: "2px solid #CBD5E1",

outline:"none",

minHeight:"56px",

boxSizing:"border-box",

...style,

}}

/>


{
error && (

<span
style={{
color:"#DC2626",
fontSize:"15px",
}}
>

{error}

</span>

)
}


</div>

);


}