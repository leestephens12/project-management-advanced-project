import {Task} from "../models/Task";

type TaskCardProps = { task: Task; }

export const TaskCard = ({ task }: TaskCardProps) => {
    return (
        <div className="border rounded-xl px-3.5 pb-32 pt-3.5">
            <p className="font-bold">{task.description}</p>
            <p>Assigned to {task.assignee}</p>
            <p>{task.status}</p>
        </div>
    )
}
