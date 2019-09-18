.PHONY: up start build

up:
	make build && make start

start:
	npm run le

build:
	npm run build