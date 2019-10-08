.PHONY: build
build: gocronx node

.PHONY: build-race
build-race: enable-race build

.PHONY: run
run: build kill
	./bin/gocronx-node &
	./bin/gocronx web -e dev

.PHONY: run-race
run-race: enable-race run

.PHONY: kill
kill:
	-killall gocronx-node

.PHONY: gocronx
gocronx:
	go build $(RACE) -o bin/gocronx ./cmd/gocronx

.PHONY: node
node:
	go build $(RACE) -o bin/gocronx-node ./cmd/node

.PHONY: test
test:
	go test $(RACE) ./...

.PHONY: test-race
test-race: enable-race test

.PHONY: enable-race
enable-race:
	$(eval RACE = -race)

.PHONY: package
package: build-vue statik
	bash ./package.sh

.PHONY: package-all
package-all: build-vue statik
	bash ./package.sh -p 'linux darwin windows'

.PHONY: build-vue
build-vue:
	cd web/vue && yarn run build
	cp -r web/vue/dist/* web/public/

.PHONY: install-vue
install-vue:
	cd web/vue && yarn install

.PHONY: run-vue
run-vue:
	cd web/vue && yarn run dev

.PHONY: statik
statik:
	go get github.com/rakyll/statik
	go generate ./...

.PHONY: clean
clean:
	rm bin/gocronx
	rm bin/gocronx-node
