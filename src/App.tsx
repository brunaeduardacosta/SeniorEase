import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./presentation/routes/AppRoutes";
import { AccessibilityProvider } from "./presentation/contexts/accessibility/AccessibilityProvider";
import { AccessibilityWrapper } from "./presentation/contexts/accessibility/AccessibilityWrapper";
import { UserProvider } from "./presentation/contexts/user/UserProvider";
import { TaskProvider } from "./presentation/store/tasks/TaskProvider";



export default function App() {


  return (
    <UserProvider>
      <TaskProvider>
        <AccessibilityProvider>
          <AccessibilityWrapper>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AccessibilityWrapper>
        </AccessibilityProvider>
      </TaskProvider>
    </UserProvider>
  );

}