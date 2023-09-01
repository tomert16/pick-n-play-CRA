# Frontend portion of the Pick n Play App:
# Created With: 
+ React
+ Redux/Redux toolkit
+ Styled Components
+ Axios
# Backend portion of the Pick n Play App
# Created with:
+ Ruby on Rails
+ SQLite3

### Pre-requisites:
#### If running with Docker, make sure to have it installed.
#### If running locally:
- Make sure you have Ruby installed.
- If you do not, install Ruby in your terminal from the official Ruby documentation.
- Be sure to install version 2.7.4. 
# To start:
- Fork and clone the application
## Once forked and cloned:
### Docker:
- Change the proxy in pacakge.json in client folder to: http://pnp_server:3000
- run `docker compose up -d --build` in the terminal
- Once all container are up and running, run `docker compose run server rails db:create db:migrate db:seed` in the terminal
- In the browser go to localhost:8080.
### Running Locally:
- Change the proxy in pacakge.json in client folder to: http://localhost:3000
- Frontend: navigate to the frontend directory with `cd client`
- Open another tab in the terminal
- Backend: navigate to the backend directory with `cd server`
- Install all dependencies with `npm install` on the Frontend and `bundle install` on the Backend.
- Create the database using `rails db:create`, in the backend directory.
- Run commands `rails db:migrate` & `rails db:seed` to migrate and seed the database once in the server backend directory.

- Start the backend server by running the command `rails s` <br/>
- Start the frontend server by running the command `npm start`
