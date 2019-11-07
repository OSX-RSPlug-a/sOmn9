# sOmn9

+ Tecnologias

  Esse projeto foi desenvolvido com as seguintes tecnologias:

    - Docker + docker-compose(.yaml);
    - Mongodb + mongo-express;
    - Node.js;
    - React;
    
    
+ Projeto

    Projeto Aircnc, dos aprendizados da semana OmniStack 9.0


Docker-composer script stack de BD para Aircnc development;

To init this project:

1 - Create the project folder;


2 - Create a tree folder for docker images storages:

- Docker
    - Volumes
      - MongoDB


3 - Run command:

        - docker-compose -f THENAME.yaml up -d

  So there are 3 containers on ports:

    localhost:9000 (Portainer a cli view to administrate your containers on browser);

    0.0.0.0:8081 (mongo-express server; For the cli admin your Schemas from moongoDb );

    0.0.0.0:27017 (MongoDB server);


4 - Run the commands on folder backend and frontend:    

      - npm i (to push and install all dependencies)

   On the backend folder:
   
      - npm run dev
      
   link: localhost:3333
   
    
   On the frontend folder:
   
      - npm start
      
  link: localhost:3000
  
