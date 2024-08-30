const bcrypt = require('bcryptjs');

const saltRounds = 10;
const password = '123456789'; // Replace with the password you used

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log(`Hashed password: ${hash}`);
});

