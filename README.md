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
- npm i
- créer le .env en se basant sur le .env.exemple
- en cas de base de données vierge, effectuer une migration (voir commande ci-dessous)
- lancer Prisma Studio
- commenter / décommenter les features nécessaires dans main.ts et lancer le script via
- vérifier que les relations sont ok dans Prisma Studio, éventuelement ajouter des nouvelles relations manuelement par exemple entre les sous-categories et les assets
- une fois que toutes les données sont importés, lancer la création du csv et l'exploiter dans un tableur

# Commandes utiles

## Lancer les tests

- npm test

## Faire une migration avec Prisma

- npx prisma migrate dev --name nomDeLaMigration

## Lancer Prisma Studio

- npx prisma studio

## Lancer le script

- npx ts-node main.ts

# Todo

- regler le problème des montants au format anglais dans le csv exemple 12.34 au lieu de 12,34 pour que ça fonctionne bien dans un tableur.
- créer des tests unitaires
