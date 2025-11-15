# Configuration SendGrid

Ce guide vous explique comment configurer SendGrid pour envoyer des emails depuis le formulaire de contact.

## 📋 Prérequis

1. Créer un compte sur [SendGrid](https://sendgrid.com/)
2. Vérifier votre adresse email d'expéditeur dans SendGrid

## 🔑 Étapes de configuration

### 1. Obtenir votre clé API SendGrid

1. Connectez-vous à votre compte SendGrid
2. Allez dans **Settings** > **API Keys**
3. Cliquez sur **Create API Key**
4. Donnez un nom à votre clé (ex: "Formulaire de contact")
5. Sélectionnez les permissions **Full Access** ou **Restricted Access** avec les permissions d'envoi d'emails
6. Copiez la clé API (vous ne pourrez la voir qu'une seule fois !)

### 2. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
# SendGrid API Configuration
SENDGRID_API_KEY=votre_cle_api_sendgrid

# Email de l'expéditeur (doit être vérifié dans SendGrid)
SENDGRID_FROM_EMAIL=noreply@votredomaine.com

# Port du serveur backend (optionnel, par défaut 3001)
PORT=3001
```

**Important :** Remplacez les valeurs par vos propres clés API et votre email vérifié.

### 3. Vérifier l'email expéditeur dans SendGrid

1. Dans SendGrid, allez dans **Settings** > **Sender Authentication**
2. Cliquez sur **Verify a Single Sender**
3. Remplissez le formulaire avec votre adresse email
4. Vérifiez votre email en cliquant sur le lien dans le message reçu
5. Utilisez cette adresse email dans `SENDGRID_FROM_EMAIL`

**Note :** Pour la production, il est recommandé d'utiliser **Domain Authentication** au lieu d'un expéditeur unique.

### 4. Email de destination

L'email de destination est configuré dans `server/index.js` et est actuellement défini sur :
- **chougoulat78@gmail.com**

Pour le modifier, éditez la ligne dans `server/index.js` :
```javascript
to: 'chougoulat78@gmail.com',
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
2. Naviguez vers la page de contact
3. Remplissez le formulaire et soumettez-le
4. Vérifiez que l'email arrive bien à **chougoulat78@gmail.com**

## 🔒 Sécurité

- **Ne commitez jamais** votre fichier `.env` dans Git
- Le fichier `.env` est déjà dans `.gitignore`
- Utilisez des variables d'environnement différentes pour le développement et la production

## 📚 Ressources

- [Documentation SendGrid](https://docs.sendgrid.com/)
- [Guide d'authentification SendGrid](https://docs.sendgrid.com/ui/account-and-settings/how-to-set-up-domain-authentication)

