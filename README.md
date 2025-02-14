# CASHLESS
Le projet pour ....


## Prérequis
Fonctionne avec nodejs (v22)

## Installation des paquets
```bash

npm i
cd server && npm i
cd ../client && npm i
```

## Lancement des applications

Soit unitairement en faisant:

```bash

# racine du projet
# lancement du serveur
node server/server.js

# sur un autre terminal
cd client
npm run dev
```

## Build de production
La partie serveur ne change pas, il faut l'executer avec 
```bash

node server/server.js
```

Par contre pour la partie client il faudra build le paquet
```bash 

npm run build
```
Et il faudra servir la partie html
