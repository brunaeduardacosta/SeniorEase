import type { ReactNode, CSSProperties } from "react";

import { theme } from "../../../styles/theme/theme";


type CardProps = {
  children?: ReactNode;

  title?: string;
  description?: string;
  icon?: ReactNode;

  onClick?: () => void;

  style?: CSSProperties;
};



export function Card({
  children,
  title,
  description,
  icon,
  onClick,
  style,
}: CardProps) {


  function handleKeyDown(
    event: React.KeyboardEvent<HTMLElement>
  ) {

    if (!onClick) return;


    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      onClick();
    }

  }



  return (

    <section

      role={onClick ? "button" : undefined}

      tabIndex={onClick ? 0 : undefined}

      onClick={onClick}

      onKeyDown={handleKeyDown}

      style={{

        background: theme.colors.surface,

        borderRadius: theme.radius.lg,

        padding: theme.spacing.lg,


        boxShadow:
          theme.shadows.card,


        border:
          `1px solid ${theme.colors.border}`,


        transition:
          "transform .2s ease, box-shadow .2s ease",


        cursor:
          onClick
          ? "pointer"
          : "default",


        ...style,

      }}


      onMouseEnter={(event)=>{

        if(!onClick) return;


        event.currentTarget.style.transform =
          "translateY(-4px)";


        event.currentTarget.style.boxShadow =
          "0 12px 30px rgba(15,23,42,0.15)";

      }}



      onMouseLeave={(event)=>{

        if(!onClick) return;


        event.currentTarget.style.transform =
          "translateY(0)";


        event.currentTarget.style.boxShadow =
          theme.shadows.card;

      }}

    >


      {
        icon && (

          <div
            style={{

              fontSize:"42px",

              marginBottom:
                theme.spacing.sm,

            }}
          >

            {icon}

          </div>

        )
      }




      {
        title && (

          <h2

            style={{

              margin:0,

              marginBottom:
                theme.spacing.xs,

              fontSize:"24px",

              color:
                theme.colors.text,

            }}

          >

            {title}

          </h2>

        )
      }





      {
        description && (

          <p

            style={{

              margin:0,

              fontSize:"17px",

              lineHeight:1.5,

              color:
                theme.colors.textSecondary,

            }}

          >

            {description}

          </p>

        )
      }




      {children}



    </section>

  );
}