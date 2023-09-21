# ------------------------- PRODUCTION -------------------------
# start docker compose on dev version
docker-prod:
	docker-compose up -d -f docker-compose.prod.yml --name NoteoProd

# stop docker compose on dev version
stop-docker-prod:
	docker-compose down



# ------------------------- DEVELOPMENT -------------------------
# start docker compose on dev version
start-dev:
	docker compose -f docker-compose.dev.yml up -d 

# stop docker compose on dev version
stop-dev:
	docker compose down

# start only client
start-c:
	cd client && yarn run start