/**
 * Monad MCP Tutorial
 * 
 * This file demonstrates how to create a Model Context Protocol (MCP) server
 * that interacts with the Monad blockchain testnet to check MON balances.
 */

// Import necessary dependencies
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { createPublicClient, formatUnits, http } from "viem";
import { monadTestnet } from "viem/chains";


// Create a public client to interact with the Monad testnet
const publicClient = createPublicClient({
    chain: monadTestnet,
    transport: http(),
});



// Initialize the MCP server with a name, version, and capabilities
const server = new McpServer({
    name: "monad-testnet",
    version: "0.0.1",
    // Array of supported tool names that clients can call
    capabilities: ["get-mon-balance", "get-txns", "get-latest-block"]
});



// Define a tool that gets the MON balance for a given address
server.tool(
    // Tool ID 
    "get-mon-balance",
    // Description of what the tool does
    "Get MON balance for an address on Monad testnet",
    // Input schema
    {
        address: z.string().describe("Monad testnet address to check balance for"),
    },
    // Tool implementation
    async ({ address }) => {
        try {
            // Check MON balance for the input address
            const balance = await publicClient.getBalance({
                address: address as `0x${string}`,
            });

            // Return a human friendly message indicating the balance.
            return {
                content: [
                    {
                        type: "text",
                        text: `Balance for ${address}: ${formatUnits(balance, 18)} MON`,
                    },
                ],
            };
        } catch (error) {
            // If the balance check process fails, return a graceful message back to the MCP client indicating a failure.
            return {
                content: [
                    {
                        type: "text",
                        text: `Failed to retrieve balance for address: ${address}. Error: ${
                        error instanceof Error ? error.message : String(error)
                        }`,
                    },
                ],
            };
        }
    }
);



server.tool(
    // Tool ID 
    "get-latest-block",
    // Description of what the tool does
    "Get the latest block on Monad testnet",
    // Input schema - none
    
    // Tool implementation
    async () => {
        try {
            // Check MON balance for the input address
            const blockNumber = await publicClient.getBlockNumber()

            // Return a human friendly message indicating the balance.
            return {
                content: [
                    {
                        type: "text",
                        text: `The latest block on Monad is block ${blockNumber}`,
                    },
                ],
            };
        } catch (error) {
            // If the balance check process fails, return a graceful message back to the MCP client indicating a failure.
            return {
                content: [
                    {
                        type: "text",
                        text: `Failed to retrieve latest block number on Monad. Error: ${
                        error instanceof Error ? error.message : String(error)
                        }`,
                    },
                ],
            };
        }
    }
);



server.tool(
    // Tool ID 
    "get-txns",
    // Description of what the tool does
    "Get transaction count for an address on Monad testnet",
    // Input schema
    {
        address: z.string().describe("Monad testnet address to check txn count for"),
    },
    // Tool implementation
    async ({ address }) => {
        try {
            // Check txn count for the input address
            const txns = await publicClient.getTransactionCount({
                address: address as `0x${string}`,
            });

            // Return a human friendly message indicating the balance.
            return {
                content: [
                    {
                        type: "text",
                        text: `Total transactions for ${address}: ${txns}`,
                    },
                ],
            };
        } catch (error) {
            // If the txn count check process fails, return a graceful message back to the MCP client indicating a failure.
            return {
                content: [
                    {
                        type: "text",
                        text: `Failed to retrieve txn count for address: ${address}. Error: ${
                        error instanceof Error ? error.message : String(error)
                        }`,
                    },
                ],
            };
        }
    }
);

/**
 * Main function to start the MCP server
 * Uses stdio for communication with LLM clients
 */
async function main() {
    // Create a transport layer using standard input/output
    const transport = new StdioServerTransport();
    
    // Connect the server to the transport
    await server.connect(transport);
    
    console.error("Monad testnet MCP Server running on stdio");
}

// Start the server and handle any fatal errors
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
