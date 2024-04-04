import {NavBar} from "../components/NavBar";
import {ProjectsPage} from "../components/ProjectsPage";
import {TeamPage} from "../components/TeamPage";

export const Dashboard = () => {
    return (
        <div>
            <NavBar/>
            <ProjectsPage/>
            <TeamPage />
        </div>
    )
}
