import { IColumn, ITask } from "@/types/Task";

const COLUMNS: IColumn[] = [
  {
    id: "TODO",
    title: "To Do",
  },
  {
    id: "IN_PROGRESS",
    title: "In Progress",
  },
  {
    id: "DONE",
    title: "Done",
  },
];

const INITZIAL_TASK: ITask[] = [
  {
    id: "1",
    status: "DONE",
    title: "Research",
    description: "Gather requirements for project",
  },
  {
    id: "2",
    status: "IN_PROGRESS",
    title: "Design System",
    description: "Create UI and Component Library",
  },
  {
    id: "3",
    status: "TODO",
    title: "API",
    description: "Build RESTful API for the Application",
  },
];

export { COLUMNS, INITZIAL_TASK };
