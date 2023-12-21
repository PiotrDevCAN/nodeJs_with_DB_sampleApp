docker build . -t UK_BI_App_2
docker run -p 8087:8080 -d UK_BI_App_2