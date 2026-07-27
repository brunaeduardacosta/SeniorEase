import { useNavigate } from "react-router-dom";

import { useUser } from "../../../contexts/user/useUser";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../../styles/theme/useTheme";


export function Header() {

  const navigate = useNavigate();

  const theme = useTheme();

  const { name } = useUser();

  const {
    fontSize,
    highContrast,
    simplifiedMode
  } = useAccessibility();



  const displayName =
    name?.trim()
      ? name
      : "Usuário";



  function getGreeting(){

    const hour = new Date().getHours();


    if(hour < 12){
      return "Bom dia";
    }


    if(hour < 18){
      return "Boa tarde";
    }


    return "Boa noite";

  }



  return (

    <header

      className="app-header"

      style={{

        display:"flex",

        justifyContent:"space-between",

        alignItems:"center",

        padding:`${theme.spacing.sm} ${theme.spacing.lg}`,

        background: theme.colors.surface,


        borderBottom:
          highContrast
          ? "3px solid #000"
          : `1px solid ${theme.colors.border}`,

      }}

    >


      <div>


        <h2

          style={{

            margin:0,

            color:
              theme.colors.text,

            fontSize:
              fontSize + 8,

            fontWeight:800,

          }}

        >

          {getGreeting()}, {displayName} 👋

        </h2>



        {!simplifiedMode && (

          <p

            style={{

              marginTop: theme.spacing.xs,

              marginBottom:0,

              color:
                theme.colors.textSecondary,


              fontSize:
                fontSize + 1,

            }}

          >

            Bem-vindo ao SeniorEase.
            Vamos organizar suas atividades.

          </p>

        )}




        {!simplifiedMode && (

          <div

            style={{

              marginTop: theme.spacing.xs,

              display:"flex",

              gap: theme.spacing.xs,

              flexWrap:"wrap",

            }}

          >



            {highContrast && (

              <span

                style={{

                  padding:"6px 12px",

                  borderRadius:"20px",

                  background:
                    theme.colors.text,

                  color:
                    theme.colors.surface,

                  fontSize,

                  fontWeight:700,

                }}

              >

                👁️ Alto contraste

              </span>

            )}



            {simplifiedMode && (

              <span

                style={{

                  padding:"6px 12px",

                  borderRadius:"20px",

                  background:
                    theme.colors.primary,

                  color:
                    theme.colors.surface,

                  fontSize,

                  fontWeight:700,

                }}

              >

                🎯 Modo simples

              </span>

            )}



          </div>

        )}


      </div>





      <button

        onClick={()=>navigate("/profile")}

        style={{

          width:65,

          height:65,


          borderRadius:"50%",


          background:
            theme.colors.primary,


          color:
            theme.colors.surface,


          border:
            highContrast
            ? "3px solid #000"
            : `2px solid ${theme.colors.border}`,


          cursor:"pointer",


          display:"flex",

          alignItems:"center",

          justifyContent:"center",


          fontSize:
            fontSize + 10,


          fontWeight:800,

        }}

        aria-label="Abrir perfil"

      >

        {displayName
          .charAt(0)
          .toUpperCase()
        }


      </button>



    </header>

  );

}