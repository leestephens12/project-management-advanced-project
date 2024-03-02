import {Task} from "../models/Task";

type TaskCardProps = { task: Task; }

export const TaskCard = ({ task }: TaskCardProps) => {

    const priorityBackgroundColor: string[] = [
        'bg-red-400',
        'bg-yellow-400',
        'bg-green-400',
    ]

    const priorityText: string[] = [
        'High',
        'Medium',
        'Low'
    ]

    return (
        <div className="border rounded-xl p-3 space-y-2 pr-8 bg-white hover:cursor-pointer">
            <p className={`${priorityBackgroundColor[task.priority]} text-white text-center rounded-xl w-3/4 text-xs p-1`}>
                {priorityText[task.priority]} Priority
            </p>
            <p className="font-semibold text-2xl">{task.name}</p>
            <p>{task.description}</p>
        </div>
    )
}
