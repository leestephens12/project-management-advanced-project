// import {Task, TaskModalMode} from "../models/Task";
// import {createTask} from "../services/api";
//
// const submitTask = async (mode: TaskModalMode, task: Task) => {
//     closeAddTaskModal();
//
//     if (mode === TaskModalMode.CREATE) {
//         try {
//             // write to db
//             await createTask(task);
//             setTasks(tasks => tasks ? [...tasks, task] : [task]);
//             const filteredTasks = tasks.filter((t: Task) => t.teamID == task.teamID);
//             setFilteredTasks(filteredTasks);
//         } catch (err: any) {
//             throw new Error(`Could not create task: ${err.response.data.message}`);
//         }
//     }
//
//     if (mode === TaskModalMode.EDIT) {
//         try {
//             // write to db
//             await createTask(task);
//             setTasks(tasks => tasks ? [...tasks, task] : [task]);
//         } catch (err: any) {
//             throw new Error(`Could not create task: ${err.response.data.message}`);
//         }
//     }
// }

export const TasksPage = () => {
    return (
        <div>

        </div>
    )
}
