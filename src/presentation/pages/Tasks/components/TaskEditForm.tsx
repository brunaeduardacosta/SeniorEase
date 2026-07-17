import { Card } from "../../../components/ui/Card/Card";
import { Button } from "../../../components/ui/Button/Button";
import { Input } from "../../../components/ui/Input/Input";

type TaskEditFormProps = {
  editingText: string;
  setEditingText: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function TaskEditForm({ editingText, setEditingText, onSave, onCancel }: TaskEditFormProps) {
  return (
    <Card>
      <h2>Editar tarefa</h2>
      <Input
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
      />
      <div style={{ display: "flex", gap: 15, marginTop: 20, flexWrap: "wrap" }}>
        <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button onClick={onSave}>Salvar alteração</Button>
      </div>
    </Card>
  );
}
