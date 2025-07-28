Explication du projet :

Ce projet est un site qui liste des évements par catégorie. A la création de son compte, on demande à l'utilisateur quels genres d'évènements lui plairaient et il aura ensuite accès aux évènements correspondant à ses critères.

Lancement du projet :

`git clone ....`
`cd back`
`pip install -r requirements.txt`
`python app.py`

Laissez le tourner et ouvrez un autre terminal
`npm start`

cd back
.\venv311\Scripts\Activate
$env:FLASK_APP = "app:app"
flask run

ou 

cd back
.\venv311\Scripts\Activate
cd ..
python -m back.app


Prochains objectifs :
-Si on créé un compte on arrive sur une page form de choix de centres d'intérets en mode 'Musique' 'Mode' 'Musées' etc pour des events recommandés
-Une main page catalogue avec en première partie un caroussel d'events recommandés selon les critères définis + en focntion de ceux ou la personne s'est déjà inscrite et en dessous la liste des events sous forme de petites cartes sur lesquelles on a quelques infos et la possibilité de cliquer pour voir les détails/s'incrire et voir qui de nos contacts participent. Le catalogue ayant des filtres de dates et autres.
-Une api pour rajouter direct de events dans notre catalogue
-Une page pour rajouter des events avec image de couv et tout et l'option de 'boost' l'annonce pour la somme de 5€.
-Une page profil pour modifier ses infos personnelles comme le nom d'utilisateur, le mot de passe (tjs avec envoie de mail) modifier ses préférences et enregistrer sa cb ou son paypal
-Une pages "Mes événements" avec 2/3 onglets, "events passés" pour voir les événements auxquels on a déjà participé, "Events prévus" avec ceux ou on est inscrit à l'avenir, et "Events ajoutés" pour ceux qui ont déjà créé des events et voir ceux qu'ils ont publiés.Le tout est des filtres pour trier par genre ou par date
-Une page "Amis" où on peut voir une liste de nos amis logique avec en haut un "nouveau contact" pour ajouter qqn en fonction de son nom d'utilisateur et juste à coté un bouton "Demandes (n)" avec le nombre de demandes d'amis qu'on a reçu.
-Les pages a propos, page mention légal, politique de confidentialité et comme on fait des ventes on doit aussi avoir les conditions générales de vente
- petit onglet "Faire un don"