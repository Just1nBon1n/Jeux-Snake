//Fonction pour animer l'arrière plan du début
function gererAnimationArrierePlanIntro() {
    //Définir la coordonnée sourceX de la vignette à afficher
    arrierePlanIntro.sourceX = arrierePlanIntro.indexVignette * arrierePlanIntro.largeur;

    //Dessiner l'arrière plan
    ctx.drawImage(
        arrierePlanIntro.img,
        arrierePlanIntro.sourceX,
        0,
        arrierePlanIntro.largeur,
        arrierePlanIntro.hauteur,
        arrierePlanIntro.x,
        arrierePlanIntro.y,
        arrierePlanIntro.largeur,
        arrierePlanIntro.hauteur
        );

    //Incrémenter et gérer l’index de la prochaine vignette à afficher
    arrierePlanIntro.indexVignette++;

    if (arrierePlanIntro.indexVignette >= arrierePlanIntro.nbVignette) {
        arrierePlanIntro.indexVignette = 0;
    }
}

//Fonction pour animer l'arrière plan du début
function gererAnimationFondJeu() {
    //Définir la coordonnée sourceX de la vignette à afficher
    fondJeu.sourceX = fondJeu.indexVignette * fondJeu.largeur;

    //Incrémenter et gérer l’index de la prochaine vignette à afficher
    fondJeu.indexVignette++;

    if (fondJeu.indexVignette >= fondJeu.nbVignette) {
        fondJeu.indexVignette = 0;
    }
}


//Débute le jeu après avoir appuyé sur la barre d'espacement
function commencerJeu(event) {
    if (event.keyCode == 32 && debutJeu == false) { 
        clearInterval(intervalArrierePlanIntroID);
        //Commencer l'interval du jeu
        intervalJeuID = setInterval(actualiserLeJeu, 1000/5);
        //Afficher l'arrière plan animé
        intervalFondJeuID = setInterval(gererAnimationFondJeu, 1000/6);
        //Début de jeu à true pour ne pas recommencer le jeu
        debutJeu = true;
        //Fin jeu a false pour ne pas recommencer
        finJeu = false
        //Partir la musique du jeu en boucle
        sonJeu.play();
        sonJeu.loop = true;
        } 
}

//Redémarre le jeu après un collision ou après avoir atteint 10 de score
function recommencerJeu(event) {
    if (event.keyCode == 32 && finJeu == true) {
        document.location.reload();
    }
}

//Déplace le serpent en appuyant sur les touche W A S D
function bougerSerpent() {
    //Calcule la futur position du serpent
    //Touche W
    if (touches.toucheW) {
        serpent.y += -serpent.vitesseY;
    }

    //Touche S
    if (touches.toucheS) {
        serpent.y += serpent.vitesseY;
    }

    //Touche A
    if (touches.toucheA) {
        serpent.x += -serpent.vitesseX;
    }

    //Touche D
    if (touches.toucheD) {
        serpent.x += serpent.vitesseX;
    }

    //Empecher le serpent de sortir des limites définis
    //Limites Haut
    if (serpent.y < 0 ) {
        finJeu = true;
    }

    //Limite Bas
    let yMax = leCanvas.height - serpent.hauteur;
    if (serpent.y > yMax) {
        finJeu = true;
    }

    //Limite Gauche
    let xMin = 100;
    if (serpent.x < xMin) {
        finJeu = true;
    }

    //Limite Droite
    let xMax = 800 - serpent.largeur;
    if (serpent.x > xMax) {
        finJeu = true;
    }

    //console.log(serpentQueue)
    
    //Gestion des segments de la queue
    if (serpentQueue.length > serpent.longueur) {
        serpentQueue.pop(); // Supprime la dernière partie de la queue
    }
    
    //Ajout d'un élément au début du tableau (semblable a push mais au début)
    serpentQueue.unshift({x: serpent.x, y: serpent.y});


    //Dessin des segments de la queue et du serpent
    for (let i = 0; i < serpentQueue.length; i++) {
        //if 0 dans le tableua img = tete apres img = queue
        if (i == 0) ctx.drawImage(serpent.img, serpentQueue[i].x, serpentQueue[i].y, serpent.largeur, serpent.hauteur);
        else ctx.drawImage(queue.img, serpentQueue[i].x, serpentQueue[i].y, queue.largeur, queue.hauteur);
        
        //ctx.drawImage(serpent.img, serpentQueue[i].x, serpentQueue[i].y, serpent.largeur, serpent.hauteur);
    }
    

}

