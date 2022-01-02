rm -rf ./node_modules
pm2 stop bots
yarn install
yarn build
pm2 delete bots
pm2 start yarn --name api -- bots
