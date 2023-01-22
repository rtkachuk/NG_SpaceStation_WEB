# New Generation Space Station source code
  
Current project bases on python backend with microservices architecture. Main target for a game - repair space station, which for now in a pretty bad condition. Regular player can be anyone he actually want - mechanic, medic, pilot, janitor, electric, or any other role. Repair station with only one pair of hands actually impossible, but you can design your own space station just by building map and fill items in lists.  
  
Before starting server, change value of SERVICE_ADDR environment variable to server public ip or domain name. This will fix websocket js scripts for connecting to services. 

To start work, I would rather suggest run docker-compose:  
```
docker-compose up -d
```  
  
That's All!
