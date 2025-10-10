#!/bin/sh

# ------------------------------
SERVER_ADDRESS=root@124.220.64.70
DEPLOY_DIR_PATH=/webserver/toothpick-server
# ------------------------------

# 清空 dist
npm run clean
# 安装依赖
npm install

# 打包
npm run build

# 部署
ssh $SERVER_ADDRESS "mkdir -p $DEPLOY_DIR_PATH"
scp -r ./dist/ package.json package-lock.json .npmrc $SERVER_ADDRESS:$DEPLOY_DIR_PATH
ssh $SERVER_ADDRESS "cd $DEPLOY_DIR_PATH && npm install"

ssh $SERVER_ADDRESS "cd $DEPLOY_DIR_PATH && npm run start"
