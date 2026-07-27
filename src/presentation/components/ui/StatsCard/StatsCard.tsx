import { useTheme } from "../../../styles/theme/useTheme";


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


  const theme = useTheme();



  return (

    <div

      style={{

        background:
          theme.colors.surface,


        borderRadius:
          theme.radius.lg,



        padding:
          theme.spacing.md,



        border:
          `1px solid ${theme.colors.border}`,



        boxShadow:
          theme.shadows.card,


      }}

    >



      <div

        style={{

          fontSize:"38px",

          marginBottom:
            theme.spacing.sm,

        }}

      >

        {icon}

      </div>





      <h3

        style={{

          color:
            theme.colors.textSecondary,


          margin:0,


          fontSize:16,


          fontWeight:600,

        }}

      >

        {title}

      </h3>







      <strong

        style={{

          display:"block",


          fontSize:40,


          marginTop:
            theme.spacing.xs,


          color:
            theme.colors.secondary,


          fontWeight:800,

        }}

      >

        {value}

      </strong>







      {description && (

        <p

          style={{

            color:
              theme.colors.textSecondary,


            marginTop:
              theme.spacing.xs,


            marginBottom:0,


            lineHeight:1.5,

          }}

        >

          {description}

        </p>

      )}



    </div>

  );

}