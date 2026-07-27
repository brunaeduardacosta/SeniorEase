import { useTheme } from "../../styles/theme/useTheme";
import { MainLayout } from "../../layouts/MainLayout";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";

import { MedicineForm } from "./components/MedicineForm";
import { MedicineList } from "./components/MedicineList";

export function Medicines() {
  const theme = useTheme();

  return (
    <MainLayout>
      <PageTitle
        title="Medicamentos e Remédios"
        subtitle="Organize seus horários de remédios para não esquecer nenhuma dose."
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.lg,
          width: "100%",
        }}
      >
        {/* SEÇÃO DE CADASTRO */}
        <section aria-label="Cadastrar novo medicamento" style={{ width: "100%" }}>
          <MedicineForm />
        </section>

        {/* SEÇÃO DE LISTAGEM */}
        <section aria-label="Lista de medicamentos cadastrados" style={{ width: "100%" }}>
          <MedicineList />
        </section>
      </div>
    </MainLayout>
  );
}