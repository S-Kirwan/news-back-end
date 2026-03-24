# News back end

## Requirements 
This project requires PostgreSQL and node.
To get started run 'npm install'

You will also need .env files for both testing and development (.env.test and .env.development) \
The .env files will need to be in the following format: \
PGDATABASE=<your_database_name> \
PGUSER=<your_postgres_username> \
PGPASSWORD=<your_postgres_password> \
PGPORT=<your_postgres_port> (typically 5432) \
PGHOST=localhost

Once your .env files are set up, run 'npm run setup-dbs'
