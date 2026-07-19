type StatsCardProps = {
  icon: string;
  title: string;
  value: number | string;
  description?: string;
};


export function StatsCard({
  icon,
  title,
  value,
  description,
}: StatsCardProps) {


return (

<div
style={{
background:"#FFFFFF",
borderRadius:"24px",
padding:"25px",
border:"1px solid #E2E8F0",
boxShadow:
"0 8px 25px rgba(15,23,42,0.08)",
}}
>


<div
style={{
fontSize:"38px",
marginBottom:15,
}}
>
{icon}
</div>


<h3
style={{
color:"#64748B",
margin:0,
fontSize:16,
}}
>
{title}
</h3>


<strong
style={{
display:"block",
fontSize:40,
marginTop:10,
color:"#1E3A8A",
}}
>
{value}
</strong>


{
description && (

<p
style={{
color:"#64748B",
marginTop:10,
}}
>
{description}
</p>

)
}


</div>

);

}