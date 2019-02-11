#base image
FROM node:9.6.1

#set working directory
RUN mkdir /usr/src/apps
WORKDIR /usr/src/apps

#add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/apps/node_modules/.bin:$PATH

#install and cache app dependencies

COPY package.json /usr/src/apps/package.json
RUN npm install
#RUN npm install -g webpack-dev-server@3.1.9
RUN npm install -g @angular/cli@1.7.1

#add app
COPY . /usr/src/apps

#start app
CMD webpack-dev-server --host 0.0.0.0 --port 3535