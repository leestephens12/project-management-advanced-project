import {NavBar} from "../components/NavBar";
import {TaskPage} from "../components/TaskPage";
import {getDashboard} from "../services/api";


export const Dashboard = () => {
    getDashboard().then(console.log);

    return (
        <div>
            <NavBar/>
            <TaskPage/>
        </div>
    )
}
