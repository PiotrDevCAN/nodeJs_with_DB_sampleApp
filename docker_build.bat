docker build -t cdi-scheduler --no-cache  --progress=plain  . 2> build.log
docker run -dit -p 8085:8080  --name cdi-scheduler -v C:/CETAapps/CDI-SCHEDULER:/var/www/html --env-file C:/CETAapps/CDI-SCHEDULER/dev_env.list cdi-scheduler
