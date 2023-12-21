docker build -t uk_bi_app_2 --no-cache  --progress=plain  . 2> build.log
docker run -dit -p 8092:8080  --name uk_bi_app_2 -v C:/CETAapps/UK_BI_apps/App_2:/var/www/html --env-file C:/CETAapps/UK_BI_apps/App_2/dev_env.list uk_bi_app_2
