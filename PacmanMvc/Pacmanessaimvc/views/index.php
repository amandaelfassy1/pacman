<!DOCTYPE html>
<html lang="fr-FR">
<head>
    <meta charset="UTF-8">
    <title>Vanilla Pac-Man</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div class="pacman">
    <div class="score">
        <h3>level :</h3>
        <p id="level">1</p><br>
        <h3>Score :</h3>
        <p id="score">0</p><br>
    </div>
    <div id ="parent" class="map" >
        <img src="img/pacman.gif" alt="Pacman" data-top="500" data-left="500">
        <img src="img/red-ghost.png" alt="Pacman" data-top="300" data-left="400">
        <img src="img/blue-ghost.png" alt="Pacman"data-top="300" data-left="400">
        <img src="img/pink-ghost.png" alt="Pacman"data-top="300" data-left="400">
        <img src="img/background.svg" alt="Labyrinthe">

        <div class="GameOver">
            <div id="formulaire" class="name" >
                <div class="form">
                    <form>
                        <h1>GAME OVER !!</h1>
                        <input type="text" placeholder="Entrez un pseudo (3 charactères min)" size="31%" class="text_input"autofocus required>
                        <div class="divScore"><span id="scoreUser"></span></div>
                        <input type="submit" class="submit_input" value="Enregistrer" onclick="cacherFormulaire()"/>
                        <div class="message"></div>

                    </form>
                </div>
                <div>
                    <a href="index.php">Rejouer !</a>
                </div>
            </div>
        </div>
    </div>
    <div>
        <button>Tableau des 10 meilleurs scores</button>
        <ul></ul>
    </div>
    <script type="text/javascript" src="assets/main.js"></script>
</div>
</body>
</html>

