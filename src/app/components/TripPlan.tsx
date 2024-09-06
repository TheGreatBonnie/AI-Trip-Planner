"use client"; // Indicates that this file is a client-side file in a Next.js app

import Link from "next/link"; // Importing Link component from Next.js for navigation
import React, { useState } from "react"; // Importing React and useState hook
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

// Define the structure of a Todo item with an interface
interface Todo {
  time: string;
  activity: string;
  details: string;
}

// Define the TripPlan component
function TripPlan() {
  // Declare a state variable 'tripPlan' to store an array of Todo items, initialized as an empty array
  const [tripPlan, setTripPlan] = useState<Todo[]>([]);

  useCopilotReadable({
    description: "The user's trip plan.",
    value: tripPlan,
  });

  // Use the useCopilotAction hook to define a new action
  useCopilotAction(
    {
      name: "createTripPlan", // Name of the action

      description: "Create a trip plan following a day schedule format.", // Description of the action

      parameters: [
        {
          name: "TripDaySchedule", // Name of the parameter
          type: "object[]", // Type of the parameter (array of objects)
          description: "The schedule for the day trip.", // Description of the parameter

          attributes: [
            {
              name: "time", // Name of the attribute
              type: "string", // Type of the attribute
              description: "The time of the trip day activity.", // Description of the attribute
            },
            {
              name: "activity", // Name of the attribute
              type: "string", // Type of the attribute
              description:
                "The activity to be done in a specific time of the trip day.", // Description of the attribute
            },
            {
              name: "details", // Name of the attribute
              type: "string", // Type of the attribute
              description: "The details for each activity.", // Description of the attribute
            },
          ],
          required: true, // Indicates that this parameter is required
        },
      ],

      // Handler function that sets the trip plan using the TripDaySchedule parameter
      handler: async ({ TripDaySchedule }) => {
        setTripPlan(TripDaySchedule);
      },

      render: "Creating Your Trip...", // Message to display while the action is being processed
    },
    [] // Dependency array (empty in this case)
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Header section */}
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-white dark:bg-gray-900">
        {/* Link component for navigation */}
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          prefetch={false}>
          <span className="sr-only text-gray-500">Trip Plan Dashboard</span>
          <h1>AI Trip Plan Generator</h1>
        </Link>
      </header>

      {/* Main content section */}
      <main className="flex-1 p-4 md:p-8 lg:p-10">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Trip Plan Schedule</h1>
          <div className="overflow-x-auto">
            {/* Table for displaying the trip plan schedule */}
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Time</th>
                  <th className="px-4 py-2 border-b">Activity</th>
                  <th className="px-4 py-2 border-b">Details</th>
                </tr>
              </thead>
              <tbody>
                {/* Map over the tripPlan state to display each item in the table */}
                {tripPlan.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="px-4 py-2 border-b">{item.time}</td>
                    <td className="px-4 py-2 border-b">{item.activity}</td>
                    <td className="px-4 py-2 border-b">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TripPlan; // Export the TripPlan component as the default export
