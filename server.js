const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'protos/greet.proto');

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Load the package
const greetProto = grpc.loadPackageDefinition(packageDefinition);

// Define the SayHello implementation
const sayHello = (call, callback) => {
  const name = call.request.name;
  const message = `Hello, ${name}!`;
  callback(null, { message });
};

// Create the server
const server = new grpc.Server();

// Add the Greeter service
server.addService(greetProto.greet.Greeter.service, {
  SayHello: sayHello
});

// Bind to address
const address = '0.0.0.0:50051';
server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  server.start();
  console.log(`Server running at ${address}`);
});
