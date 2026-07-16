import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Tasks } from "../pages/Tasks/Tasks";
import { Settings } from "../pages/Settings/Settings";
import { Profile } from "../pages/Profile/Profile";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/tasks" element={<Tasks />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}