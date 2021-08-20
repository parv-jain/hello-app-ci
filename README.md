# hello-app-ci

## Installation:
- ```npm install```
- ```node index.js```

## Config
- make key changes, unleash api url and port in ```service/data.js```
- make poort specific changes in ```config/const.js```. Default port is 9002

## Sample Curl
- Feature not available for age >= 18
```
curl -X POST 'http://localhost:9002/info' -d '{"visitor_context": {"age": "19"}}' -H 'content-type: application/json'
```
- Feature available for age < 18
```
curl -X POST 'http://localhost:9002/info' -d '{"visitor_context": {"age": "15"}}' -H 'content-type: application/json'
```
