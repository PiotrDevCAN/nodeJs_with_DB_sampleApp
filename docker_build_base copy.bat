docker build . -t cdi-scheduler-base
docker run -d cdi-scheduler-base -p 8087:8080 
@REM docker run -dit -p 8087:8080  --name cdi-scheduler-base -v C:/CETAapps/CDI-SCHEDULER:/var/www/html --env-file C:/CETAapps/CDI-SCHEDULER/dev_env.list cdi-scheduler-base