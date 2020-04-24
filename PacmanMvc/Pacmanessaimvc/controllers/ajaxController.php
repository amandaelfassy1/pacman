<?php
require 'models/Players.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $allPlayers = getPlayers();
    echo json_encode($allPlayers);
}
else {
    $db = dbConnect();
    $encodedData = file_get_contents("php://input");
    $data = json_decode($encodedData, true);

    if (empty($data['pseudo'])) {
        $answer = [
            'error' => 'Nom obligatoire'
        ];
    } else {

        //Fonction dans le model qui vérifie si le nom existe déjà en db
        $PacmanUserExist = doesPlayerExist($data);

        //Si le nom existe db on fait le if
        if ($PacmanUserExist) {
            //Si le score envoyé est supérieur à celui en db on met à jour les donées
            if ($PacmanUserExist['score'] < $data['score']) {
                updatePlayerInformations($data);
            } //Si il est inférieur on affiche un message
            else {
                $answer = [
                    'error' => 'Ce nom existe déjà en DB. Malheureusement, votre score est inférieur à celui déjà existant.'
                ];
                echo json_encode($answer);
            }
            //Si le nom n'existe pas en DB on insert
        } else {
            $result = add($data);
            $answer = [
                'message' => $result ? 'Nouveau score enregistré' : 'score non enregistré',
                'newPost' => $data,
                'newAccount' => false
            ];
        }
        echo json_encode($answer);
    }

}


