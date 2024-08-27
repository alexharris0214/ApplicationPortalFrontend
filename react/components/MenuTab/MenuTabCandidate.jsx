import React, { useState } from "react";
import JobFeed from "../FeedCard/JobFeed"; 
import JobsApplied from "../CandidateMenuTabs/JobsApplied"; 
import JobsSelected from "../CandidateMenuTabs/JobsSelected"; 

const MenuTabCandidate = () => {
  const [activeTab, setActiveTab] = useState("jobFeed");

  const renderTabContent = () => {
    switch (activeTab) {
      case "jobFeed":
        return <JobFeed />;
      case "jobsApplied":
        return <JobsApplied />;
      case "jobsSelected":
        return <JobsSelected />;
      default:
        return <JobFeed />;
    }
  };

  return (
    <div>
      <div style={tabStyles}>
        <button onClick={() => setActiveTab("jobFeed")} style={activeTab === "jobFeed" ? activeTabStyles : {}}>
          Job Feed
        </button>
        <button onClick={() => setActiveTab("jobsApplied")} style={activeTab === "jobsApplied" ? activeTabStyles : {}}>
          Jobs Applied
        </button>
        <button onClick={() => setActiveTab("jobsSelected")} style={activeTab === "jobsSelected" ? activeTabStyles : {}}>
          Jobs Selected
        </button>
      </div>
      <div style={contentStyles}>{renderTabContent()}</div>
    </div>
  );
};

const tabStyles = {
  display: "flex",
  justifyContent: "space-around",
  padding: "10px",
  backgroundColor: "#f1f1f1",
  borderBottom: "2px solid #ccc",
};

const activeTabStyles = {
  fontWeight: "bold",
  color: "#1aac83",
  backgroundColor: "#fff",
  borderRadius: "4px",
  padding: "10px 20px",
};

const contentStyles = {
  padding: "20px",
  backgroundColor: "#fff",
};

export default MenuTabCandidate;
