import { Link, Outlet, useLocation } from 'react-router-dom'

function MainLayout() {
    const location = useLocation();

    return (
        <div className='container' style={{ display: "flex", height: "100vh", width: "100%" }}>

            {/* SIDEBAR */}
            <div style={{
                width: "220px",
                background: "#111",
                color: "white",
                padding: "20px"
            }}>
                <h2>Gym Planner</h2>

                <nav style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Link style={{ color: location.pathname === "/dashboard" ? "yellow" : "white" }} to="/dashboard">Dashboard</Link>
                    <Link style={{ color: location.pathname === "/schedule" ? "yellow" : "white" }} to="/schedule">Schedule</Link>
                    <Link style={{ color: location.pathname === "/exercises" ? "yellow" : "white" }} to="/exercises">Exercises</Link>
                    <Link style={{ color: location.pathname === "/plans" ? "yellow" : "white" }} to="/plans">Plans</Link>
                </nav>
            </div>

            {/* CONTENT */}
            <div style={{ width: "100%" }}>

                {/* HEADER */}
                <div style={{
                    height: "60px",
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 20px"
                }}>
                    Header
                </div>

                {/* PAGE */}
                <div style={{ padding: "20px", width: "100%" }}>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default MainLayout