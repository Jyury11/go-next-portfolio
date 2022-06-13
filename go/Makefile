.PHONY: help
help: ## help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: env
env: ## go env
	go env

.PHONY: test
test: ## go test ./...
	GO_ENV=test go test -tags=unit ./...

.PHONY: test-%
test-%: ## go test $(@:go_test-%=%)/...
	GO_ENV=test go test -tags=unit ./$(@:go_test-%=%)/...

.PHONY: clean
clean: ## go clean -testcache
	go clean -testcache

.PHONY: cover
cover: ## go test -tags=unit -coverprofile=./docs/test/coverage.out ./...
	GO_ENV=test go test -tags=unit -coverprofile=./docs/test/coverage.out ./...
	go tool cover -html=./docs/test/coverage.out -o ./docs/test/coverage.html

.PHONY: bench
bench: ## go test -tags=unit -bench=. -benchmem ./...
	go test -tags=unit -bench=. -benchmem ./...
	@echo '実行回数 実行時間(ns/op) メモリ割当容量(B/op) メモリ割当回数(allocs/op)'

.PHONY: doc
doc: ## godoc -http=:43434
	@echo http://localhost:43434/pkg/github.com/Jyury11/go-next-portfolio/?m=all
	godoc -http=:43434

.PHONY: lint
lint: ## golangci-lint run
	golangci-lint run

.PHONY: up
up: # gocker-compose -f build/docker-compose.yml up
	@docker-compose -f build/docker-compose.yml up

.PHONY: reup
reup: # gocker-compose -f build/docker-compose.yml up
	@docker-compose -f build/docker-compose.yml up --build

.PHONY: down
down: # gocker-compose -f build/docker-compose.yml up
	@docker-compose -f build/docker-compose.yml down

.PHONY: deply
deploy: # git push heroku main
	git push heroku master

.PHONY: rm
rm: # docker ps -a | grep build_db | awk '{ print $1 }' | xargs docker rm
	docker ps -a | grep build_db | awk '{ print $1 }' | xargs docker rm
