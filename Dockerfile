FROM node:20-bookworm
RUN npx -y playwright@1.51.1 install --with-deps

ENV CI=true
WORKDIR /home/node
COPY . /home/node

RUN npm install
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT '/home/node/docker-entrypoint.sh'