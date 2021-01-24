# Docker sonarqube


1. Descargar

```
docker pull sonarqube
```

2. Crear contenedor

```
  docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube
```

3. Logearse al sonarqube
localhost:9000 
usuario: admin
pass: admin
