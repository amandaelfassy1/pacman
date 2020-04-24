// Variables globales
const map = document.querySelector('.map')
const pacMan = document.querySelector('img[src="img/pacman.gif"]')
const redGhost = document.querySelector('img[src="img/red-ghost.png"]')
const pinkGhost = document.querySelector('img[src="img/pink-ghost.png"]')
const blueGhost = document.querySelector('img[src="img/blue-ghost.png"]')
const submit = document.querySelector('input[type="submit"]')
const inputName = document.querySelector('input[type="text"]')
const gameOverDiv = document.querySelector('.GameOver')
const form = document.querySelector('.form')

let score = 0
let scoreUser = 0
let level = 0


let pacManInterval
let redGhostInterval
let pinkGhostInterval
let blueGhostInterval

let currentRedGhostDirection
let currentPinkGhostDirection
let currentBlueGhostDirection

const directions = [ 'toLeft', 'toRight', 'toTop', 'toBottom' ]

console.log('jeu lancé')

// Collection des murs axe horizontal droite-gauche
const blockedSquaresToLeft = [
    {top:300, left:200},
    {top:500, left:200},
    {top:700, left:200},
    {top:200, left:300},
    {top:300, left:300},
    {top:500, left:300},
    {top:800, left:300},
    {top:0, left:500},
    {top:200, left:500},
    {top:600, left:500},
    {top:800, left:500},
    {top:400, left:600},
    {top:200, left:700},
    {top:300, left:700},
    {top:500, left:700},
    {top:800, left:700},
    {top:700, left:800},
    {top:0, left:0},
    {top:100, left:0},
    {top:200, left:0},
    {top:600, left:0},
    {top:700, left:0},
    {top:800, left:0},
    {top:900, left:0}
]
// Collection des murs axe horizontal gauche-droite
const blockedSquaresToRight = [
    {top:700, left:100},
    {top:200, left:200},
    {top:300, left:200},
    {top:500, left:200},
    {top:800, left:200},
    {top:400, left:300},
    {top:0, left:400},
    {top:200, left:400},
    {top:600, left:400},
    {top:800, left:400},
    {top:200, left:600},
    {top:300, left:600},
    {top:500, left:600},
    {top:800, left:600},
    {top:300, left:700},
    {top:500, left:700},
    {top:700, left:700},
//ligne en left 900
    {top:0, left:900}, {top:100, left:900}, {top:200, left:900}, {top:600, left:900}, {top:700, left:900},
    {top:800, left:900}, {top:900, left:900}
]
// Collection des murs axe vertical bas-haut
const blockedSquaresToTop = [
    {top:400, left:0},
    {top:600, left:0},
    {top:800, left:0},
    {top:100, left:100},
    {top:200, left:100},
    {top:400, left:100},
    {top:600, left:100},
    {top:400, left:100},
    {top:700, left:100},
    {top:900, left:100},
    {top:900, left:200},
    {top:100, left:300},
    {top:300, left:300},
    {top:700, left:300},
    {top:900, left:300},
    {top:200, left:400},
    {top:500, left:400},
    {top:600, left:400},
    {top:800, left:400},
    {top:200, left:500},
    {top:500, left:500},
    {top:600, left:500},
    {top:800, left:500},
    {top:100, left:600},
    {top:300, left:600},
    {top:700, left:600},
    {top:900, left:600},
    {top:900, left:700},
    {top:100, left:800},
    {top:200, left:800},
    {top:400, left:800},
    {top:600, left:800},
    {top:700, left:800},
    {top:900, left:800},
    {top:400, left:900},
    {top:600, left:900},
    {top:800, left:900} ,
//ligne en top 0
    {top:0, left:0}, {top:0, left:100}, {top:0, left:200}, {top:0, left:300}, {top:0, left:400}, {top:0, left:500}, {top:0, left:600},
    {top:0, left:700}, {top:0, left:800}, {top:0, left:900}
]
// Collection des murs axe vertical haut-bas
const blockedSquaresToBottom = [
    {top:200, left:0},
    {top:400, left:0},
    {top:700, left:0},
    {top:0, left:100},
    {top:100, left:100},
    {top:200, left:100},
    {top:400, left:100},
    {top:600, left:100},
    {top:800, left:100},
    {top:800, left:200},
    {top:0, left:300},
    {top:200, left:300},
    {top:600, left:300},
    {top:800, left:300},
    {top:100, left:400},
    {top:300, left:400},
    {top:500, left:400},
    {top:700, left:400},
    {top:100, left:500},
    {top:300, left:500},
    {top:500, left:500},
    {top:700, left:500},
    {top:0, left:600},
    {top:200, left:600},
    {top:600, left:600},
    {top:800, left:600},
    {top:800, left:700},
    {top:0, left:800},
    {top:100, left:800},
    {top:200, left:800},
    {top:400, left:800},
    {top:600, left:800},
    {top:800, left:800},
    {top:200, left:900},
    {top:400, left:900},
    {top:700, left:900},
    {top:900, left:0},
    {top:900, left:100},
    {top:900, left:200},
    {top:900, left:300},
    {top:900, left:400},
    {top:900, left:500},
    {top:900, left:600},
    {top:900, left:700},
    {top:900, left:800},
    {top:900, left:900}
]

