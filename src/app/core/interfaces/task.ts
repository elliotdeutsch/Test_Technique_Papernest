export interface Task {
  id: string;
  label: string;
  done: boolean;
  order: number;
  createdAt: Date | null;
  expirationDate?: Date | null;
}
