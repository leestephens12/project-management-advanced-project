import {useEffect, useState} from "react";
import {createTask, getDashboard, getProjects, getTeams} from "../services/api";
import {TaskCard} from "./TaskCard";
import {Task, TaskModalMode} from "../models/Task";
import {AddTaskModal} from "./AddTaskModal";
import TeamChannelList from "./TeamChannelList";
import {AddTeamModal} from "./AddTeamModal";
import {AddProjectModal} from "./AddProjectModal";
import {Project} from "../models/Project";

export const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [teams, setTeams] =  useState<any[]>([]);
    const [activeTeam, setActiveTeam] = useState({
        id: "",
        description: "",
        name: "",
        admin: "",
        tasks: null,
        users: null
    });
    const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);

    useEffect(() => {
        getDashboard().then((response) => {
            // setTasks(response.data.tasks);
        });
        getTeams().then((response) => {
            setTeams(response.data.teams);
            setTeams(teams => [...teams, response.data.adminTeams]);
            const filteredTasks = tasks.filter((task: Task) => task.teamID == teams[0].id);
            // setFilteredTasks(filteredTasks);
            setActiveTeam(teams[0]);
        });
        getProjects().then((response) => {
            setProjects(response.data.projects);
        })
    }, []);

    useEffect(() => {
        const filteredTasks = tasks.filter((task: Task) => task.teamID == activeTeam.id);
        setFilteredTasks(filteredTasks);

        const filteredProjects = projects.filter((project: Project) => project.teamId == activeTeam.id);
        setFilteredProjects(filteredProjects);
    }, [tasks, projects]);

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

    const handleCreateProject = (e: any) => {
        console.log("clicked")
        e.preventDefault();
        setAddProjectModalOpen(true);
    }

    // when a new team is selected
    const filterTasksByTeam = (team: any) => {
        setActiveTeam(team);

        setFilteredTasks(tasks);
        const filteredTasks = tasks.filter((task: Task) => task.teamID == team.id);
        setFilteredTasks(filteredTasks);

        setFilteredProjects(projects);
        const filteredProjects = projects.filter((project: Project) => project.teamId == team.id);
        setFilteredProjects(filteredProjects);
    }

    const closeProjectModal = () => {
        setAddProjectModalOpen(false);
    }

    const submitProject = async (project: Project) => {

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
                    {/*{activeTeam &&*/}
                    {/*    <h2 className="font-bold text-2xl py-3 inline">*/}
                    {/*        {activeTeam.name}'s Projects*/}
                    {/*    </h2>*/}
                    {/*}*/}
                    {/*<h2 className="font-bold text-2xl py-3 inline">*/}
                    {/*    {activeTeam.name}'s Projects*/}
                    {/*</h2>*/}
                    <AddProjectModal isOpen={addProjectModalOpen} onSubmit={submitProject} onCancel={closeProjectModal}/>
                    <button
                        onClick={e => handleCreateProject(e)}
                        type="button"
                        className="inline rounded-md bg-indigo-600 mb-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        New Project
                    </button>
                    {/*<AddTaskModal activeTeam={activeTeam} mode={TaskModalMode.CREATE} isOpen={addTaskModalOpen} onSubmit={submitTask} onCancel={closeAddTaskModal} />*/}
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    className="inline rounded-md bg-indigo-600 mb-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                    {/*    onClick={e => handleAddTask(e)}*/}
                    {/*>*/}
                    {/*    New Task*/}
                    {/*</button>*/}
                </div>
                {
                    // filteredTasks.map((task: Task, count) => (
                    //     <li key={count} className="flex items-center justify-between mb-5">
                    //         <TaskCard task={task} />
                    //     </li>
                    // ))

                    filteredProjects.map((project: Project, count) => (
                        <li key={count} className="flex items-center justify-between mb-5">
                           <p>{project.name}</p>
                        </li>
                    ))
                }
            </div>
        </div>
    )
}
