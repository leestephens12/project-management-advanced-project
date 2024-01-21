import {Task} from "../models/Task";

type TaskCardProps = { task: Task; }

export const TaskCard = ( { task }: TaskCardProps) => {
    return (
        <div>
            <p className='font-bold'>{task.name}</p>
            <p>{task.description}</p>
            <p>Assigned to {task.assignee}</p>
        </div>
    )
}
