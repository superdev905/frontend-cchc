#/bin/bash!
docker context use default
docker-compose --file docker-compose.image.yml up --build
docker tag frontend-cchc_frontend cchcprod.azurecr.io/frontend-cchc-prod:latest
docker push cchcprod.azurecr.io/frontend-cchc-prod:latest
#az acr login --name  cchcprod
docker context use azureprod
docker compose --file docker-compose.prod.yml up --build
