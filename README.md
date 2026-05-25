# Système de Gestion des Interventions Techniques

Application web full-stack pour la gestion des demandes d'intervention technique.

## 🛠️ Stack technique

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white)

## ✨ Fonctionnalités

- Authentification avec gestion des rôles (Admin, Technicien)
- CRUD Interventions & Techniciens
- Affectation des interventions aux techniciens
- Suivi de l'état d'avancement (En attente → En cours → Terminée)
- Recherche et filtrage multicritère

## 📁 Structure du projet

```
gestion-interventions/
├── backend/          # Spring Boot
│   ├── src/main/java/com/example/demo/
│   │   ├── Controller/
│   │   ├── Service/
│   │   ├── Repository/
│   │   └── Model/
│   └── pom.xml
└── frontend/         # React + Vite
    └── src/
        ├── pages/
        ├── components/
        └── api/
```

## 🚀 Lancer le projet

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔗 API REST

| Méthode | Endpoint | Description |
|---|---|---|
| POST | /api/admin/login | Connexion |
| GET | /api/interventions | Liste interventions |
| POST | /api/interventions | Créer intervention |
| PUT | /api/interventions/{id} | Modifier |
| DELETE | /api/interventions/{id} | Supprimer |
| GET | /api/interventions/search | Filtrer |
| GET | /api/techniciens | Liste techniciens |
| POST | /api/affectations/assign | Affecter |
| PUT | /api/affectations/status | Maj statut |

## 👥 Réalisé par

- Houda Beddach
- Mohamed Azeroual

Université Cadi Ayyad — Faculté des Sciences Semlalia — ISI S6 — 2025/2026
