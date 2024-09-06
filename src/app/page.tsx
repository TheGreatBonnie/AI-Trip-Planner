import TripPlan from "./components/TripPlan";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

// Export the Home component as the default export
export default function Home() {
  return (
    // CopilotKit component with a runtimeUrl prop pointing to the API endpoint
    <CopilotKit runtimeUrl="/api/copilotkit">
      {/* CopilotSidebar component to provide instructions and UI for creating a trip plan */}
      <CopilotSidebar
        instructions={
          "Help the user create a trip plan. Don't add the trip plan to the response."
        } // Instructions for the copilot
        labels={{
          initial:
            "Welcome to the Trip Plan app! Describe the trip you want below.",
        }} // Labels for the copilot UI
        defaultOpen={true} // Sidebar is open by default
        clickOutsideToClose={false} // Clicking outside the sidebar does not close it
      >
        {/* Render the TripPlan component inside the CopilotSidebar */}
        <TripPlan />
      </CopilotSidebar>
    </CopilotKit>
  );
}
