#!/usr/bin/env bash

echo "Content-type: application/json"
echo
./pmacct -j -p /tmp/in.pipe
echo
echo
