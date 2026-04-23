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

// Create a client
const client = new greetProto.greet.Greeter('localhost:50051',
  grpc.credentials.createInsecure());

// Call the SayHello RPC
const request = { name: 'World' };

client.SayHello(request, (err, response) => {
  if (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
  console.log('Response:', response.message);
  process.exit(0);
});
