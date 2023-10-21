# ------------------------- PRODUCTION -------------------------
# start docker compose on dev version
docker-prod:
	docker-compose up -d -f docker-compose.prod.yml --name NoteoProd

# stop docker compose on dev version
stop-docker-prod:
	docker-compose down

# build images for docker compose
build-prod:
	docker compose -f docker-compose.prod.yml build

# ------------------------- DEVELOPMENT -------------------------
# start docker compose on dev version
start-dev:
	docker compose -f docker-compose.dev.yml up -d && docker compose -f docker-compose.dev.yml logs -tf

# build images for docker compose
start-dev-b:
	docker compose -f docker-compose.dev.yml build
	
# stop docker compose on dev version
stop-dev:
	docker compose -f docker-compose.dev.yml down

# start only client dev
start-c:
	cd client && npm run start

# start only backend dev
start-b:
	cd backend && npm run dev
