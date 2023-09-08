# start from base 
FROM node:18.16

# start up working directory
WORKDIR /client

# copy files to container 
COPY . . 

# copy package.json and package-lock.json files
COPY package.json .
COPY package-lock.json .

# install dependencies
RUN npm install --silent


# expose port 
EXPOSE 8080

# start app 
CMD ["npm", "start"]