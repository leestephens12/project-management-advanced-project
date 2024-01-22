import {useEffect, useState} from "react";
import {addTask, getDashboard} from "../services/api";
import {TaskCard} from "./TaskCard";
import {Task} from "../models/Task";

export const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getDashboard().then((response) => {
            setTasks(response.data.tasks);
        });
    }, []);

    const handleAddTask = async (e: any) => {
        e.preventDefault();
        await addTask({
            assignee: 'XX',
            description: "XX",
            name: "XX",
            status: "XX",
            teamId: "XX",
            dueDate:"XX",
            completionDate: "XX"
        });
    }

    return (
        <div>
            <button
                type="button"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={e => handleAddTask(e)}
            >
                Add Task
            </button>
            {
                tasks.map((task: Task, count) => (
                    <li key={count} className="flex items-center justify-between gap-x-6 py-5">
                        <TaskCard task={task} />
                    </li>
                ))
            }
        </div>
    )
}
