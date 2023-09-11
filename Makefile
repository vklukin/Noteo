# ------------------------- PRODUCTION -------------------------
#build docker image
build:
	docker build -t moratoriums_prod -f Dockerfile_prod .

#starting docker container without remove container at the end
run:
	docker run --name MoratoriumsContainer -d -p 3010:3000 moratoriums_prod

#starting docker container with remove container at the end
run-wrm:
	docker run --name MoratoriumsContainer --rm -d -p 3010:3000 moratoriums_prod

#starting docker container without remove container at the end for windows
run-win:
	docker run --name MoratoriumsContainer --rm -d -p 3010:3000 moratoriums_prod

#starting docker container with remove container at the end for windows
run-win-wrm:
	docker run --name MoratoriumsContainer --rm -p 3010:3000 moratoriums_prod

#stop docker container
stop:
	docker stop MoratoriumsContainer

#remove image
rm:
	docker image rm moratoriums_prod



# ------------------------- DEVELOPMENT -------------------------
# starting prettier
pretty:
	yarn run prettier

# starting linter
lint:
	yarn run lint

# make pretty and lint
ppo:
	yarn run pretty && yarn run lint
