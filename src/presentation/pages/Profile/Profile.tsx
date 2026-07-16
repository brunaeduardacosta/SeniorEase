import { useState } from "react";

import { MainLayout } from "../../layouts/MainLayout";

import { Card } from "../../components/ui/Card/Card";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";
import { Button } from "../../components/ui/Button/Button";

import { useUser } 
from "../../contexts/user/useUser";

import { useAccessibility }
from "../../contexts/accessibility/useAccessibility";



export function Profile(){


  const {
    name,
    setName

  } = useUser();



  const {

    fontSize,
    highContrast,
    simplifiedMode

  } = useAccessibility();




  const [newName,setNewName] =
  useState(name);




  function saveName(){


    if(!newName.trim()) return;


    setName(newName);


  }





  return (

    <MainLayout>



      <PageTitle

        title="Meu perfil"

        subtitle="Gerencie suas informações pessoais."

      />





      <Card>


        <div

          style={{

            display:"flex",

            alignItems:"center",

            gap:20,

            marginBottom:30,

          }}

        >



          <div

            style={{

              width:80,

              height:80,

              borderRadius:"50%",

              background:"#2563EB",

              color:"#fff",

              display:"flex",

              alignItems:"center",

              justifyContent:"center",

              fontSize:36,

              fontWeight:700,

            }}

          >

            {
              name
              .charAt(0)
              .toUpperCase()
            }


          </div>



          <div>

            <h2>

              {name}

            </h2>


            <p

              style={{

                color:"#64748B"

              }}

            >

              Usuário SeniorEase


            </p>


          </div>



        </div>





        <label>

          Nome


        </label>



        <input

          value={newName}

          onChange={(e)=>
            setNewName(
              e.target.value
            )
          }


          style={{

            width:"100%",

            padding:15,

            borderRadius:12,

            border:"1px solid #CBD5E1",

            fontSize:18,

            marginTop:10,

          }}

        />





        <div

          style={{

            marginTop:20

          }}

        >



          <Button

            onClick={saveName}

          >

            Salvar alterações


          </Button>


        </div>




      </Card>







      <Card

        style={{

          marginTop:25

        }}

      >


        <h2>

          Preferências de acessibilidade

        </h2>



        <p>

          🔤 Tamanho da fonte:
          <strong>
            {" "}
            {fontSize}px
          </strong>

        </p>



        <p>

          👁️ Alto contraste:

          <strong>

            {" "}

            {
              highContrast
              ?
              "Ativado"
              :
              "Desativado"
            }

          </strong>


        </p>




        <p>

          🧩 Modo simplificado:

          <strong>

            {" "}

            {
              simplifiedMode
              ?
              "Ativado"
              :
              "Desativado"
            }


          </strong>


        </p>



      </Card>




    </MainLayout>

  );

}