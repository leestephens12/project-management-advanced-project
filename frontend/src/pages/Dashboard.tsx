import {NavBar} from "../components/NavBar";
import {TaskPage} from "../components/TaskPage";
import {TeamPage} from "../components/TeamPage";

export const Dashboard = () => {
    return (
        <div>
            <NavBar/>
            <TaskPage/>
            <TeamPage />
        </div>
    )
}
