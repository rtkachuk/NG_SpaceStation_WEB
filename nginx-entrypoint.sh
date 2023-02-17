#!/bin/bash
echo "let serviceAddress = \"$SERVICE_ADDR\"" > /usr/share/nginx/html/js/globalVar.js
nginx -g 'daemon off;'
