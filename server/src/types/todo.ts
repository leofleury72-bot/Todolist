export type Todo = {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
};
export type NewTodo = {
  title: string;
  description: string;
  userId: number;
};
export type UpdateTodo = {
  title: string;
  description: string;
};
