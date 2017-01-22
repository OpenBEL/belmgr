# Run make help to find out what the commands are

define deploy_commands
	# Build Webeditor and Plugin
	cd webeditor && gulp build

	# Deploy plugin to NPM
	cd plugin && npm publish
	@echo Publishing npm from $(shell pwd)

	# Build and Deploy Webeditor docker image
	mkdir -p deploy/webeditor

	cp -r webeditor/keycloak.json webeditor/index.html webeditor/styles webeditor/media webeditor/config.js webeditor/favicon.ico deploy/webeditor
	cp -r webeditor/dist webeditor/jspm_packages deploy/webeditor

	@echo Building docker image in `pwd`
	docker build -t openbel/belmgr:latest -t openbel/belmgr:`cat VERSION` ./deploy

	@echo New version is `cat VERSION`
	docker push openbel/belmgr:`cat VERSION`
	docker push openbel/belmgr:latest

	git push
	git push --tags
endef



.PHONY: deploy-major
deploy-major:
	@echo Deploying major update
	bumpversion major
	@${deploy_commands}

.PHONY: deploy-minor
deploy-minor:
	@echo Deploying minor update
	bumpversion minor
	@${deploy_commands}

.PHONY: deploy-patch
deploy-patch:
	@echo Deploying patch update
	bumpversion --allow-dirty patch
	${deploy_commands}



.PHONY: list  # ensures list is mis-identified with a file of the same name
list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'


.PHONY: help
help:
	@echo "List of commands"
	@echo "   deploy-{major|minor|patch} -- Deploy belmgr-plugin to npm and "
	@echo "      webeditor docker image to dockerhub"
	@echo "   help -- This listing "
	@echo "   list -- Automated listing of all targets"

.PHONY: check
check:
	@echo $(HOME)
	@echo $(gulp)
	@echo $(docker)
	@echo `cat VERSION`
	cd webeditor && echo `pwd`

