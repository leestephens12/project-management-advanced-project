import {useEffect, useState} from "react";
import {getOverview} from "../services/api";
import {Overview} from "../models/Overview";

export const OverviewPage = () => {
    const [overview, setOverview] = useState<Overview>({
        completedPercent: 0,
        highPriorityTasks: [],
        inProgressPercent: 0,
        notStartedPercent: 0,
        tasksEndDateApproaching: []
    });

    useEffect(() => {
        getOverview().then((response) => setOverview(response.data));
    }, []);

    return (
        <div className="p-10 w-3/4">
            <h1 className="font-bold text-2xl py-3 inline">
                Overview
            </h1>
            <h2 className='flex items-center py-4 text-xl font-bold'>
                <span className='inline-block bg-indigo-600 rounded-full mr-2' style={{ width: '1em', height: '1em' }}></span>
                Task Completion Breakdown
            </h2>
            <div className='flex-col py-8'>
                <h2 className='flex items-center py-4 text-xl font-bold'>
                    <span className='inline-block bg-indigo-600 rounded-full mr-2' style={{ width: '1em', height: '1em' }}></span>
                    Deadline Approaching Tasks
                </h2>
                <table>
                        <thead>
                        <tr>
                            <th className='text-left pr-32 pb-2'>Task</th>
                            <th className='text-right pr-32 pb-2'>Due Date</th>
                            <th className='text-right pb-2'>Project</th>
                        </tr>
                        </thead>
                        <tbody>
                        {overview.tasksEndDateApproaching.map(task => (
                            <tr key={task.id}>
                                <td>{task.name}</td>
                                <td className='text-right'>{task.dueDate.toLocaleString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex-col'>
                    <h2 className='flex items-center py-4 text-xl font-bold'>
                        <span className='inline-block bg-indigo-600 rounded-full mr-2' style={{ width: '1em', height: '1em' }}></span>
                        High Priority Tasks
                    </h2>
                    <table>
                        <thead>
                        <tr>
                            <th className='text-left pr-32 pb-2'>Task</th>
                            <th className='text-right pr-32 pb-2'>Due Date</th>
                            <th className='text-right pb-2'>Project</th>
                        </tr>
                        </thead>
                        <tbody>
                        {overview.highPriorityTasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.name}</td>
                                <td className='text-right'>{task.dueDate.toLocaleString()}</td>
                                <td>xx</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}
