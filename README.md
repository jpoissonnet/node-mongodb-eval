# node-mongodb-eval

## Description du modèle

On a un modèle `flipper` qui représente un flipper. Un flipper a les propriétés suivantes :
```ts 
interface IFlipper{
  price: number;
  brands: IBrand;
  isSecondHand: boolean;
  name: string;
  releaseDate: Date;
  rating: number;
  images: string[];
  video: string;
  description: string;
}
```
On a aussi un modèle `brand` qui représente une marque de flipper. Une marque a les propriétés suivantes :
```ts
interface IBrand{
  name: string;
  logo: string;
  startGuide: string;
}
```
Dans les choix qui ont été faits pour ce modèle, on peut s'arrêter sur le fait que le `flipper` a une relation OneToMany 
avec le `brand` (un flipper a une seule marque, une marque peut être associée à plusieurs flippers).
> on parle de relation dans une base de données NoSQL, mais en réalité, on ne fait pas de jointure, on stocke directement
> l'objet `brand` dans le flipper.

Pour la gestion des images et de leur mise à jour, on a stocké les urls des images dans un tableau de string. On expose
deux méthodes pour ajouter une image et pour supprimer une image. On peut pas 😅 mettre à jour une image, mais si on 
héberge les images sur un serveur, on pourrait imaginer une méthode pour mettre à jour une image en gardant la même url.

## Optimisations

- Permettre à l'utilisateur de trier les résultats par ordre croissant ou décroissant (avec du recul je me dis que c'est
  une fonctionnalité qu'on pourrait faire côté front en fait)
- On pourrait renforcer la validation du schema et mettre des règles métiers sur les champs (par exemple, le prix ne peut
  pas être négatif, la note doit être entre 0 et 5, etc.)