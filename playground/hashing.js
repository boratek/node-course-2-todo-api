const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

console.log('\n---------------- USE JSONWEBTOKEN -------------------- \n');

var data = {
  id: 10
};

var token = jwt.sign(data, '123abc');
console.log(`Encoded: ${token}`);

var decoded = jwt.verify(token, '123abc');
console.log('Decoded:', decoded);

// MAN IN THE MIDDLE
console.log('\n---------------- MAN IN THE MIDDLE -------------------- \n');
var message = 'I am user nr 3';
var hash = SHA256(message).toString();

console.log(message);;
console.log(hash);

var data = {
  id: 4
};

var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

console.log(`Before manipulate: ${token.hash}`);

// simulate man in the middle
token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

console.log(`After manipulate: ${token.hash}`);

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed');
}

// -------------------------- bcryptjs ---------------------------
console.log('\n--------------------------- BCRYPT --------------------------------\n');
var password = '123abc!';
console.log('password:', password);
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$OpAitxDlQOizo0wsMDuVs.3Ycy0wfho1FdfhDgUhz17BQqtdWODMC';
bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log('Result of comparing %s and %s: %s', password, hashedPassword, result);
});
