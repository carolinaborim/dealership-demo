# Pull base image.
FROM node:4

ADD . /data
  
RUN \
  cd /data && \
  npm install && \
  npm install -g grunt-cli bower && \
  npm install -g grunt@0.4.0rc7 && \
  apt-get update && \
  apt-get install -y ruby2.1-dev build-essential gem rubygems && \
  gem install compass && \
  echo '{ "allow_root": true }' > .bowerrc && \
  bower install

# Define working directory.
WORKDIR /data

# Define default command.
CMD ["grunt", "serve"]