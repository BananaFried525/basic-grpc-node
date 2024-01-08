exports.getUser = (call, callback) => {
  const user = {
    id: 1,
    name: 'John'
  };

  callback(null, user);
}
