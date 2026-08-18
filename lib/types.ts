export type TaskStatus = "pending" | "in-progress" | "done";

export interface TaskAttachment {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  attachment?: TaskAttachment;
}
