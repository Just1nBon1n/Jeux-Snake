//Variable de type objet pour l'arrière plan de l'intro
let arrierePlanIntro = {
    img: new Image(),
    urlImage: "images/imageIntro.jpg",
    x: 0,
    y: 0,
    largeur: 900,
    hauteur: 500,
    nbVignette: 6,
    indexVignette: 0,
    sourceX: 0
}

//Variable de type objet pour l'arrièreplan du jeu
let fondJeu = {
    img: new Image(),
    urlImage: "images/fondJeu.jpg",
    x: 0,
    y: 0,
    largeur: 900,
    hauteur: 500,
    nbVignette: 6,
    indexVignette: 0,
    sourceX: 0
}

//Variable de type objet pour définir le serpent 
let serpent = {
    img: new Image(),
    urlImage: "images/serpentDroit.png",
    x: 0,
    y: 0,
    largeur: 50,
    hauteur: 50,
    //vitesse de 50 pour que e serpent bouge de une case par actualisation
    vitesseX: 50,
    vitesseY: 50,  
    longueur: 1
}

//Variable de type objet pour définir le serpent 
let queue = {
    img: new Image(),
    urlImage: "images/queue.png",
    x: 0,
    y: 0,
    largeur: 50,
    hauteur: 50,
    //vitesse de 50 pour que e serpent bouge de une case par actualisation
    vitesseX: 50,
    vitesseY: 50,  
    longueur: 1
}

//Variable de type objet pour définir les touches
let touches = {
    toucheW: false,
    toucheS: false,
    toucheA: false, 
    toucheD: false
}

//Variable de type objet pour définir le coffre
let coffre = {
    img: new Image(),
    urlImage: "images/coffre.png", 
    x: 0,
    y: 0,      
    largeur: 50,
    hauteur: 50
}