docker build . -t UK_BI_App_2-base
docker run -d UK_BI_App_2-base -p 8087:8080 
@REM docker run -dit -p 8087:8080  --name UK_BI_App_2-base -v C:/CETAapps/CDI-SCHEDULER:/var/www/html --env-file C:/CETAapps/CDI-SCHEDULER/dev_env.list cdi-scheduler-base