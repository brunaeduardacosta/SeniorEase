import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Tasks } from "../pages/Tasks/Tasks";
import { Settings } from "../pages/Settings/Settings";
import { Profile } from "../pages/Profile/Profile";
import { Calendar } from "../pages/Calendar/Calendar";
import { Medicines } from "../pages/Medicines/Medicines";
import { MedicinesHistory } from "../pages/MedicinesHistory/MedicinesHistory";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/tasks" element={<Tasks />} />
      <Route path="/dashboard/calendar" element={<Calendar />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/medicines" element={<Medicines />} />
      <Route path="/medicines/history" element={<MedicinesHistory />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}