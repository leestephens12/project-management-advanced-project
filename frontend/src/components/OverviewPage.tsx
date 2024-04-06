import {useEffect} from "react";
import {getOverview} from "../services/api";
import {Overview} from "../models/Overview";

export const OverviewPage = () => {
    let overview: Overview = {
        completedPercent: 0,
        highPriorityTasks: [],
        inProgressPercent: 0,
        notStartedPercent: 0,
        tasksEndDateApproaching: []

    };

    useEffect(() => {
        getOverview().then((response) => {
            overview = response.data;
        });
    }, []);

    return (
        <>
            <h2 className="font-bold text-2xl py-3 inline">
                Overview
            </h2>
            <h3>
                High Priority Tasks
            </h3>
            <h3>
                Deadline Approaching Tasks
            </h3>

        </>
    )
}
