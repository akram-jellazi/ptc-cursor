# 🚀 Guide de déploiement sur Vercel

Ce guide vous explique comment déployer votre application React + SendGrid sur Vercel avec le frontend et le backend dans le même projet.

## 📋 Prérequis

1. Un compte [Vercel](https://vercel.com) (gratuit)
2. Un compte [SendGrid](https://sendgrid.com) avec une clé API
3. Git installé sur votre machine

## 🔧 Structure du projet

Votre projet est maintenant configuré pour Vercel avec :
- **Frontend** : Application React (dossier `src/`)
- **Backend** : Fonctions serverless dans `api/` (automatiquement détectées par Vercel)
  - `api/contact.js` - Endpoint pour le formulaire de contact
  - `api/health.js` - Endpoint de vérification de santé

## 📦 Déploiement

### Option 1 : Déploiement via l'interface Vercel (Recommandé)

1. **Connecter votre projet à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Add New Project"
   - Importez votre repository GitHub/GitLab/Bitbucket
   - Ou glissez-déposez votre dossier

2. **Configuration du projet**
   - Framework Preset : **Vite** (détecté automatiquement)
   - Build Command : `npm run build` (déjà configuré)
   - Output Directory : `dist` (déjà configuré)
   - Install Command : `npm install` (déjà configuré)

3. **Variables d'environnement**
   - Dans les paramètres du projet Vercel, allez dans **Settings** > **Environment Variables**
   - Ajoutez les variables suivantes :
     ```
     SENDGRID_API_KEY=votre_cle_api_sendgrid
     SENDGRID_FROM_EMAIL=noreply@votredomaine.com
     ```
   - Sélectionnez tous les environnements (Production, Preview, Development)

4. **Déployer**
   - Cliquez sur "Deploy"
   - Vercel va automatiquement :
     - Installer les dépendances
     - Builder votre application
     - Déployer le frontend et les fonctions serverless

### Option 2 : Déploiement via CLI

1. **Installer Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Se connecter**
   ```bash
   vercel login
   ```

3. **Déployer**
   ```bash
   vercel
   ```
   - Suivez les instructions
   - Ajoutez les variables d'environnement quand demandé

4. **Déployer en production**
   ```bash
   vercel --prod
   ```

## 🔑 Configuration des variables d'environnement

### Variables requises

| Variable | Description | Exemple |
|----------|-------------|---------|
| `SENDGRID_API_KEY` | Votre clé API SendGrid | `SG.xxxxxxxxxxxxx` |
| `SENDGRID_FROM_EMAIL` | Email vérifié dans SendGrid | `noreply@votredomaine.com` |

### Comment ajouter les variables

1. **Via l'interface Vercel** :
   - Projet > Settings > Environment Variables
   - Ajoutez chaque variable
   - Sélectionnez les environnements (Production, Preview, Development)

2. **Via CLI** :
   ```bash
   vercel env add SENDGRID_API_KEY
   vercel env add SENDGRID_FROM_EMAIL
   ```

## 🌐 URLs des API Routes

Une fois déployé, vos endpoints seront disponibles à :
- `https://votre-projet.vercel.app/api/contact` (POST)
- `https://votre-projet.vercel.app/api/health` (GET)

Le frontend React sera disponible à :
- `https://votre-projet.vercel.app`

## 🔄 Développement local avec Vercel

Pour tester localement avec les fonctions serverless Vercel :

```bash
# Installer Vercel CLI
npm i -g vercel

# Démarrer le serveur de développement Vercel
vercel dev
```

Cela démarre :
- Le frontend Vite sur `http://localhost:3000`
- Les fonctions serverless sur les routes `/api/*`

## 📝 Notes importantes

### Avantages de Vercel

✅ **Frontend + Backend dans le même projet** - Pas besoin de deux projets séparés  
✅ **Fonctions serverless automatiques** - Pas de serveur à gérer  
✅ **Déploiement automatique** - À chaque push sur Git  
✅ **HTTPS gratuit** - Certificat SSL automatique  
✅ **CDN global** - Performance optimale  
✅ **Gratuit** - Plan gratuit généreux pour commencer  

### Différences avec le serveur Express

- ❌ Plus besoin de `server/index.js` en production (gardé pour le dev local)
- ✅ Les fonctions dans `api/` sont automatiquement déployées
- ✅ Pas besoin de gérer CORS manuellement (déjà configuré)
- ✅ Pas de port à configurer

### Garder le serveur Express pour le développement local

Le fichier `server/index.js` est toujours disponible pour le développement local :
```bash
npm run dev:all  # Démarre Express + Vite
```

## 🧪 Tester le déploiement

1. **Tester l'endpoint de santé** :
   ```bash
   curl https://votre-projet.vercel.app/api/health
   ```
   Devrait retourner : `{"status":"OK"}`

2. **Tester le formulaire de contact** :
   - Allez sur votre site déployé
   - Remplissez le formulaire de contact
   - Vérifiez que l'email arrive bien

## 🐛 Dépannage

### Les emails ne sont pas envoyés

1. Vérifiez que les variables d'environnement sont bien configurées dans Vercel
2. Vérifiez que votre email expéditeur est vérifié dans SendGrid
3. Consultez les logs Vercel : Projet > Deployments > [votre déploiement] > Functions

### Erreur 500 sur les API routes

1. Vérifiez les logs dans Vercel
2. Assurez-vous que `@sendgrid/mail` est dans les `dependencies` (pas `devDependencies`)
3. Vérifiez que votre clé API SendGrid est valide

### Le frontend ne charge pas

1. Vérifiez que le build s'est bien passé
2. Consultez les logs de build dans Vercel
3. Vérifiez que `vite.config.js` est correctement configuré

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Documentation SendGrid](https://docs.sendgrid.com/)

## 🎉 C'est tout !

Votre application est maintenant prête à être déployée sur Vercel avec le frontend et le backend dans le même projet !






