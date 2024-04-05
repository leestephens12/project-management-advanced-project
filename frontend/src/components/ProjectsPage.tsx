import {useEffect, useState} from "react";
import {createProject, createTask, getTasksByProjectId, getProjectsByTeamId, getTeams} from "../services/api";
import {TaskCard} from "./TaskCard";
import {Task, TaskModalMode} from "../models/Task";
import {AddTaskModal} from "./AddTaskModal";
import TeamChannelList from "./TeamChannelList";
import {AddTeamModal} from "./AddTeamModal";
import {AddProjectModal} from "./AddProjectModal";
import {Project} from "../models/Project";

export const ProjectsPage = () => {
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [teams, setTeams] =  useState<any[]>([]);
    const [activeProjectId, setActiveProjectId] = useState<string>("");
    const [activeTeam, setActiveTeam] = useState({
        id: "",
        description: "",
        name: "",
        admin: "",
        tasks: [],
        users: []
    });
    const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);

    useEffect(() => {
        getTeams().then((response) => {
            setTeams(response.data.teams);
            setTeams(teams => [...teams, response.data.teams]);
            setActiveTeam(response.data.teams[0]);
            getProjectsByTeamId(response.data.teams[0].id).then((response) => {
                setProjects(response.data.projects);
            });
        });
    }, []);

    useEffect(() => {
        const filteredProjects = projects.filter((project: Project) => project.teamId == activeTeam.id);
        setFilteredProjects(filteredProjects);
    }, [projects]);

    const handleAddTask = (e: any, projectId: string) => {
        e.preventDefault();

        setActiveProjectId(projectId);
        setAddTaskModalOpen(true);
    }

    const closeAddTaskModal = () => {
        setAddTaskModalOpen(false);
    }

    const handleCreateProject = (e: any) => {
        console.log("clicked")
        e.preventDefault();
        setAddProjectModalOpen(true);
    }

    // when a new team is selected
    const getTeamProjects = (team: any) => {
        setActiveTeam(team);

        getProjectsByTeamId(team.id).then((response) => {
            setProjects(response.data.projects);
        });
    }

    const closeProjectModal = () => {
        setAddProjectModalOpen(false);
    }

    const submitTask = async (mode: TaskModalMode, task: Task) => {
        closeAddTaskModal();

        try {
            // write to db
            await createTask(task);
        } catch (err: any) {
            throw new Error(`Could not create task: ${err.response.data.message}`);
        }
    }


    // create a project under the currently selected team
    const submitProject = async (project: Project) => {
            const { name } = project;
            const { users, id } = activeTeam;

            const payload = {
                name,
                teamId: id,
                members: users,
                startDate: new Date().toUTCString(),
                endDate: new Date().toUTCString(),
            }

            try {
                // write to db
                await createProject(payload);
                getProjectsByTeamId(activeTeam.id).then((response) => {
                    setProjects(response.data.projects);
                });
            } catch (err: any) {
                throw new Error(`Could not create project: ${err.response.data.message}`);
            }
    }

    return (
        <div className="flex">
            <div className='shadow-lg rounded-xl w-1/4 h-screen'>
                <TeamChannelList teams={teams} onTeamSelected={getTeamProjects}/>
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
                    <h2 className="font-bold text-2xl py-3 inline">
                        {activeTeam.name}'s Projects
                    </h2>
                    <AddProjectModal isOpen={addProjectModalOpen} onSubmit={submitProject} onCancel={closeProjectModal}/>
                    <button
                        onClick={e => handleCreateProject(e)}
                        type="button"
                        className="inline rounded-md bg-indigo-600 mb-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        New Project
                    </button>
                </div>
                <AddTaskModal
                    projectId={activeProjectId!}
                    teamId={activeTeam.id}
                    mode={TaskModalMode.CREATE}
                    isOpen={addTaskModalOpen}
                    onSubmit={submitTask}
                    onCancel={closeAddTaskModal}
                />
                {
                    // filteredTasks.map((task: Task, count) => (
                    //     <li key={count} className="flex items-center justify-between mb-5">
                    //         <TaskCard task={task} />
                    //     </li>
                    // ))



                    filteredProjects.map((project: Project, count) => (
                        <li key={count} className="flex items-center justify-between my-5">
                            <p className="font-bold text-xl mt-1">
                                {project.name}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline w-6 h-6 align-middle ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </p>
                            <button
                                type="button"
                                className="inline rounded-md bg-indigo-600 mb-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={e => handleAddTask(e, project.id!)}
                            >
                                New Task
                            </button>
                            {/*<p className="text-white bg-indigo-600 rounded-full inline-flex items-center justify-center px-3 py-1">*/}
                            {/*   {project.tasks.length} {project.tasks.length === 1 ? 'Task' : 'Tasks'}*/}
                            {/*</p>*/}
                        </li>
                    ))
                }
            </div>
        </div>
    )
}
