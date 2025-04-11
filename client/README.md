### Gen ssl certs
```
choco install mkcert
mkcert --install
mkcert -key-file ./ssl/localhost-key.pem -cert-file ./ssl/localhost.pem localhost 127.0.0.1 ::1
```
```
npx compodoc -p tsconfig.doc.json -d docs -s 
npx compodoc -s -- запустить на http://localhost:8080/
```
