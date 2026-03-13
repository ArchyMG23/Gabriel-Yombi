# Guide de Déploiement et Configuration

## 1. Problème des Emails sur Netlify
Netlify est une plateforme pour sites **statiques**. Votre fichier `server.ts` (Express) ne s'exécute pas sur Netlify par défaut. C'est pourquoi les emails ne partent pas.

### Solutions :
*   **Option A (Recommandée pour Netlify) : EmailJS**
    *   Utilisez le service [EmailJS](https://www.emailjs.com/) qui permet d'envoyer des emails directement depuis le frontend (React) sans serveur.
*   **Option B : Déploiement Full-Stack**
    *   Déployez sur une plateforme qui supporte Node.js (comme Render, Railway, ou Cloud Run).
*   **Option C : Netlify Functions**
    *   Transformez les routes de `server.ts` en fonctions sans serveur (Netlify Functions).

## 2. Configuration des Variables d'Environnement
Pour que l'envoi d'emails fonctionne (sur votre serveur), vous devez configurer ces variables dans les paramètres de votre plateforme de déploiement :

*   `EMAIL_USER` : Votre adresse Gmail (ex: `gabrielyombi311@gmail.com`)
*   `EMAIL_PASS` : Votre **Mot de passe d'application** Gmail (ne pas utiliser votre mot de passe habituel).
    *   *Comment obtenir un mot de passe d'application ?* Allez dans votre compte Google > Sécurité > Validation en deux étapes > Mots de passe des applications.
*   `EMAIL_TO` : L'adresse qui recevra les notifications (par défaut: `gabrielyombi311@gmail.com`).

## 3. Calendrier de Réservation
Le calendrier a été mis à jour pour :
1.  **Persister les données** : Les rendez-vous sont maintenant sauvegardés dans un fichier `appointments.json` sur le serveur.
2.  **Chargement au démarrage** : Le site récupère maintenant tous les rendez-vous existants au chargement pour bloquer les créneaux occupés.
3.  **Indicateurs visuels** : 
    *   Un point **rouge** indique qu'un jour est complet.
    *   Un point **doré** indique qu'il y a déjà des réservations mais qu'il reste de la place.
