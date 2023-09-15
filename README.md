# Mon vieux Grimoire

## Installation

Pour lancer le projet, vous devrez d'abord installer Node.js et MongoDB sur votre machine.

Ensuite, installez les dépendances du projet avec npm :
```
npm install
```
## Configuration

Avant de lancer le projet, vous devrez créer un fichier .env à la racine du projet pour configurer vos variables d'environnement. Vous y définirez le port, l'URL du serveur, le secret JWT, votre nom d'utilisateur et votre mot de passe MongoDB. Voici un exemple de contenu pour le fichier .env :
```
PORT = 4000
MONGO_USER = your-user
MONGO_PASSWORD = your-password
JWT_SECRET = your-secret
HOST_URL = http://localhost
```
Remplacez JWT_SECRET avec la clé secrète de votre choix pour le JWT.

## Lancement du projet

Une fois que vous avez tout configuré, vous pouvez lancer le front-end du projet en utilisant la commande :
```
npm start
```
Ensuite, ouvrez un autre terminal et lancez le back-end avec les commandes suivantes :
```
cd Backend
```
```
npm run dev
```
## En utilisation

Voici une description de chaque route que vous pouvez utiliser :
```
POST /books: Ajout d'un livre. Nécessite que le corps de la requête soit sous la forme suivante :

{
"userId": "<utilisateur-id>",
"title": "<titre-du-livre>",
"author": "<nom-de-l'auteur>",
"image": "<image>",
"year": "<année-de-publication>",
"genre": "<genre-du-livre>",
"ratings": [{
"userId": "<utilisateur-id>",
"grade": <note>
}]
}

GET /books: Récupère tous les livres.
POST /books/:id/rating: Ajoute une note à un livre. Nécessite que le corps de la requête soit sous la forme suivante :

{
"userId": "<utilisateur-id>",
"rating": <note>
}

PUT /books/:id: Met à jour un livre. Le corps de la requête doit être dans le même format que pour l'ajout d'un livre.
DELETE /books/:id: Supprime un livre.
```
Pour plus d'informations sur l'utilisation de chaque route, veuillez vous référer au code.
