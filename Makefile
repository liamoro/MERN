run:
	docker run -dp 3000:3000 1b8b7e2c84d4
run-dev:
	docker run -d -p 3000:3000 -p 3001:3001  -v "/Users/lia/Documents/WEB_BANK/MERN:/app" --rm --name devtestC devtest
stop:
	docker stop c4bcd26692e4