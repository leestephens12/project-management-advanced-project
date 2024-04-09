import {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {Project} from "../models/Project";
import {getProjectOverview, getTasksByProjectId} from "../services/api";
import {PieChart} from "react-minimal-pie-chart";
import {Task} from "../models/Task";

type ViewProjectModalProps = { isOpen: boolean; project: Project; onCancel: () => void };


export function ViewProjectModal({ isOpen, project, onCancel }: ViewProjectModalProps) {
    const [open, setOpen] = useState(isOpen);
    const [tasks, setTasks] = useState<Task[]>();
    const [overview, setOverview] = useState({
        completedPercent: 0,
        inProgressPercent: 0,
        notStartedPercent: 0
    });

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        getProjectOverview(project.id!).then((response) => {
            setOverview(response.data)
        });
        getTasksByProjectId(project.id!).then((response) => setTasks(response.data));
    }, [project.id]);

    // useEffect(() => {
    //     console.log("hey")
    //     getTasksByProjectId(project.id!).then((response) => setTasks(response.data));
    // }, []);

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
                                    <div className="flex-col">
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{project?.name || 'Unknown Project'}</h2>
                                        </div>
                                        <p className="py-3 font-bold">Task Completion Breakdown</p>
                                        <PieChart
                                            style={{
                                                height: '150px',
                                                width: '150px',
                                            }}
                                            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                                            labelStyle={{
                                                fontSize: '12px',
                                                fontFamily: 'sans-serif',
                                                fill: '#fff',
                                            }}
                                            labelPosition={60}
                                            animate={true}
                                            data={[
                                                { title: 'Not Started', value: overview.notStartedPercent, color: '#E38627' },
                                                { title: 'In Progress', value: overview.inProgressPercent, color: '#C13C37' },
                                                { title: 'Complete', value: overview.completedPercent, color: '#008000' },
                                            ]}
                                        />
                                        {/*<table>*/}
                                        {/*    <thead>*/}
                                        {/*    <tr>*/}
                                        {/*        <th className='text-left pr-32 pb-2'>Task</th>*/}
                                        {/*        <th className='text-right pr-32 pb-2'>Due Date</th>*/}
                                        {/*        <th className='text-right pb-2'>Project</th>*/}
                                        {/*    </tr>*/}
                                        {/*    </thead>*/}
                                        {/*    <tbody>*/}
                                        {/*    {tasks?.map(task => (*/}
                                        {/*        <tr key={task.id}>*/}
                                        {/*            <td>{task.name}</td>*/}
                                        {/*            <td className='text-right'>{task.dueDate.toLocaleString()}</td>*/}
                                        {/*            <td>{task.name}</td>*/}
                                        {/*        </tr>*/}
                                        {/*    ))}*/}
                                        {/*    </tbody>*/}
                                        {/*</table>*/}
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