const getPositionOf = (element) => {
    const top = parseInt(getComputedStyle(element, null).getPropertyValue('top'), 10)
     const left = parseInt(getComputedStyle(element, null).getPropertyValue('left'), 10)
    //const top = Number(element.dataset.top)
    //const left = Number(element.dataset.left)
    return { top, left }
}

const isTheCharacterBlocked = (characterPositon, movingDirection) => {
    let blockedSquares =[]
    switch (movingDirection) {
        case 'toLeft':
            blockedSquares = blockedSquaresToLeft
            break
        case 'toRight':
            blockedSquares = blockedSquaresToRight
            break
        case 'toTop':
            blockedSquares = blockedSquaresToTop
            break
        case 'toBottom':
            blockedSquares = blockedSquaresToBottom
            break
    }

    return blockedSquares.some(square => {
        const topsAreEquals = characterPositon.top === square.top
        const leftsAreEquals = characterPositon.left === square.left
        return topsAreEquals && leftsAreEquals
    })
}

// Mouvements du clavier
const movePacMan = (to) => {
    clearInterval(pacManInterval)

    pacMan.className = to

    let pacManPosition = getPositionOf(pacMan)

    pacManInterval = setInterval(() => {
        if (!isTheCharacterBlocked(pacManPosition, to)) {
            switch (to) {
                case 'toLeft':
                    pacMan.style.left = pacManPosition.left === 0 ? 900 + "px" : pacManPosition.left - 100 + "px"
                    break
                case 'toRight':
                    pacMan.style.left = pacManPosition.left === 900 ? 0 : pacManPosition.left + 100 + "px"
                    break
                case 'toTop':
                    pacMan.style.top = pacManPosition.top - 100 + "px"
                    break
                case 'toBottom':
                    pacMan.style.top = pacManPosition.top + 100 + "px"
                    break
            }
            pacManPosition = getPositionOf(pacMan)
            redGhostPosition = getPositionOf(redGhost)
            blueGhostPosition = getPositionOf(blueGhost)
            pinkGhostPosition = getPositionOf(pinkGhost)

            document.querySelectorAll(".dot").forEach(function(node){
                if(node.style.left === pacManPosition.left+"px" && node.style.top === pacManPosition.top+"px" && node.style.display !== "none"){
                    node.style.display = "none"
                    score++
                    scoreUser++
                    document.getElementById("score").innerHTML = score;
                }
                //setInterval("node()", 1000);
            });
            isGameOver()

            if(score % 90 ==0){
                level= level+1
                document.getElementById("level").innerHTML = level;
                start()
            }
        }
    }, 200)

}

