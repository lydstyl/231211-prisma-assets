# PRISMA ASSETS

Il s'agit d'un script en NodeJS permettant de centraliser toutes les données d'un patrimoine et d'en extraire des informations standardisées via la création d'un .csv.

La centralisation des informations se fait soit par l'import de fichiers csv, soit via des APIs en fonction des comptes.

La création de tableaux croisés dynamiques et de graphique à partir du CSV généré par cette application permet de voir la répartition des actifs :

- par categorie principale
- par sous catégorie
- par compte
- etc.

# Quick start

- cloner ce repo
- `npm i`
- créer le .env en se basant sur le .env.exemple
- en cas de base de données vierge, effectuer une migration (voir commande ci-dessous)
- lancer `npx prisma studio`
- lancer les test via `npm test`
- vérifier que les relations sont ok dans Prisma Studio et éventuelement ajouter des nouvelles relations
- commenter / décommenter les features nécessaires dans main.ts et lancer le script via `npm start`.
- une fois que toutes les données sont importés, lancer la création du csv et l'exploiter dans un tableur

# Commandes utiles

## Faire une migration avec Prisma

- npx prisma migrate dev --name nomDeLaMigration
