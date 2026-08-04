import { Task } from "@/lib/types";

const STATUS_META: Record<Task["status"], { text: string; className: string }> = {
  pending: { text: "Pending", className: "bg-gray-100 text-gray-700" },
  "in-progress": { text: "In progress", className: "bg-blue-100 text-blue-700" },
  done: { text: "Done", className: "bg-green-100 text-green-700" },
};

export function TaskRow({ task }: { task: Task }) {
  const status = STATUS_META[task.status];

  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{task.title}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{task.description || "—"}</td>
      <td className="px-4 py-3">
        <span className={`rounded-full px-2 py-1 text-xs font-medium ${status.className}`}>
          {status.text}
        </span>
      </td>
      <td className="px-4 py-3 text-sm">
        {task.attachment ? (
          <a
            href={task.attachment.dataUrl}
            download={task.attachment.name}
            className="text-teal-700 hover:underline"
            title={task.attachment.name}
          >
            📎 {task.attachment.name}
          </a>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>
    </tr>
  );
}
