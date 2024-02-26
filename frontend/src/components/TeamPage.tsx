import {useEffect, useState} from "react";
import {getTeams} from "../services/api";
import {NavBar} from "./NavBar";

type Team = {
    id: string;
    name: string;
    admin: string;
    tasks: string[];
    users: string[];
}

export const TeamPage = () => {

    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        getTeams().then((response) => {
            setTeams(response.data.teams);
        });
    }, []);

    return (
        <>
            <NavBar />
            {
                teams.map((team) => (
                    <div className="border rounded-xl px-3.5 pb-32 pt-3.5">
                        <p className="font-bold py-2">{team.name}</p>
                        {team.users.map((user) => (
                            <p>{user}</p>
                        ))}
                    </div>
                ))
            }
        </>
    )
}
