export type Task = {
  id: number;
  text: string;
  completed: boolean;
  createdAt?: string;
};

const BASE_URL = import.meta.env.VITE_API_URL;

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tasks`);
  return parseJson<Task[]>(res);
}

export async function createTask(input: { text: string; completed: boolean }): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseJson<Task>(res);
}

export async function updateTask(id: number, input: { text: string; completed: boolean }): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseJson<Task>(res);
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
}