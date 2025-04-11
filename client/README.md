### Gen ssl certs
```
choco install mkcert
mkcert --install
mkcert -key-file ./ssl/localhost-key.pem -cert-file ./ssl/localhost.pem localhost 127.0.0.1 ::1
```
