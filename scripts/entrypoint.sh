#!/bin/sh
# POSIX complient

# Target file to replace values in
TARGET_FILE="/usr/share/nginx/html/main.*.js"

sed -i "s@<MY_NODE_NAME>@$MY_NODE_NAME@g" $TARGET_FILE
sed -i "s@<MY_POD_NAME>@$MY_POD_NAME@g" $TARGET_FILE
sed -i "s@<MY_POD_NAMESPACE>@$MY_POD_NAMESPACE@g" $TARGET_FILE
sed -i "s@<MY_POD_IP>@$MY_POD_IP@g" $TARGET_FILE
sed -i "s@<MY_POD_SERVICE_ACCOUNT>@$MY_POD_SERVICE_ACCOUNT@g" $TARGET_FILE

# Start NGINX
nginx -g "daemon off;"
