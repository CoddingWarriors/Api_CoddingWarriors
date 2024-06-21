import React from "react";
import AreaCard from "../components/AreaCard";
import HorizontalBarChart from "../components/HorizontalBar";

function Dashboard() {
    return (
        <div style={{ height: "70vh", margin: "5%"}}>
            <AreaCard
                colors={["blue", "orange", "green"]}
                title="Chamados por Status"
                dbName="ocean"
            />
            <HorizontalBarChart />
        </div>
    );
}

export default Dashboard;
