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

```
choco install mkcert
mkcert --install
mkcert -key-file ./ssl/localhost-key.pem -cert-file ./ssl/localhost.pem localhost 127.0.0.1 ::1
```