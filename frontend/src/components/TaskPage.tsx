import {useEffect, useState} from "react";
import {createTask, getDashboard, getTeams} from "../services/api";
import {TaskCard} from "./TaskCard";
import {Task} from "../models/Task";
import {AddTaskModal} from "./AddTaskModal";
import TeamChannelList from "./TeamChannelList";

export const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
    const [teams, setTeams] =  useState<any[]>([]);

    useEffect(() => {
        getDashboard().then((response) => {
            setTasks(response.data.tasks);
        });
        getTeams().then((response) => {
            setTeams(response.data.teams);
        })
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
        <div className="flex">
            <div className='w-1/4'><TeamChannelList teams={teams}/></div>
            {/*<NavBar />*/}
            <div className="p-10 w-3/4 bg-slate-50">
                <div className="space-x-5">
                    <h2 className="font-bold text-2xl py-3 inline">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline mr-1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                        My Tasks
                    </h2>
                    <AddTaskModal isOpen={addTaskModalOpen} onSubmit={submitTask} onCancel={closeAddTaskModal} />
                    <button
                        type="button"
                        className="inline rounded-md bg-indigo-600 mb-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={e => handleAddTask(e)}
                    >
                        New Task
                    </button>
                </div>
                {
                    tasks.map((task: Task, count) => (
                        <li key={count} className="flex items-center justify-between mb-5">
                            <TaskCard task={task} />
                        </li>
                    ))
                }
            </div>
        </div>
    )
}
