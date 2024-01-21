import {useEffect, useState} from "react";
import {getDashboard} from "../services/api";
import {TaskCard} from "./TaskCard";
import {Task} from "../models/Task";

export const TaskPage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getDashboard().then((response) => {
            setTasks(response.data.tasks);
        });
    })

    return (
        <div>
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
