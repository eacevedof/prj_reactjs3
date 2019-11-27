import express from 'express';
import jwt from 'express-jwt';
import cors from 'cors';
import jwks  from 'jwks-rsa';
import jwtAuthz from 'express-jwt-authz';
import bodyParser from 'body-parser';

// crear servidor
const app = express();

// configurar el servidor para json
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true } ));

app.use( cors() );

//  web token valido
const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://juandevwp.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://productos',
    issuer: "https://juandevwp.auth0.com/",
    algorithms: ['RS256']
});

// revisamos y validamos los scopes
const checkScopes = jwtAuthz(['read:productos']);

app.get('/productos', jwtCheck, checkScopes,  (req, res) => {
     let productos = [
          {
              "id" : 0,
              "nombre" : "HTML5",
              "precio" : 25,
              "imagen" : "camisa_1",
              "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
          },
          {
              "id" : 1,
              "nombre" : "CSS3",
              "precio" : 25,
              "imagen" : "camisa_2",
              "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
          },
          {
              "id" : 2,
              "nombre" : "NodeJS",
              "precio" : 30,
              "imagen" : "camisa_3",
              "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
          },
          {
              "id" : 3,
              "nombre" : "JavaScript",
              "precio" : 25,
              "imagen" : "camisa_4",
              "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
          },
          {
              "id" : 4,
              "nombre" : "Angular",
              "precio" : 20,
              "imagen" : "camisa_5",
              "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
          },
          {
              "id" : 5,
              "nombre" : "Github",
              "precio" : 20,
              "imagen" : "camisa_6",
              "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
          },
          {
              "id" : 6,
              "nombre" : "WordPress",
              "precio" : 25,
              "imagen" : "camisa_7",
              "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
          },
          {
              "id" : 7,
              "nombre" : "React",
              "precio" : 20,
              "imagen" : "camisa_8",
              "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
          }
      ]

      res.json(productos);
     
});

app.listen(5000, () => {
     console.log('Servidor funcionando');
})