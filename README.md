# PRISMA ASSETS

Il s'agit d'un script en NodeJS me permettant de centraliser toutes les données de mon patrimoine et d'en extraire des informations standardisées via la création d'un .csv.

La centralisation des informations se fait soit par l'import de fichiers csv, soit via des APIs en fonction des comptes.

Avec la fonctionalité de tableau croisée dynamique d'un tableur + la création de graphique, ce CSV créé me permet de voir la répartition de tous mes actifs :

- par categorie principale
- par sous catégorie
- par compte
- etc.

# Quick start

- cloner ce repo
- npm i
- créer le .env en se basant sur le .env.exemple
- en cas de base de données vierge, effectuer un migration (voir commande ci-dessous)
- lancer Prisma Studio
- commenter / décommenter les features nécessaires dans main.ts et lancer le script via
- vérifier que les relations sont ok dans Prisma Studio, éventuelement ajouter des nouvelles relations manuelement par exemple entre les sous-categories et les assets
- une fois que toutes les données sont importés, lancer la création du csv et l'exploiter dans un tableur

# Commandes utiles

## Faire une migration avec Prisma

- npx prisma migrate dev --name nomDeLaMigration

## Lancer Prisma Studio

- npx prisma studio

## Lancer le script

- npx ts-node main.ts
