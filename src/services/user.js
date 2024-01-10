exports.getUser = (call, callback) => {
  const user = {
    id: 1,
    name: 'John'
  };

  callback(null, user);
}

exports.createUser = (call, callback) => {
  const users = []
  try {
    call.on('data', (user) => {
      users.push(user)
    });

    call.on('end', () => {
      console.log(users)
      callback(null, { users });
    });

  } catch (err) {
    console.log(`createUser error: ${err.message}`);
    callback(err, null);
  }
}

exports.splitCharacters = (call, callback) => {
  try {
    const name = call.request.name;
    const characters = name.split('');

    for (let i = 0; i < characters.length; i++) {
      call.write({ char: characters[i] });
    }

    call.end();
  } catch (err) {
    console.log(`splitCharacters error: ${err.message}`);
    call.error(err, null);
  }
}

exports.SplitCharactersStream = (call) => {
  try {
    call.on('data', (request) => {
      const name = request.name;
      const characters = name.split('');

      for (let i = 0; i < characters.length; i++) {
        call.write({ char: characters[i] });
      }
    });

    call.on('end', () => {
      call.end();
    })
  } catch (err) {
    console.log(`SplitCharactersStream error: ${err.message}`);
    call.error(err);
  }
}