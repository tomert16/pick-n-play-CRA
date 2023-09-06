# Frontend portion of the Pick n Play App:
## Created With: 
+ React
+ Redux/Redux toolkit
+ Styled Components
+ Axios
# Backend portion of the Pick n Play App
## Created with:
+ Ruby on Rails
+ PostgreSQL

# Pre-requisites:
### If running with Docker, make sure to have it installed.
### If running locally:
- Make sure you have Ruby installed.
- If you do not, install Ruby in your terminal from the official Ruby documentation.
- Be sure to install version 2.7.4. 
# To start:
- Fork and clone the application
## Once forked and cloned:
### Docker:
#### Set up Environment Variables:
- Create a copy of the sample.env file and name it .env
- In the root directory in your terminal run `cp -p ./sample.env ./.env`
##### Once the .env file has been created
- run `docker compose up -d --build` in the terminal
- Once all containers are up and running, run `docker compose run server rails db:create db:migrate db:seed` in the terminal
- In the browser go to localhost:8080.
### Running Locally:
#### Set up Environment Variables:
- Create copies of the sample.env files found in both the client and server directory.
- Server: In your terminal run `cp -p ./server/sample.env ./server/.env`
- Client: In your terminal run `cp -p ./client/sample.env ./client/.env`
##### Once the .env file has been created
- Frontend: navigate to the frontend directory with `cd client`
- Open another tab in the terminal
- Backend: navigate to the backend directory with `cd server`
- Install all dependencies with `npm install` on the Frontend and `bundle install` on the Backend.
- Create the database using `rails db:create`, in the backend directory.
- Run commands `rails db:migrate` & `rails db:seed` to migrate and seed the database once in the server backend directory.

- Start the backend server by running the command `rails s` <br/>
- Start the frontend server by running the command `npm start`
