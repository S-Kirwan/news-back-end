# News back end

This project requires PostgreSQL and node.
To get started run 'npm install' and 'npm run setup-dbs'
It works using .env files to set up the environment for each database.

To run the tests, you need a .env.test file containing:
PGDATABASE=nc_news_test
PGUSER=<your_postgres_username>
PGPASSWORD=<your_postgres_password>
PGPORT=<your_postgres_port> (typically 5432)
PGHOST=localhost

And to run the seeding you need a .env.development file containing:
PGDATABASE=nc_news
PGUSER=<your_postgres_username>
PGPASSWORD=<your_postgres_password>
PGPORT=<your_postgres_port> (typically 5432)
PGHOST=localhost
