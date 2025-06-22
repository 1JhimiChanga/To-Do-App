export interface Task {
  name: string;
  date: Date;
  tags: string[];
  priority: "high" | "medium" | "low";
  completed: boolean;
}

export interface TaskList {
  title: string;
  tasks: Task[];
}