addEventListener('keydown', e => {

    switch (e.keyCode) {
        case 37:
            movePacMan('toLeft')
            break
        case 39:
            movePacMan('toRight')
            break
        case 38:
            movePacMan('toTop')
            break
        case 40:
            movePacMan('toBottom')
            break
    }
})
const moveRedGhost = () => {
    clearInterval(redGhostInterval)

    let redGhostPosition = getPositionOf(redGhost)
    let pacManPosition = getPositionOf(pacMan)


    // générer un "to" aléatoire
    // À SUPPRIMER APRÈS LE POINT ⭐️
    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'

    // SI NOUS VOULONS AMÉLIORER LE DÉPLACEMENT, IL FAUDRA REMPLACER LES DEUX LIGNES PRÉCÉDENTES PAR UNE SOLUTION DE CE GENRE
    // let filtredDirections = directions.filter((direction) => {
    //     return direction !== currentRedGhostDirection && ????
    // })

    redGhostInterval = setInterval(() => {
        currentRedGhostDirection = randomDirection

        if (!isTheCharacterBlocked(redGhostPosition, randomDirection)) {

            switch (randomDirection) {
                case 'toLeft':
                    redGhost.style.left = redGhostPosition.left === 0 ? 900 + "px" : redGhostPosition.left - 100 + "px"
                    break
                case 'toRight':
                    redGhost.style.left = redGhostPosition.left === 900 ? 0 : redGhostPosition.left + 100 + "px"
                    break
                case 'toTop':
                    redGhost.style.top = redGhostPosition.top - 100 + "px"
                    break
                case 'toBottom':
                    redGhost.style.top = redGhostPosition.top + 100 + "px"
                    break
            }
            redGhostPosition = getPositionOf(redGhost)
            pacManPosition = getPositionOf(pacMan)
            if(redGhostPosition.left+"px" === pacManPosition.left+"px" && redGhostPosition.top+"px" === pacManPosition.top+"px"){
                movePacMan()
                isGameOver()
            };
        } else {
            moveRedGhost() // La fonction est relancée si le fantôme est bloqué
            return
        }

    }, 250)
}
const moveBlueGhost = () => {
    clearInterval(blueGhostInterval)

    let blueGhostPosition = getPositionOf(blueGhost)

    // générer un "to" aléatoire
    // À SUPPRIMER APRÈS LE POINT ⭐️
    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'

    // SI NOUS VOULONS AMÉLIORER LE DÉPLACEMENT, IL FAUDRA REMPLACER LES DEUX LIGNES PRÉCÉDENTES PAR UNE SOLUTION DE CE GENRE
    // let filtredDirections = directions.filter((direction) => {
    //     return direction !== currentRedGhostDirection && ????
    // })

    blueGhostInterval = setInterval(() => {
        currentBlueGhostDirection = randomDirection

        if (!isTheCharacterBlocked(blueGhostPosition, randomDirection)) {

            switch (randomDirection) {
                case 'toLeft':
                    blueGhost.style.left = blueGhostPosition.left === 0 ? 900 + "px" : blueGhostPosition.left - 100 + "px"
                    break
                case 'toRight':
                    blueGhost.style.left = blueGhostPosition.left === 900 ? 0 : blueGhostPosition.left + 100 + "px"
                    break
                case 'toTop':
                    blueGhost.style.top = blueGhostPosition.top - 100 + "px"
                    break
                case 'toBottom':
                    blueGhost.style.top = blueGhostPosition.top + 100 + "px"
                    break
            }
            blueGhostPosition = getPositionOf(blueGhost)
            pacManPosition = getPositionOf(pacMan)
            if(blueGhostPosition.left+"px" === pacManPosition.left+"px" && blueGhostPosition.top+"px" === pacManPosition.top+"px"){
                movePacMan()
                isGameOver()
            };
        } else {
            moveBlueGhost() // La fonction est relancée si le fantôme est bloqué
            return
        }
    }, 250)
}
const movePinkGhost = () => {
    clearInterval(pinkGhostInterval)

    let pinkGhostPosition = getPositionOf(pinkGhost)

    // générer un "to" aléatoire
    // À SUPPRIMER APRÈS LE POINT ⭐️
    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'

    // SI NOUS VOULONS AMÉLIORER LE DÉPLACEMENT, IL FAUDRA REMPLACER LES DEUX LIGNES PRÉCÉDENTES PAR UNE SOLUTION DE CE GENRE
    // let filtredDirections = directions.filter((direction) => {
    //     return direction !== currentRedGhostDirection && ????
    // })

    pinkGhostInterval = setInterval(() => {
        currentPinkGhostDirection = randomDirection

        if (!isTheCharacterBlocked(pinkGhostPosition, randomDirection)) {

            switch (randomDirection) {
                case 'toLeft':
                    pinkGhost.style.left = pinkGhostPosition.left === 0 ? 900 + "px" : pinkGhostPosition.left - 100 + "px"
                    break
                case 'toRight':
                    pinkGhost.style.left = pinkGhostPosition.left === 900 ? 0 : pinkGhostPosition.left + 100 + "px"
                    break
                case 'toTop':
                    pinkGhost.style.top = pinkGhostPosition.top - 100 + "px"
                    break
                case 'toBottom':
                    pinkGhost.style.top = pinkGhostPosition.top + 100 + "px"
                    break
            }
            pinkGhostPosition = getPositionOf(pinkGhost)
            pacManPosition = getPositionOf(pacMan)
            if(pinkGhostPosition.left+"px" === pacManPosition.left+"px" && pinkGhostPosition.top+"px" === pacManPosition.top+"px"){
                movePacMan()
                isGameOver()
            };
        } else {
            movePinkGhost() // La fonction est relancée si le fantôme est bloqué
            return
        }
    }, 250)
}


