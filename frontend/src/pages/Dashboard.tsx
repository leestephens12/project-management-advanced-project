import {NavBar} from "../components/NavBar";
import {ProjectsPage} from "../components/ProjectsPage";
import {TeamPage} from "../components/TeamPage";
import {OverviewPage} from "../components/OverviewPage";

export const Dashboard = () => {
    return (
        <div>
            <NavBar/>
            {/*<ProjectsPage/>*/}
            <OverviewPage />
            {/*<TeamPage />*/}
        </div>
    )
}
