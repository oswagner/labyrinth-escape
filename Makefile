.PHONY: up start build

NPM ?= $(shell which npm)
YARN ?= $(shell which yarn)
PKG_MANAGER ?= $(if $(YARN),$(YARN),$(NPM))

up:
	make build && make start

start:
	@$(PKG_MANAGER) node ./dist/index.js

build:
	@$(PKG_MANAGER) tsc