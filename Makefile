# ------------------------- PRODUCTION -------------------------
# start docker compose on dev version
docker-prod:
	docker-compose up -d -f docker-compose.prod.yml --name NoteoProd

# stop docker compose on dev version
stop-docker-prod:
	docker-compose down



# ------------------------- DEVELOPMENT -------------------------
# start prettier
pretty:
	yarn run prettier

# start linter
lint:
	yarn run lint

# make pretty and lint
ppo:
	yarn run pretty && yarn run lint

# start docker compose on dev version
docker-dev:
	docker-compose up -d -f docker-compose.dev.yml --name NoteoDev

# stop docker compose on dev version
stop-docker-dev:
	docker-compose down