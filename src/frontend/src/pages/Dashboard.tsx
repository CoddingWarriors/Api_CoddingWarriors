import AreaCards from "../components/AreaCards";
import HorizontalBarChart from "../components/HorizontalBar";

function Dashboard() {
    return (
        <div style={{ height: "70vh", marginTop: "5%"}}>
            <AreaCards />
            <HorizontalBarChart />
        </div>
    )
}

export default Dashboard