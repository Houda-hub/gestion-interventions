# Guide d'Installation et d'Execution du Projet
## Gestion des Interventions Techniques (Spring Boot + React)

---

## Prérequis

### 1. Java 21 ou supérieur
- Téléchargez Java : https://www.oracle.com/java/technologies/downloads/
- Installez Java sur votre machine
- Vérifiez dans un terminal :
```
java -version
```

### 2. Node.js 18 ou supérieur
- Téléchargez Node.js : https://nodejs.org/
- Installez Node.js
- Vérifiez dans un terminal :
```
node -v
npm -v
```

### 3. MySQL Server
- Téléchargez MySQL : https://dev.mysql.com/downloads/mysql/
- Installez MySQL Server et MySQL Workbench
- Pendant l'installation, notez le mot de passe root

### 4. IDE recommandé
- Backend : IntelliJ IDEA ou Eclipse
- Frontend : VS Code

---

## Partie 1 : Base de Données

### 1.1 Créer la base de données

Ouvrez MySQL Workbench ou un terminal MySQL et exécutez :

```sql
CREATE DATABASE Interventions;
```

### 1.2 Vérifier les identifiants

Par défaut, le projet utilise :
- **Utilisateur** : `root`
- **Mot de passe** : `HtrOL39.`

**Si vos identifiants sont différents**, modifiez le fichier :
`Spring_React/src/main/resources/application.properties`

```properties
spring.datasource.username=VOTRE_UTILISATEUR
spring.datasource.password=VOTRE_MOT_DE_PASSE
```

---

## Partie 2 : Backend (Spring Boot)

### 2.1 Ouvrir le terminal

Naviguez vers le dossier du projet :

```
cd chemin\vers\Spring_React
```

### 2.2 Lancer le backend

Exécutez la commande :

```
.\mvnw.cmd spring-boot:run
```

Sur Mac/Linux :
```
./mvnw spring-boot:run
```

### 2.3 Vérifier le démarrage

Attendez jusqu'à voir ce message :
```
Started SpringReactApplication in X.XXX seconds
```

Le backend est accessible sur : **http://localhost:8081**
**Si votre port est différent, dans application.propreties changez le port** 
server.port='votre port'
---

## Partie 3 : Frontend (React)

### 3.1 Ouvrir un NOUVEAU terminal

Ne fermez pas le terminal du backend. Ouvrez un deuxième terminal et naviguez vers le dossier frontend :

```
cd chemin\vers\Spring_React\frontend
```

### 3.2 Installer les dépendances

Si c'est la première fois, exécutez :

```
npm install
```

### 3.3 Lancer le frontend

Exécutez :

```
npm run dev
```

Le frontend est accessible sur : **http://localhost:5173**

---

## Partie 4 : Utiliser l'Application

### 4.1 Créer un Admin (via Postman ou curl)

Ouvrez Postman et envoyez cette requête :

- **Méthode** : POST
- **URL** : `http://localhost:8081/api/admin/signup`
- **Body (JSON)** :
```json
{
    "name": "Votre Nom",
    "email": "admin@test.com",
    "password": "admin123",
    "role": "ADMIN"
}
```

### 4.2 Se connecter

Accédez à **http://localhost:5173** et connectez-vous avec :
- Email : `admin@test.com`
- Mot de passe : `admin123`

### 4.3 Fonctionnalités Admin
- Dashboard avec statistiques
- Créer / Modifier / Supprimer des interventions
- Créer / Modifier / Supprimer des techniciens
- Assigner des techniciens aux interventions

### 4.4 Fonctionnalités Technicien
- Voir ses interventions assignées
- Mettre à jour le status (Assigné → En cours → Terminé)
- **Ne peut pas** créer d'interventions ni d'affectations

---

## Résolution de Problèmes

### Erreur : Port 8080 déjà utilisé
```
Kill the process using port 8080
```
Windows :
```
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Erreur : Port 5173 déjà utilisé
```
Arrêtez le processus ou utilisez : npm run dev -- --port 3000
```

### Erreur de connexion à MySQL
- Vérifiez que MySQL est démarré
- Vérifiez les identifiants dans `application.properties`
- Vérifiez que la base `Intervontions` existe

### Erreur de compilation Java
- Vérifiez que Java 21+ est installé : `java -version`
- Exécutez : `.\mvnw.cmd clean compile`

### Le frontend ne charge pas les données
- Vérifiez que le backend tourne sur le port 8080
- Vérifiez la console du navigateur (F12) pour les erreurs

---

## API Endpoints

### Admin
| Méthode | Endpoint | Description |
|---|---|---|
| POST | /api/admin/signup | Créer un admin |
| POST | /api/admin/login | Connexion (email + password) |

### Interventions
| Méthode | Endpoint | Description |
|---|---|---|
| GET | /api/interventions | Liste toutes les interventions |
| POST | /api/interventions | Créer une intervention |
| PUT | /api/interventions/{id} | Modifier une intervention |
| DELETE | /api/interventions/{id} | Supprimer une intervention |
| GET | /api/interventions/search | Rechercher avec filtres |

### Techniciens
| Méthode | Endpoint | Description |
|---|---|---|
| GET | /api/techniciens | Liste tous les techniciens |
| POST | /api/techniciens | Créer un technicien |
| PUT | /api/techniciens/{id} | Modifier un technicien |
| DELETE | /api/techniciens/{id} | Supprimer un technicien |
| GET | /api/techniciens/search | Rechercher avec filtres |

### Affectations
| Méthode | Endpoint | Description |
|---|---|---|
| POST | /api/affectations/assign | Assigner un technicien |
| GET | /api/affectations | Liste toutes les affectations |
| PUT | /api/affectations/status | Mettre à jour le status |
| DELETE | /api/affectations | Supprimer une affectation |

---

## Structure du Projet

```
Spring_React/
├── src/main/java/com/example/demo/
│   ├── Controller/          # API REST
│   ├── Model/               # Entités JPA
│   ├── Repository/          # Interfaces JPA
│   └── Service/             # Logique métier
├── src/main/resources/
│   └── application.properties  # Configuration
└── frontend/                # React App
    └── src/
        ├── api/api.js       # Communication API
        ├── components/      # Navbar
        └── pages/           # Login, Dashboard, Interventions...
```
