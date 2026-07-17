import { MainLayout } from "../../layouts/MainLayout";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";
import { useUser } from "../../contexts/user/useUser";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";

import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileEditForm } from "./components/ProfileEditForm";
import { AccessibilityOverview } from "./components/AccessibilityOverview";

export function Profile() {
  const { name, setName } = useUser();
  const { simplifiedMode } = useAccessibility();

  return (
    <MainLayout>
      <PageTitle
        title="Meu perfil"
        subtitle={
          simplifiedMode 
            ? "Seus dados no app." 
            : "Gerencie suas informações pessoais e veja suas configurações de acessibilidade."
        }
      />

      <div style={{ maxWidth: "800px" }}>
        <ProfileHeader name={name} />
        
        <ProfileEditForm currentName={name} onSave={setName} />
        
        <AccessibilityOverview />
      </div>
    </MainLayout>
  );
}