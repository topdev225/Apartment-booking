## Node Restful API
### Set up develop environment.
```
npm install -g sequelize-cli
// Check the version
sequelize --version
npm --version
node --version

// Dependencies install
npm install

// Migrate the database
sequelize db:migrate
// Seed the initial data.
sequelize db:seed:all

// Execute the server
npm start
```