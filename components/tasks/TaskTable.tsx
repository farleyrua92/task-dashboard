import { Task } from "@/lib/types";
import { TaskRow } from "./TaskRow";

export function TaskTable({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
        No tasks yet. Create the first one with the form above.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              Title
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              Description
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              Attachment
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
