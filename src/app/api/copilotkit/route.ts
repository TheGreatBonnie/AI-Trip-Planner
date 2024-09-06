// Import the researchWithLangGraph function from the research module
import { researchWithLangGraph } from "./research";
// Import the Action type from the @copilotkit/shared package
import { Action } from "@copilotkit/shared";
// Import the NextRequest type from the next/server module
import { NextRequest } from "next/server";
// Import required modules and classes from the @copilotkit/runtime package
import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  OpenAIAdapter,
} from "@copilotkit/runtime";

// Define the researchAction object with type Action<any>
const researchAction: Action<any> = {
  name: "research", // Name of the action
  description:
    "Call this function to conduct research on a certain topic. Respect other notes about when to call this function", // Description of the action
  parameters: [
    {
      name: "topic", // Name of the parameter
      type: "string", // Type of the parameter, which is a string
      description: "The topic to research. 5 characters or longer.", // Description of the parameter
    },
  ],
  // Define the handler function for the action, which is asynchronous
  handler: async ({ topic }) => {
    console.log("Researching topic: ", topic); // Log the topic being researched
    return await researchWithLangGraph(topic); // Call the researchWithLangGraph function with the topic and return the result
  },
};

// Define the POST function to handle POST requests
export const POST = async (req: NextRequest) => {
  const actions: Action<any>[] = []; // Initialize an empty array to hold actions

  // Check if the TAVILY_API_KEY environment variable is set and not equal to "NONE"
  if (
    process.env["TAVILY_API_KEY"] &&
    process.env["TAVILY_API_KEY"] !== "NONE"
  ) {
    actions.push(researchAction); // Add the researchAction to the actions array
  }

  const openaiModel = process.env["OPENAI_MODEL"]; // Get the OpenAI model from the environment variable

  // Destructure the handleRequest function from the copilotRuntimeNextJSAppRouterEndpoint function
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: new CopilotRuntime({ actions }), // Create a new CopilotRuntime instance with the actions
    serviceAdapter: new OpenAIAdapter({ model: openaiModel }), // Create a new OpenAIAdapter instance with the model
    endpoint: req.nextUrl.pathname, // Set the endpoint to the current request URL path
  });

  return handleRequest(req); // Call the handleRequest function with the request and return the result
};
