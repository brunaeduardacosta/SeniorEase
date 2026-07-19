import { MainLayout } from "../../layouts/MainLayout";
import { PageTitle } from "../../components/ui/PageTitle/PageTitle";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileEditForm } from "./components/ProfileEditForm";
import { AccessibilityOverview } from "./components/AccessibilityOverview";
import { useUser } from "../../contexts/user/useUser";

export function Profile() {
  const { name, setName } = useUser();

  function handleSaveName(newName: string) {
    setName(newName);
  }

  return (
    <MainLayout>
      <PageTitle
        title="Meu perfil"
        subtitle="Gerencie suas informações pessoais e acessibilidade."
      />

      <div
        style={{
          display: "grid",
          gap: 25,
          maxWidth: 900,
        }}
      >
        <ProfileHeader name={name} />

        <ProfileEditForm currentName={name} onSave={handleSaveName} />

        <AccessibilityOverview />
      </div>
    </MainLayout>
  );
}