const displayDots = () => {
    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
            if( !(( col >= 0 && col <= 1) &&  (row === 3 || row ===5) || (col >= 4 && col <= 5) && (row === 4 ) || (col >= 8 && col <= 9) && (row === 3 || row ===5))){
                const dot = document.createElement('div')
                dot.className = 'dot'
                dot.style.left = col * 100 + 'px'
                dot.style.top = row * 100 + 'px'
                map.insertBefore(dot, pacMan)
            }
        }
    }
    // Reste à faire disparaître les 10 pac-gommes superflues
}

const start = () => {
    moveRedGhost()
    moveBlueGhost()
    movePinkGhost()
    displayDots()
}


// Nous créons une variable vide au début du code
let userName

submit.addEventListener('click', (e) => {
    e.preventDefault()
//      VÉRIFIER ICI QUE inputName.value CONTIENT AU MOINS TROIS CARACTÈRES
    if  (userName = inputName.value.length<3)
    {
        alert("Attention : Votre pseudo doit contenir 3 lettres au minimum !");
    }
    //      LANCER LA PARTIE ICI !

})

function cacherFormulaire(){
    if  (userName = inputName.value.length>=3){
        document.getElementById("formulaire").style.display = "none";
    }
}



//Fantôme suit Pacman
const getDelta = () => {
    const redGhostPosition = getPositionOf(redGhost)
    const pinkGhostPosition = getPositionOf(pinkGhost)
    const blueGhostPosition = getPositionOf(blueGhost)
    const pacManPosition = getPositionOf(pacMan)
    if (level >= 2){
        const top = pacManPosition.top - redGhostPosition.top
        const left = pacManPosition.left - redGhostPosition.left
        let topDirection, leftDirection
        if (top === 0) topDirection = null
        else topDirection = top > 0 ? 'toBottom' : 'toTop'
        if (left === 0) leftDirection = null
        else leftDirection = left > 0 ? 'toRight' : 'toLeft'
        return { top, left, topDirection, leftDirection }
    }
    else if (level >= 3){
        const top = pacManPosition.top - blueGhostPosition.top
        const left = pacManPosition.left - blueGhostPosition.left
        let topDirection, leftDirection
        if (top === 0) topDirection = null
        else topDirection = top > 0 ? 'toBottom' : 'toTop'
        if (left === 0) leftDirection = null
        else leftDirection = left > 0 ? 'toRight' : 'toLeft'
        return { top, left, topDirection, leftDirection }
    }
    if (level >= 4){
        const top = pacManPosition.top - pinkGhostPosition.top
        const left = pacManPosition.left - pinkGhostPosition.left
        let topDirection, leftDirection
        if (top === 0) topDirection = null
        else topDirection = top > 0 ? 'toBottom' : 'toTop'
        if (left === 0) leftDirection = null
        else leftDirection = left > 0 ? 'toRight' : 'toLeft'
        return { top, left, topDirection, leftDirection }
    }
}




const url = 'index.php?controller=ajax';
let posts = [];
const ul = document.querySelector('ul');
const titleInput = document.querySelector('[type="text"]');
const messageArea = document.querySelector('.message');

