FROM node:14
EXPOSE 3000

COPY . /boxui/
WORKDIR /boxui/

RUN npm install --silent
ENV PATH /boxapi/node_modules/.bin:$PATH

CMD ["npm","start"]