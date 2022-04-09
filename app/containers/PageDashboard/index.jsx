import React from "react";

import PageLayout from "../PageLayout";

import Statuses from "@/components/Claim/Statuses";
import GridClaim from "@/components/Claim/GridClaim";

function Dashboard() {
  React.useEffect(() => {
    window.document.title = "Dashboard";
    return () => {
      window.document.title = "Dent Doc Connect";
    };
  }, []);
  return (
    <PageLayout title="Dashboard">
      <Statuses />
      <GridClaim />
    </PageLayout>
  );
}

export default Dashboard;
