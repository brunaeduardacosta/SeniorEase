import type { Task } from "../../../../domain/entities/Task";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

type TaskCardProps = {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const { fontSize, highContrast } = useAccessibility();


  const priorityTheme = {
    Alta: {
      border: "#DC2626",
      background: "#FEF2F2",
      text: "#991B1B",
      label: "🔴 Alta",
    },

    Média: {
      border: "#F59E0B",
      background: "#FFFBEB",
      text: "#92400E",
      label: "🟡 Média",
    },

    Baixa: {
      border: "#16A34A",
      background: "#F0FDF4",
      text: "#166534",
      label: "🟢 Baixa",
    },
  };


  const priority =
    priorityTheme[task.priority] ?? priorityTheme["Média"];


  const currentTheme = highContrast
    ? {
        background: "#FFFFFF",
        text: "#000000",
        border: "#000000",
        shadow: "none",
        badgeBg: task.completed ? "#000" : "#FFF",
        badgeText: task.completed ? "#FFF" : "#000",
        badgeBorder: "#000",
      }
    : {
        background: priority.background,
        text: "#1E293B",
        border: priority.border,
        shadow: "0 10px 25px rgba(0,0,0,0.06)",
        badgeBg: task.completed ? "#DCFCE7" : "#F1F5F9",
        badgeText: task.completed ? "#166534" : "#475569",
        badgeBorder: "transparent",
      };


  return (
    <div
      style={{
        background: currentTheme.background,
        border: highContrast
          ? `3px solid ${currentTheme.border}`
          : `2px solid ${priority.border}`,
        borderRadius: "24px",
        padding: "28px",
        marginBottom: "24px",
        boxShadow: currentTheme.shadow,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        transition: "transform 0.2s ease",
      }}

      onMouseEnter={(e) => {
        if (!highContrast) {
          e.currentTarget.style.transform = "translateY(-4px)";
        }
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >

      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"flex-start",
          flexWrap:"wrap",
          gap:"15px"
        }}
      >

        <div style={{flex:1}}>


          <div
            style={{
              display:"flex",
              flexWrap:"wrap",
              gap:"10px",
              marginBottom:"15px"
            }}
          >

            <span
              style={{
                background:currentTheme.badgeBg,
                color:currentTheme.badgeText,
                border:`1px solid ${currentTheme.badgeBorder}`,
                padding:"6px 14px",
                borderRadius:"20px",
                fontSize:fontSize-2,
                fontWeight:700
              }}
            >
              {task.completed 
                ? "✓ Concluída"
                : "⏳ Pendente"}
            </span>


            <span
              style={{
                background:priority.background,
                color:priority.text,
                border:`1px solid ${priority.border}`,
                padding:"6px 14px",
                borderRadius:"20px",
                fontSize:fontSize-2,
                fontWeight:700
              }}
            >
              {priority.label}
            </span>


            <span
              style={{
                background:"#F8FAFC",
                color:"#475569",
                padding:"6px 14px",
                borderRadius:"20px",
                fontSize:fontSize-2,
                fontWeight:600
              }}
            >
              📁 {task.category}
            </span>

          </div>



          <h2
            style={{
              margin:0,
              fontSize:fontSize+8,
              fontWeight:800,
              color:currentTheme.text,
              textDecoration:task.completed
                ? "line-through"
                : "none",
              opacity:task.completed ? 0.6 : 1
            }}
          >
            {task.title}
          </h2>


        </div>



        <button
          onClick={onToggle}
          style={{
            padding:"16px 28px",
            fontSize:fontSize+2,
            fontWeight:700,
            borderRadius:"16px",
            border:"none",
            cursor:"pointer",
            background:task.completed
              ? "#16A34A"
              : "#2563EB",
            color:"#FFF"
          }}
        >
          {
            task.completed
              ? "✓ Desfazer"
              : "Concluir"
          }
        </button>


      </div>



      <div
        style={{
          height:"1px",
          background:"#E2E8F0"
        }}
      />



      <div
        style={{
          display:"flex",
          gap:"12px"
        }}
      >

        <button
          onClick={onEdit}
          style={actionButtonStyle}
        >
          ✏️ Editar
        </button>


        <button
          onClick={onDelete}
          style={{
            ...actionButtonStyle,
            color:"#DC2626",
            background:"#FEF2F2"
          }}
        >
          🗑 Excluir
        </button>

      </div>


    </div>
  );
}



const actionButtonStyle = {
  padding:"12px 20px",
  borderRadius:"12px",
  border:"none",
  cursor:"pointer",
  background:"#F1F5F9",
  color:"#475569",
  fontWeight:600,
  flex:1,
};