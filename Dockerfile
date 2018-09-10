FROM openjdk:11-jre
COPY build/libs/retron-0.0.1-SNAPSHOT.jar /usr/retron/retron.jar

EXPOSE 8080:8080/tcp

WORKDIR /usr/retron

CMD ["java", "-jar", "retron.jar"]