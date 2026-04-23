# gRPC Node.js Starter

A lightweight Hello World project demonstrating gRPC implementation in Node.js.

## Overview

This project showcases a simple gRPC service with a client and server implementation. The `Greeter` service accepts a name and returns a personalized greeting message.

## Project Structure

```
.
├── client.js           # gRPC client implementation
├── server.js           # gRPC server implementation
├── package.json        # Project dependencies and scripts
├── protos/
│   └── greet.proto     # Protocol buffer definitions
└── README.md           # This file
```

## Protocol Definition

The service is defined in `protos/greet.proto`:

```protobuf
service Greeter {
  rpc SayHello (HelloRequest) returns (HelloResponse) {}
}

message HelloRequest {
  string name = 1;
}

message HelloResponse {
  string message = 1;
}
```

## Prerequisites

- Node.js 12 or higher
- npm or yarn

## Installation

1. Clone or download the project
2. Install dependencies:

```bash
npm install
```

## Running the Project

### Start the Server

In one terminal, run:

```bash
npm run server
```

You should see:
```
Server running at 0.0.0.0:50051
```

### Run the Client

In another terminal, run:

```bash
npm run client
```

You should see:
```
Response: Hello, World!
```

## Dependencies

- **@grpc/grpc-js** (^1.10.0) - gRPC implementation for Node.js
- **@grpc/proto-loader** (^0.7.12) - Protocol buffer loader for Node.js

## How It Works

### Server (`server.js`)

1. Loads the Protocol Buffer definition from `greet.proto`
2. Defines the `SayHello` RPC handler that returns a greeting message
3. Binds the server to port 50051 with insecure credentials

### Client (`client.js`)

1. Loads the Protocol Buffer definition from `greet.proto`
2. Creates a client connection to the server at `localhost:50051`
3. Calls the `SayHello` RPC with the name "World"
4. Prints the response from the server

## Customization

To modify the greeting:
- Edit the `sayHello` function in `server.js` to change the response format
- Edit the `request` object in `client.js` to change the input name
- Add new RPC methods by updating `protos/greet.proto` and implementing them in the server

## License

ISC
