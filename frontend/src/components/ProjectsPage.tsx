import {useEffect, useState} from "react";
import {createProject, createTask, getTasksByProjectId, getProjectsByTeamId, getTeams} from "../services/api";
import {TaskCard} from "./TaskCard";
import {Task, TaskModalMode} from "../models/Task";
import {AddTaskModal} from "./AddTaskModal";
import TeamChannelList from "./TeamChannelList";
import {AddTeamModal} from "./AddTeamModal";
import {AddProjectModal} from "./AddProjectModal";
import {Project} from "../models/Project";
import {OverviewPage} from "./OverviewPage";

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
    const [showOverview, setShowOverview] = useState<boolean>(false);

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
        setShowOverview(false);
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
                <TeamChannelList teams={teams} onTeamSelected={getTeamProjects} onOverviewSelected={() => setShowOverview(true)}/>
            </div>
            {showOverview ? (
                <OverviewPage />
            ) : (
                <>
                    <div className="p-10 w-3/4">
                        <div className="space-x-5">
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
                        <ul>
                            {filteredProjects.map((project: Project, count) => (
                                <li key={count} className="flex items-center justify-between my-5">
                                    <p className="font-bold text-xl mt-1">
                                        {project.name}
                                        {/* SVG icon */}
                                    </p>
                                    <button
                                        type="button"
                                        className="inline rounded-md bg-indigo-600 mb-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={e => handleAddTask(e, project.id!)}
                                    >
                                        New Task
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );

}
