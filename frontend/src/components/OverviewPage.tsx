import {useEffect, useState} from "react";
import {getOverview} from "../services/api";
import {Overview} from "../models/Overview";
import {PieChart} from "react-minimal-pie-chart";

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
            <div className='flex-col py-8'>
                <h2 className='flex items-center py-4 text-xl font-bold'>
                    <span className='inline-block bg-indigo-600 rounded-full mr-2'
                          style={{width: '1em', height: '1em'}}></span>
                    Task Completion Breakdown
                </h2>
                <PieChart
                    style={{
                        height: '200px', // Control the size here
                        width: '200px',  // Control the size here
                    }}
                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                    labelStyle={{
                        fontSize: '12px', // Adjust font size as needed for the labels
                        fontFamily: 'sans-serif',
                        fill: '#fff', // Example label color, adjust as needed
                    }}
                    labelPosition={60}
                    animate={true}
                    data={[
                        { title: 'Not Started', value: overview.notStartedPercent, color: '#E38627' },
                        { title: 'In Progress', value: overview.inProgressPercent, color: '#C13C37' },
                        { title: 'Complete', value: overview.completedPercent, color: '#008000' },
                    ]}
                />
            </div>
            <div className='flex-col py-8'>
                <h2 className='flex items-center py-4 text-xl font-bold'>
                    <span className='inline-block bg-indigo-600 rounded-full mr-2' style={{ width: '1em', height: '1em' }}></span>
                    Deadline Approaching Tasks
                </h2>
                <table>
                        <thead>
                        <tr>
                            <th className='text-left pr-32 pb-2'>Task</th>
                            <th className='text-right pb-2'>Due Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {overview.tasksEndDateApproaching.map(task => (
                            <tr key={task.id}>
                                <td className='pr-32'>{task.name}</td>
                                <td>{task.dueDate.toLocaleString()}</td>
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
                            <th className='text-right pb-2'>Due Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {overview.highPriorityTasks.map(task => (
                            <tr key={task.id}>
                                <td className='pr-32'>{task.name}</td>
                                <td>{task.dueDate.toLocaleString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}
