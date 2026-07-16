type PageTitleProps = {
 title:string;
 subtitle?:string;
};


export function PageTitle({
 title,
 subtitle,
}:PageTitleProps){

return (

<header
style={{
marginBottom:30,
}}
>

<h1
style={{
fontSize:36,
color:"#1E3A8A",
margin:0,
}}
>

{title}

</h1>


{
subtitle && (

<p
style={{
fontSize:18,
color:"#64748B",
marginTop:10,
}}
>

{subtitle}

</p>

)
}


</header>

);

}