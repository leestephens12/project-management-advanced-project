import {useEffect, useState} from "react";
import {createTask, createTeam, getTeams} from "../services/api";
import {NavBar} from "./NavBar";
import {AddTaskModal} from "./AddTaskModal";
import {AddTeamModal} from "./AddTeamModal";
import {Team} from "../models/Team";

export const TeamPage = () => {

    const [teams, setTeams] = useState<Team[]>([]);
    const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);

    useEffect(() => {
        getTeams().then((response) => {
            setTeams(response.data.teams);
        });
    }, []);

    const handleCreateTeam = (e: any) => {
        setAddTeamModalOpen(true);
        e.preventDefault();
    }

    const submitTeam = async (team: Team) => {
        console.log("TEAM: " , team)
        closeAddTeamModal();
        try {
            // write to db
            await createTeam(team);
            setTeams(teams => teams ? [...teams, team] : [team]);
        } catch (err: any) {
            throw new Error(`Could not create team: ${err.response.data.message}`);
        }
    }

    const closeAddTeamModal = () => {
        setAddTeamModalOpen(false);
    }

    return (
        <>
            <NavBar />
            <div className="p-10">
                <AddTeamModal isOpen={addTeamModalOpen} onSubmit={submitTeam} onCancel={closeAddTeamModal} />
                <button
                type="button"
                className="rounded-md bg-indigo-600 mb-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={e => handleCreateTeam(e)}
            >
                Create Team
            </button>
            {
                teams.map((team) => (
                    <div className="border rounded-xl px-3.5 pb-32 pt-3.5">
                        <p className="font-bold py-2">{team.name}</p>
                        {team.users.map((user: string) => (
                            <p>{user}</p>
                        ))}
                    </div>
                ))
            }
            </div>
        </>
    )
}
