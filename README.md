# Retron

This is a web application used for running remote 
Retrospectives.

## Build

```
./gradlew build
docker build -t retron:latest .
```

## Deploy

On build machine
```
docker save -o images.tar retron:latest
```

Copy the images to the deployment machine
```
scp images.tar <deployment_machine>:~/images.tar
```

On deployment machine
```
docker load -i images.tar
```

Port 80 must be open on deployment machine

## Run

On deployment machine
```
docker run -p 80:8080 retron:latest
```