//Fonction pour afficher le score
function afficherScore() {
    //Style du texte
    ctx.font = "bold 34px Calibri";
    ctx.textBaseline = "top";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText("SCORE", 3, 10);
    ctx.fillText(score, 43, 50);
}

//Message de fin de partie gagné (score = 10)
function afficherMessageGagnant() {
    ctx.font = "bold 40px Calibri";
    ctx.textBaseline = "top";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("VOUS AVEZ GAGNÉ!", leCanvas.width/2, leCanvas.height/2 - 30);
    ctx.fillText("Appuyer sur espace pour recommencer", leCanvas.width/2, leCanvas.height/2 + 30)
}

//Message de fin de partie perdu (collision)
function afficherMessagePerdant() {
    ctx.font = "bold 40px Calibri";
    ctx.textBaseline = "top";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("VOUS AVEZ PERDU...", leCanvas.width/2, leCanvas.height/2 - 30);
    ctx.fillText("Appuyer sur espace pour recommencer", leCanvas.width/2, leCanvas.height/2 + 30)
}

//Détecte qu'elle touches sont appuyées (choisie la direction du serpent)
function presserTouche(event) {
    if (event.keyCode == 87) {
        //Touche W
        touches.toucheW = true;
        touches.toucheA = false;
        touches.toucheD = false;
        touches.toucheS = false;
        serpent.img.src = "images/serpentHaut.png";
    }
    
    if (event.keyCode == 83) {
        //Touche S
        touches.toucheS = true;
        touches.toucheA = false;
        touches.toucheD = false;
        touches.toucheW = false;
        serpent.img.src = "images/serpentBas.png";
    }

    if (event.keyCode == 65) {
        //Touche A
        touches.toucheA = true;
        touches.toucheS = false;
        touches.toucheD = false;
        touches.toucheW = false;
        serpent.img.src = "images/serpentGauche.png";
    }

    if (event.keyCode == 68) {
        //Touche D
        touches.toucheD = true; 
        touches.toucheA = false;
        touches.toucheS = false;
        touches.toucheW = false;
        serpent.img.src = "images/serpentDroit.png";
    }
}

/*Pas nécessaire de detecter quand les touches sont relaché car le serpent 
n'arrète pas une fois qu'il est partis*/

//Fonction pour détecter les collision entre le serpent et le coffre
function detecterCollision (rectangle1, rectangle2) {
    if  (rectangle1.x < rectangle2.x + rectangle2.largeur &&
        rectangle1.x + rectangle1.largeur > rectangle2.x && 
        rectangle1.y < rectangle2.y + rectangle2.hauteur && 
        rectangle1.y + rectangle1.hauteur > rectangle2.y) {
        return true;
    } else {
        return false;
    } 
}

function collisionEntreSerpentEtQueue() {
    // Vérifier si le serpent possède des segments de queue
    if (serpentQueue.length > 0) {
        // Parcours des segments de la queue à partir du troisième élément
        for (let index = 2; index < serpentQueue.length; index++) {
            // Vérification de collision entre la tête du serpent et un segment de sa queue
            if (serpent.x === serpentQueue[index].x && serpent.y === serpentQueue[index].y) {
                // Collision détectée, déclencher une action (par exemple, la fin du jeu)
                finJeu = true;
            }
        }
    }
}