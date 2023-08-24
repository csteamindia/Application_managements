import Starter from "./Starter"
import { Outlet } from "react-router-dom"

const Dashboard = () => {
    return (
        <>
            <Starter />
            <Outlet />
        </>
    )
}

export default Dashboard