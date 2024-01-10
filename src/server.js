const PROTO_PATH = __dirname + './../protos/user.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

//services
const userService = require('./services/user.js');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const user = protoDescriptor.user;

const main = () => {
  const server = new grpc.Server();

  // add service
  server.addService(user.UserService.service, {
    getUser: userService.getUser,
    createUser: userService.createUser,
    splitCharacters: userService.splitCharacters,
    splitCharactersStream: userService.SplitCharactersStream
  });

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log(`user service started at 0.0.0.0:50051...`);
    server.start();
  });
}

main();