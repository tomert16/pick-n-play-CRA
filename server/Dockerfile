# start from the base
FROM ruby:2.7.4
# RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
# set a directory for the app
WORKDIR /server

#copy all the files to the container
COPY . . 
COPY Gemfile /server/Gemfile
COPY Gemfile.lock /server/Gemfile.lock

# install ruby gems
RUN bundle install 
# RUN rm -rf /use/local/bundle/cache

# add a script to be executed when the container starts
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT [ "entrypoint.sh" ]

# export port
EXPOSE 3000

# start app
CMD ["rails", "s", "-b", "0.0.0.0"]