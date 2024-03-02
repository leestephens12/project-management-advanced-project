type TeamChannelListProps = { teams: any[] };

export default function TeamChannelList({ teams }: TeamChannelListProps) {
    return (
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
                <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            <li className="py-2.5 flex hover:bg-gray-50 rounded hover:cursor-pointer">
                                <p className="px-1 font-bold">Overview
                                </p>
                            </li>
                            {teams.map((team) => (
                                <li className="py-2.5 px-3 flex hover:bg-gray-50 hover:cursor-pointer" key={team.name}>
                                    <p className='pl-4'>{team.name}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
