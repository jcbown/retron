# Retron

This is a Retrospective Tool.

## Build

`./gradlew` build

`docker build -t retron:latest .`

## Deploy

`docker save -o images.tar retron:latest`

`docker load -i images.tar`

## Run
`docker run -p 80:8080 retron:latest`