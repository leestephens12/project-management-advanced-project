import {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {Priority, Status, Task, TaskModalMode} from "../models/Task";
import {DropdownMenu} from "./DropdownMenu";
import {getAssignees} from "../services/api";

type AddTaskModalProps = { projectId: string; teamId: string; mode: TaskModalMode; isOpen: boolean; onSubmit: (mode: TaskModalMode, task: Task) => Promise<void>; onCancel: () => void };

export function AddTaskModal({ projectId, teamId, mode, isOpen, onSubmit, onCancel }: AddTaskModalProps) {
    const [open, setOpen] = useState(isOpen);
    const [task, setTask] = useState<Task>({
        projectId,
        teamID: teamId,
        assignee: "",
        completionDate: "2024-12-12",
        description: "",
        dueDate: "2024-12-12",
        name: "",
        status: 0,
        priority: 0,
    });

    const [assignees, setAssignees] = useState<{name: string; value: any;}[]>([]);

    useEffect(() => {
        getAssignees().then((response) => {
            const newAssignees = response.data.assignees.map((assignee: {name: string; value: any;}[]) => ({ name: assignee, value: assignee }));
            setAssignees(newAssignees);
        });
        setOpen(isOpen);
       // setTask({...task, teamID: teamId } );
    }, [isOpen]);

    const handleAssigneeChange = (assignee: string) => {
        setTask({...task, assignee } );
    }

    const handlePriorityChange = (priority: Priority) => {
        setTask({...task, priority } );
    }

    const handleStatusChange = (status: Status) => {
        setTask({...task, status } );
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

       // setTask({...task, teamID: activeTeam.id } );

        await onSubmit(mode, task);
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
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">Create Task</h2>

                                            <section aria-labelledby="options-heading" className="mt-10">
                                                <form>
                                                    <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                                            Task title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            onChange={e => setTask({...task, name: e.target.value } )}
                                                            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    <div className="mt-6 rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                                            Description
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            onChange={e => setTask({...task, description: e.target.value } )}
                                                            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    <div className="block">
                                                        <DropdownMenu title={"Assignee"} options={
                                                                [
                                                                    ...assignees
                                                                ]
                                                            }
                                                            onSelect={handleAssigneeChange}
                                                        />
                                                    </div>
                                                    <div className="block">
                                                        <DropdownMenu title={"Priority"} options={
                                                                [
                                                                    {
                                                                        name: "High",
                                                                        value: 0,
                                                                    },
                                                                    {
                                                                        name: "Medium",
                                                                        value: 1,
                                                                    },
                                                                    {
                                                                        name: "Low",
                                                                        value: 2,
                                                                    }
                                                                ]
                                                            }
                                                            onSelect={handlePriorityChange}
                                                        />
                                                    </div>
                                                    <div className="block">
                                                        <DropdownMenu title={"Status"} options={
                                                                [
                                                                    {
                                                                        name: "Not Started",
                                                                        value: 0,
                                                                    },
                                                                    {
                                                                        name: "In Progress",
                                                                        value: 1,
                                                                    },
                                                                    {
                                                                        name: "Completed",
                                                                        value: 2,
                                                                    }
                                                                ]
                                                            }
                                                            onSelect={handleStatusChange}
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
