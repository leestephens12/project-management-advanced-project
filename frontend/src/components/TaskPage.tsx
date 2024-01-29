import {useEffect, useState} from "react";
import {createTask, getDashboard} from "../services/api";
import {TaskCard} from "./TaskCard";
import {Task} from "../models/Task";
import {AddTaskModal} from "./AddTaskModal";

export const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

    useEffect(() => {
        getDashboard().then((response) => {
            setTasks(response.data.tasks);
        });
    }, []);

    const handleAddTask = (e: any) => {
        e.preventDefault();
        setAddTaskModalOpen(true);
    }

    const closeAddTaskModal = () => {
        setAddTaskModalOpen(false);
    }

    const submitTask = async (task: Task) => {
        closeAddTaskModal();
        try {
            // write to db
            await createTask(task);
            setTasks(tasks => tasks ? [...tasks, task] : [task]);
        } catch (err: any) {
            throw new Error(`Could not create task: ${err.response.data.message}`);
        }
    }

    return (
        <div className="p-10">
            <AddTaskModal isOpen={addTaskModalOpen} onSubmit={submitTask} onCancel={closeAddTaskModal} />
            <button
                type="button"
                className="rounded-md bg-indigo-600 mb-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={e => handleAddTask(e)}
            >
                Add Task
            </button>
            {
                tasks.map((task: Task, count) => (
                    <li key={count} className="flex items-center justify-between mb-5">
                        <TaskCard task={task} />
                    </li>
                ))
            }
        </div>
    )
}
