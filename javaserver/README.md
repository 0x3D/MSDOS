# Backend server for MSDOS booking application

This is a server built in java with Spring Boot.

It has several endpoints where it responds to GET/POST/DELETE requests. It then 
handles the requests with a Postgres database. 
A GET request runs a SELECT query to get items from the database. 
POST and DELETE updates database. 

This application uses [Maven](https://maven.apache.org/) so to run `mvn spring-boot:run` in a terminal.

Default the program uses the database 'msdos', username 'postgres', password 
'postgres' and port '8000' but this can be configured in 
[./src/main/resources/application.properties](src/main/resources/application.properties)