import {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {getAssignees} from "../services/api";
import {Team} from "../models/Team";
import {DropdownMenu} from "./DropdownMenu";

type AddTeamModalProps = { isOpen: boolean; onSubmit: (team: Team) => Promise<void>; onCancel: () => void };

export function AddTeamModal({ isOpen, onSubmit, onCancel }: AddTeamModalProps) {
    const [open, setOpen] = useState(isOpen);
    const [team, setTeam] = useState<Team>({
        id: "",
        description: "",
        name: "",
        admin: "lee@test.com",
        tasks: null,
        users: null
    });
    const [assignees, setAssignees] = useState<{name: string; value: any;}[]>([]);

    useEffect(() => {
        getAssignees().then((response) => {
            const newAssignees = response.data.assignees.map((assignee: {name: string; value: any;}[]) => ({ name: assignee, value: assignee }));
            setAssignees(newAssignees);
        });
        setOpen(isOpen);
    }, [isOpen]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await onSubmit(team);
    }

    const handleAssigneeChange = (value: string) => {
        setTeam({...team, users: [value] } );
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onCancel}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel className="mx-auto w-full max-w-md transform text-left text-base transition">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <div className="grid w-full grid-cols-1 items-center gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">Create Team</h2>

                                            <section aria-labelledby="options-heading" className="mt-10">
                                                <form className="space-y-4">
                                                    <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                                            Team name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            onChange={e => setTeam({...team, name: e.target.value } )}
                                                            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                                            Description
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            onChange={e => setTeam({...team, description: e.target.value } )}
                                                            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    <div className="block">
                                                        <DropdownMenu title={"Members"} options={
                                                            [
                                                                ...assignees
                                                            ]
                                                        }
                                                                      onSelect={handleAssigneeChange}
                                                        />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        onClick={(e) => handleSubmit(e)}
                                                    >
                                                        Create
                                                    </button>
                                                </form>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
