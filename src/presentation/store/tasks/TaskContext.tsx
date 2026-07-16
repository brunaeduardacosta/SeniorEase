import { createContext } from "react";

import type { TaskContextType } 
from "./TaskContextType";


export const TaskContext = 
createContext<TaskContextType | null>(null);