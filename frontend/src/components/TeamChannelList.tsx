import {useEffect, useState} from "react";

type TeamChannelListProps = { teams: any[]; onTeamSelected: any };

export default function TeamChannelList({ teams, onTeamSelected }: TeamChannelListProps) {
    const [activeTeam, setActiveTeam] = useState();

    useEffect(() => {
        if (teams.length > 0) {
            setActiveTeam(teams[0]);
            onTeamSelected(teams[0]);
        }
    }, [teams]);

    const handleActiveTeamChange = (team: any) => {
        setActiveTeam(team);
        onTeamSelected(team);
    }

    return (
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
                <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
            </div>
            <button
                type="button"
                className="inline rounded-md bg-indigo-600 mb-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                New Team
            </button>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            <li className="py-2.5 flex hover:bg-gray-50 rounded hover:cursor-pointer">
                                <p className="px-1">Overview
                                </p>
                            </li>
                            {teams.map((team) => (
                                <li onClick={e => handleActiveTeamChange(team)} className="py-2.5 px-3 flex hover:bg-gray-50 hover:cursor-pointer" key={team.name}>
                                    <p className={team === activeTeam ? 'pl-4 font-bold' : 'pl-4'}>{team.name}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
