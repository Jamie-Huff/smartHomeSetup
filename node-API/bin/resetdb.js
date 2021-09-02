require('dotenv').config();

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const { Client }= require('pg');

// PG connection setup
const connectionString = process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
const client = new Client({
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // database: process.env.DB_NAME
  connectionString
});

// Loads the schema files from db/schema
const runSchemaFiles = async function () {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync('./db/schema');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await client.query(sql).catch(console.log)
  }
};

const runSeedFiles = async function () {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const schemaFilenames = fs.readdirSync('./db/seeds');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await client.query(sql).catch(console.log)
  }
};

try {
  console.log(`-> Connecting to PG using ${connectionString} ...`);
  client.connect()
  .then( async () => {
    await runSchemaFiles();
    await runSeedFiles();
    client.end(); 
  })
} catch (err) {
  console.error(chalk.red(`Failed due to error: ${err}`));
  client.end();
}