window.fetch(url).then(
    // Les fonctions retournent toujours une valeur
    // Si elles retournent rien, la valeur retournée est void
    // result => result.json() // Le retour de la valeur est implicite
    // result => {
    //     console.log(result);
    //     return result.json()
    // }
    result => result.json()
).then(
    json => {
        console.log(json);// [{...},{...},{...}]
        posts = json.reverse(); // [{...},{...},{...}]
        //.reverse() pour metre les derniers post au dessus de la list
        const postsList = posts.map(post => {
            console.log(post);
            return `<li>${post.pseudo} ${post.score}(user #${ post.user_id } )</li>`
        }); // [<li>...</li>,<li>...</li>,<li>...</li>]
        const ulContent = postsList.join('et puis'); // <li>...</li>et puis<li>...</li>,<li>...</li>

        // Pour faire une condition, l'opérateur ternaire pour mettre ou non un s
        // const stock = `Il reste ${stock} chocolatine${ stock > 1 ? 's' : ''} chez le boulanger`
        ul.innerHTML = ulContent;
    }
).catch(
    error => console.log(error)
);

submit.addEventListener('click', event => {
    event.preventDefault() //pour ne pas qu'il recharge la page ESSENTIEL

    // récupérer les données du formulaire
    const pseudo = titleInput.value;
    const score = scoreUser;
    const user_id = 1;
    titleInput.value = ''; //pour le vider après
    scoreUser = '';
    // Le JS bénéficie de JSON.stringify() pour transformer un objet en JSON
    // Le JS bénéficie de JSON.parse() pour transformer un JSON en objet
    // Le JS bénéficie de .json() pour transformer un JSON en objet en passant par une promesse
    fetch('index.php?controller=ajax', {
        method: 'POST',
        body: JSON.stringify({
            //pseudo: pseudo,
            //body: body,
            //user_id: user_id

            // SEULEMENT QUAND LES DEUX NOMS SONT IDENTIQUES
            score,
            pseudo,
            user_id
        }),
        //on dit au serveur qu'on lui envoie du json et on lui précise UTF-8
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(
            response => response.json()
        ).then(
        json => {
            console.log(json)

            if(json.error){
                messageArea.innerHTML = json.error;
            }
            else{
                // Si pas de message d'erreur mettre à jour le tableau posts
                // posts = posts.push(json) ca c'est ce qu'on faisait avant
                posts = [json.newPost, ...posts]; //[{...},{...},{...},{...},{nouvelle élément}]

                // Mettre à jour le <ul>
                const postsList = posts.map(post => `<li>${post.pseudo} ${post.score} (user #${ post.user_id })</li>`);
                const ulContent = postsList.join('et puis');
                ul.innerHTML = ulContent;

                messageArea.innerHTML = json.message;
            }
        }
    ).catch(
        error => console.log(error)
    )
})



const button = document.querySelector('button');

button.addEventListener('click', event => {
    window.fetch(url).then(
        // Les fonctions retournent toujours une valeur
        // Si elles retournent rien, la valeur retournée est void
        // result => result.json() // Le retour de la valeur de la valeur est implicite
        result => {
            console.log(result);
            return result.json()
        }
    ).then(
        json => {
            console.log(json);// [{...},{...},{...}]
            posts = json; // [{...},{...},{...}]
            const postsList = posts.map(post => {
                console.log(post);
                return `<li>${post.pseudo} ${post.score} (user #${ post.user_id })</li>`
            }); // [<li>...</li>,<li>...</li>,<li>...</li>]
            const ulContent = postsList.join('et puis'); // <li>...</li>et puis<li>...</li>,<li>...</li>

            // Pour faire une condition, l'opérateur ternaire pour mettre ou non un s
            // const stock = `Il reste ${stock} chocolatine${ stock > 1 ? 's' : ''} chez le boulanger`
            ul.innerHTML = ulContent;
        }
    ).catch(
        error => console.log(error)
    );

});



const isGameOver = () => {
    const redGhostPosition = getPositionOf(redGhost)
    const pinkGhostPosition = getPositionOf(pinkGhost)
    const blueGhostPosition = getPositionOf(blueGhost)
    const pacManPosition = getPositionOf(pacMan)
    if ((redGhostPosition.top === pacManPosition.top && redGhostPosition.left === pacManPosition.left)
        || (pinkGhostPosition.top === pacManPosition.top && pinkGhostPosition.left === pacManPosition.left)
        || (blueGhostPosition.top === pacManPosition.top && blueGhostPosition.left === pacManPosition.left))
    {
        redGhost.style.display = "none"
        blueGhost.style.display = "none"
        pinkGhost.style.display = "none"
        pacMan.style.display = "none"
        gameOverDiv.style.display = "block"
        gameOverDiv.style.display = "block"
        gameOverDiv.style.zIndex = "5"
        form.style.display = "block"
        return true

    }
    return false
}
























































































