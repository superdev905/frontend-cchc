#/bin/bash!
docker context use default
docker-compose --file docker-compose.test.yml up --build
docker tag frontend-cchc_frontend-test cchcdev.azurecr.io/frontend-cchc:latest
docker push cchcdev.azurecr.io/frontend-cchc:latest
docker context use azuretest1
docker compose --file docker-compose.azure.yml up --build