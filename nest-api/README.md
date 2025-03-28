### kill procees
```
netstat -ano | findstr :3000
```
```
taskkill /PID {number} /F
```

### Docker
```
docker build -t nest-api .
```
```
docker run -d -p 3000:3000 --name nest-api --rm  nest-api
```

### open-api client
-скачиваем api-json в папку api-client
```
http://localhost:3000/api-json
```
```
cd api-client
```

- генерируем файлы
```
npx openapi-typescript-codegen --input ./api-json.json --output ./api-client --client axios --useOptions --useUnionTypes
```