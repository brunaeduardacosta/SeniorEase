import { Card } from "../../components/ui/Card/Card";
import { Input } from "../../components/ui/Input/Input";
import { Button } from "../../components/ui/Button/Button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


const loginSchema = z.object({

  email:z.string()
    .email("Digite um e-mail válido"),

  password:z.string()
    .min(4,"A senha deve ter pelo menos 4 caracteres"),

});


type LoginData =
z.infer<typeof loginSchema>;



export function Login(){

const navigate = useNavigate();

const [showPassword,setShowPassword]=useState(false);


const {
 register,
 handleSubmit,
 formState:{errors},

}=useForm<LoginData>({

resolver:zodResolver(loginSchema)

});



function onSubmit(data:LoginData){

console.log(data);

navigate("/dashboard");

}



return(

<div

style={{

minHeight:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

background:
"linear-gradient(135deg,#DBEAFE,#F8FAFC)",

padding:20,

}}

>


<Card>


<div
style={{
textAlign:"center"
}}
>


<h1

style={{

fontSize:36,

color:"#1E3A8A",

marginBottom:10

}}

>

SeniorEase

</h1>


<p

style={{

fontSize:18,

color:"#64748B",

marginBottom:30

}}

>

Acesso simples e seguro

</p>




<form
onSubmit={handleSubmit(onSubmit)}
>



<Input

label="E-mail"

placeholder="Digite seu e-mail"

error={errors.email?.message}

{...register("email")}

/>




<div
style={{
marginTop:20
}}
>


<Input

label="Senha"

placeholder="Digite sua senha"

type={
showPassword
?"text"
:"password"
}

error={errors.password?.message}

{...register("password")}

/>


<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

style={{

marginTop:10,

background:"none",

border:"none",

color:"#2563EB",

cursor:"pointer",

fontSize:16

}}

>

{
showPassword
?"Ocultar senha"
:"Mostrar senha"
}


</button>


</div>




<div
style={{
marginTop:30
}}
>

<Button

type="submit"

size="large"

>

Entrar

</Button>


</div>


</form>


</div>


</Card>


</div>


);

}