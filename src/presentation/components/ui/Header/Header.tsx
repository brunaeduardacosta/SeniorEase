import { useNavigate } from "react-router-dom";

import { useUser } from "../../../contexts/user/useUser";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";


export function Header() {

  const navigate = useNavigate();

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

        padding:"20px 35px",

        background: highContrast
          ? "#FFFFFF"
          : "#FFFFFF",


        borderBottom:
          highContrast
          ? "3px solid #000"
          : "1px solid #E2E8F0",

      }}

    >


      {/* TEXTO PRINCIPAL */}

      <div>


        <h2

          style={{

            margin:0,

            color:
              highContrast
              ? "#000"
              : "#1E293B",

            fontSize:
              fontSize + 8,

            fontWeight:800

          }}

        >

          {getGreeting()}, {displayName} 👋

        </h2>



        {!simplifiedMode && (

          <p

            style={{

              marginTop:8,

              marginBottom:0,

              color:
                highContrast
                ? "#000"
                : "#64748B",

              fontSize:

                fontSize + 1,

            }}

          >

            Bem-vindo ao SeniorEase.
            Vamos organizar suas atividades.

          </p>

        )}



        {/* STATUS DE ACESSIBILIDADE */}

        {!simplifiedMode && (

          <div

            style={{

              marginTop:12,

              display:"flex",

              gap:10,

              flexWrap:"wrap"

            }}

          >


            {highContrast && (

              <span

                style={{

                  padding:"6px 12px",

                  borderRadius:20,

                  background:"#000",

                  color:"#FFF",

                  fontSize

                }}

              >

                👁️ Alto contraste

              </span>

            )}



            {simplifiedMode && (

              <span

                style={{

                  padding:"6px 12px",

                  borderRadius:20,

                  background:"#2563EB",

                  color:"#FFF",

                  fontSize

                }}

              >

                🎯 Modo simples

              </span>

            )}



          </div>

        )}


      </div>





      {/* PERFIL */}

      <button

        onClick={()=>navigate("/profile")}

        style={{

          width:65,

          height:65,

          borderRadius:"50%",


          background:

            highContrast
            ? "#000"
            : "#2563EB",


          color:"#FFF",


          border:

            highContrast
            ? "3px solid #000"
            :"none",


          cursor:"pointer",


          display:"flex",

          alignItems:"center",

          justifyContent:"center",


          fontSize:
            fontSize + 10,


          fontWeight:800

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