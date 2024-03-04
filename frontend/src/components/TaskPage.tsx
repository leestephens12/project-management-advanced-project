import {useEffect, useState} from "react";
import {createTask, getDashboard, getTeams} from "../services/api";
import {TaskCard} from "./TaskCard";
import {Task, TaskModalMode} from "../models/Task";
import {AddTaskModal} from "./AddTaskModal";
import TeamChannelList from "./TeamChannelList";


export const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
    const [teams, setTeams] =  useState<any[]>([]);
    const [activeTeam, setActiveTeam] = useState({
        id: "",
        description: "",
        name: "",
        admin: "",
        tasks: null,
        users: null
    });

    useEffect(() => {
        getDashboard().then((response) => {
            setTasks(response.data.tasks);
        });
        getTeams().then((response) => {
            setTeams(response.data.teams);

            console.log('teams ', teams);

            const filteredTasks = tasks.filter((task: Task) => task.teamID == teams[0].id);
            setFilteredTasks(filteredTasks);
            setActiveTeam(teams[0]);
        });
    }, []);

    useEffect(() => {
        const filteredTasks = tasks.filter((task: Task) => task.teamID == activeTeam.id);
        setFilteredTasks(filteredTasks);
    }, [tasks]);

    const handleAddTask = (e: any) => {
        e.preventDefault();

        setAddTaskModalOpen(true);
    }

    const closeAddTaskModal = () => {
        setAddTaskModalOpen(false);
    }

    const submitTask = async (mode: TaskModalMode, task: Task) => {
        closeAddTaskModal();

        if (mode === TaskModalMode.CREATE) {
            try {
                // write to db
                await createTask(task);
                setTasks(tasks => tasks ? [...tasks, task] : [task]);
                const filteredTasks = tasks.filter((t: Task) => t.teamID == task.teamID);
                setFilteredTasks(filteredTasks);
            } catch (err: any) {
                throw new Error(`Could not create task: ${err.response.data.message}`);
            }
        }

        if (mode === TaskModalMode.EDIT) {
            try {
                // write to db
                await createTask(task);
                setTasks(tasks => tasks ? [...tasks, task] : [task]);
            } catch (err: any) {
                throw new Error(`Could not create task: ${err.response.data.message}`);
            }
        }
    }



    const filterTasksByTeam = (team: any) => {
        setActiveTeam(team);
        setFilteredTasks(tasks);
        const filteredTasks = tasks.filter((task: Task) => task.teamID == team.id);
        setFilteredTasks(filteredTasks);
    }

    return (
        <div className="flex">
            <div className='w-1/4'>
                <TeamChannelList teams={teams} onTeamSelected={filterTasksByTeam}/>
            </div>
            {/*<NavBar />*/}
            <div className="p-10 w-3/4">
                <div className="space-x-5">
                    {/*<DropdownMenu title={"Filter"} options={*/}
                    {/*    [*/}
                    {/*        {*/}
                    {/*            name: "Priority"*/}
                    {/*        },*/}
                    {/*        {*/}
                    {/*            name: "Name"*/}
                    {/*        },*/}
                    {/*        {*/}
                    {/*            name: "Due date"*/}
                    {/*        },*/}
                    {/*        {*/}
                    {/*            name: "Assignee"*/}
                    {/*        },*/}
                    {/*    ]*/}
                    {/*}*/}
                    {/*/>*/}
                    {activeTeam &&
                        <h2 className="font-bold text-2xl py-3 inline">
                            {activeTeam.name}'s Tasks
                        </h2>
                    }
                    <AddTaskModal activeTeam={activeTeam} mode={TaskModalMode.CREATE} isOpen={addTaskModalOpen} onSubmit={submitTask} onCancel={closeAddTaskModal} />
                    <button
                        type="button"
                        className="inline rounded-md bg-indigo-600 mb-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={e => handleAddTask(e)}
                    >
                        New Task
                    </button>
                </div>
                {
                    filteredTasks.map((task: Task, count) => (
                        <li key={count} className="flex items-center justify-between mb-5">
                            <TaskCard task={task} />
                        </li>
                    ))
                }
            </div>
        </div>
    )
}
