# New Generation Space Station source code
  
Current project bases on python backend with microservices architecture. Main target for a game - repair space station, which for now in a pretty bad condition. Regular player can be anyone he actually want - mechanic, medic, pilot, janitor, electric, or any other role. Repair station with only one pair of hands actually impossible, but you can design your own space station just by building map and fill items in lists.  
  
To start work, I would rather suggest run two docker containers:  
```
docker run --name some-nginx -p 8080:80 -v $PWD:/usr/share/nginx/html:ro -d nginx  
docker run --name redis -p 127.0.0.1:6379:6379 redis  
```