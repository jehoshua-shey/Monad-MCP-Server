# About this MCP Server

This project demonstrates how to create a MCP server that interacts with the Monad testnet. The MCP server provides tools for checking the mon balance of an address, the latest block number on the monad testnet, and the total transaction count of a monad address on the monad testnet.



## Prerequisites

- Node.js (v16 or later)
- `npm` or `yarn`
- Claude Desktop

## Getting Started

1. Clone this repository

```shell
git clone 
```

2. Install dependencies:

```
npm install
```

## Configuring the MCP server

Monad Testnet related configuration is already added to `index.ts` in the `src` folder.


### Build the project

```shell
npm run build
```

The server is now ready to use!

### Adding the MCP server to Claude Desktop

1. Open "Claude Desktop"


2. Open Settings

Claude > Settings > Developer


3. Open `claude_desktop_config.json` 


4. Add details about the MCP server and save the file.

```json
{
  "mcpServers": {
    ...
    "monad-mcp": {
      "command": "node",
      "args": [
        "/<path to the /build/index.js file for the server, on your device>"
      ]
    }
  }
}
```

5. Restart "Claude Desktop"


## How to use the server on Claude Desktop

1. Simply type in prompts asking for 'the MON balance of an address', 'the latest block on the Monad testnet', or 'the total transaction count for an address'.

2. Note that queries involving an address require that you provide Claude with the wallet address to query. The address must be a Monad address.