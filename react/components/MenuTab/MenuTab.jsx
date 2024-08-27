import React, { useState } from "react";
import JobFeed from "../FeedCard/JobFeed";
import YourJobs from "../ManagerMenuTabs/YourJobs";
import ClosedJobs from "../ManagerMenuTabs/ClosedJobs";

const MenuTabs = () => {
  const [activeTab, setActiveTab] = useState("jobFeed");

  const renderTabContent = () => {
    switch (activeTab) {
      case "jobFeed":
        return <JobFeed />;
      case "yourJobs":
        return <YourJobs />;
      case "closedJobs":
        return <ClosedJobs />;
      default:
        return <JobFeed />;
    }
  };

  return (
    <div>
      <div style={tabContainerStyles}>
        <button
          onClick={() => setActiveTab("jobFeed")}
          style={activeTab === "jobFeed" ? { ...tabStyles, ...activeTabStyles } : tabStyles}
        >
          Job Feed
        </button>
        <button
          onClick={() => setActiveTab("yourJobs")}
          style={activeTab === "yourJobs" ? { ...tabStyles, ...activeTabStyles } : tabStyles}
        >
          Your Jobs
        </button>
        <button
          onClick={() => setActiveTab("closedJobs")}
          style={activeTab === "closedJobs" ? { ...tabStyles, ...activeTabStyles } : tabStyles}
        >
          Closed Jobs
        </button>
      </div>
      <div style={contentStyles}>{renderTabContent()}</div>
    </div>
  );
};

const tabContainerStyles = {
  display: "flex",
  justifyContent: "space-around",
  padding: "10px",
  backgroundColor: "#fff",
  borderBottom: "2px solid #ccc",
};

const tabStyles = {
  fontFamily: "'Poppins', sans-serif",
  background: "transparent",
  border: "none",
  padding: "10px 20px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "1em",
  color: "#333",
  transition: "color 0.3s ease, background-color 0.3s ease",
};

const activeTabStyles = {
  fontWeight: "600",
  color: "#fff",
  backgroundColor: "var(--primary)",
  borderRadius: "4px",
};

const contentStyles = {
  padding: "20px",
  backgroundColor: "#fff",
  boxShadow: "2px 2px 5px rgba(0,0,0,0.05)",
  borderRadius: "4px",
  marginTop: "20px",
};

export default MenuTabs;
