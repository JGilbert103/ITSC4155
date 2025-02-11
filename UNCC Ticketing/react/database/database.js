import { createConnection } from 'mysql';

var con = createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});