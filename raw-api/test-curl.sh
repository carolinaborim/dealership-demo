#!/usr/bin/env bash

# $1 -> AgCommand2 username
# $2 -> AgCommand2 password
curl -X GET http://agco-fuse-trackers-dev.herokuapp.com/brands --user $1:$2
