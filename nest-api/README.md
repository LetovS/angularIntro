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