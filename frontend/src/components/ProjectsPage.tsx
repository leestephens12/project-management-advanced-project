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

    const handleAddTask = (e: any) => {
        e.preventDefault();

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
            <div className='w-1/4'>
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
                        <li key={count} className="flex items-center justify-between my-5">
                            <p className="font-bold">
                                {project.name}
                            </p>
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
