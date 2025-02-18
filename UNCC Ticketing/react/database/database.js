import mysql from 'mysql2';

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "tickets"
}).promise()


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

async function getTickets(){
  const results = await con.query("SELECT * FROM requests")
  return results
}

const tickets = await getTickets()
console.log(tickets)