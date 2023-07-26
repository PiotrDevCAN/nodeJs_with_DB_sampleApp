docker build . -t cdi-scheduler
docker run -p 8087:8080 -d cdi-scheduler