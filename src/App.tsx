import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./presentation/routes/AppRoutes";
import { UserProvider } from "./presentation/contexts/user/UserProvider";
import { TaskProvider } from "./presentation/store/tasks/TaskProvider";
import { AccessibilityProvider } from "./presentation/contexts/accessibility/AccessibilityProvider";
import { CalendarProvider } from "./presentation/contexts/calendar/CalendarProvider";
import { MedicineProvider } from "./presentation/contexts/medicine/MedicineProvider";
import { MedicineReminder } from "./presentation/components/MedicineReminder/MedicineReminder";

export default function App() {
  return (
    <AccessibilityProvider>
      <UserProvider>
        {/* CalendarProvider por fora do MedicineProvider */}
        <CalendarProvider>
          <MedicineProvider>
            <TaskProvider>
              <BrowserRouter>
                <AppRoutes />
                <MedicineReminder />
              </BrowserRouter>
            </TaskProvider>
          </MedicineProvider>
        </CalendarProvider>
      </UserProvider>
    </AccessibilityProvider>
  );
}