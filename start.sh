#!/bin/bash
exec node --experimental-webstorage --localstorage-file=./.node-local-storage/.local-storage --no-warnings ./node_modules/.bin/react-scripts start

