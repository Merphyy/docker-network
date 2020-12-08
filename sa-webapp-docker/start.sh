#!/bin/bash

mvn install
docker build -f Dockerfile -t merphylau/sa-web-app .
docker push merphylau/sa-web-app