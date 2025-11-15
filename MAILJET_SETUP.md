# Configuration Mailjet

Ce guide vous explique comment configurer Mailjet pour envoyer des emails depuis le formulaire de contact.

## 📋 Prérequis

1. Créer un compte sur [Mailjet](https://www.mailjet.com/)
2. Vérifier votre adresse email d'expéditeur dans Mailjet

## 🔑 Étapes de configuration

### 1. Obtenir vos clés API Mailjet

1. Connectez-vous à votre compte Mailjet
2. Allez dans **Account Settings** > **API Keys**
3. Copiez votre **API Key** (clé publique) et votre **Secret Key** (clé privée)

### 2. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
# Mailjet API Configuration
MJ_APIKEY_PUBLIC=votre_cle_publique_mailjet
MJ_APIKEY_PRIVATE=votre_cle_privee_mailjet

# Email de l'expéditeur (doit être vérifié dans Mailjet)
MJ_FROM_EMAIL=noreply@votredomaine.com

# Port du serveur backend (optionnel, par défaut 3001)
PORT=3001
```

**Important :** Remplacez les valeurs par vos propres clés API et votre email vérifié.

### 3. Vérifier l'email expéditeur dans Mailjet

1. Dans Mailjet, allez dans **Account Settings** > **Sender Addresses & Domains**
2. Ajoutez et vérifiez l'adresse email que vous utilisez dans `MJ_FROM_EMAIL`
3. Si vous utilisez un domaine personnalisé, configurez-le également

### 4. Email de destination

L'email de destination est configuré dans `server/index.js` et est actuellement défini sur :
- **chougoulat78@gmail.com**

Pour le modifier, éditez la ligne dans `server/index.js` :
```javascript
Email: 'chougoulat78@gmail.com',
```

## 🚀 Démarrage

### Installation des dépendances

```bash
npm install
```

### Démarrer le serveur backend

```bash
npm run server
```

### Démarrer le frontend (dans un autre terminal)

```bash
npm run dev
```

### Ou démarrer les deux en même temps

```bash
npm run dev:all
```

## 📧 Test du formulaire

1. Ouvrez votre application dans le navigateur (généralement `http://localhost:5173`)
2. Allez sur la page de contact
3. Remplissez le formulaire et envoyez-le
4. Vérifiez que l'email arrive bien à **chougoulat78@gmail.com**

## 🔒 Sécurité

- **Ne commitez jamais** le fichier `.env` dans Git (il est déjà dans `.gitignore`)
- Gardez vos clés API secrètes
- Utilisez des variables d'environnement en production

## 🐛 Dépannage

### Erreur "Invalid API key"
- Vérifiez que vos clés API sont correctes dans le fichier `.env`
- Assurez-vous qu'il n'y a pas d'espaces avant/après les clés

### Erreur "Sender address not verified"
- Vérifiez que l'email dans `MJ_FROM_EMAIL` est bien vérifié dans Mailjet
- Attendez quelques minutes après la vérification

### Le serveur ne démarre pas
- Vérifiez que le port 3001 n'est pas déjà utilisé
- Changez le port dans `.env` si nécessaire

### L'email n'arrive pas
- Vérifiez les logs du serveur backend pour voir les erreurs
- Vérifiez votre compte Mailjet pour voir les statistiques d'envoi
- Vérifiez le dossier spam du destinataire

