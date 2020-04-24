<?php

function getPlayers()
{
    $db= dbConnect();
    $query = $db ->query('SELECT * FROM players ORDER BY score DESC limit 10');
    $posts = $query->fetchAll();
    return $posts;
}


function add($data)
{
    $db = dbConnect();
    $query = $db->prepare('INSERT INTO players(pseudo, score, user_id) VALUES (?,?,?)');
    $result = $query-> execute(
        array(
            $data['pseudo'],
            $data['score'],
            $data['user_id'],
        ));
    return $result;
}
function doesPlayerExist($data){
    $db = dbConnect();
    $query = $db->prepare('SELECT * FROM players WHERE pseudo = :UserName');
    $query->execute(
        [
            'UserName' => $data['pseudo'],
        ]
    );
    $PacmanUserExist = $query->fetch();

    return $PacmanUserExist;
}

function updatePlayerInformations($data){
    $db = dbConnect();
    $query = $db->prepare('UPDATE players SET pseudo = :UserName, score = :UserScore, user_id = :UserId WHERE pseudo = :UserName ');
    $result = $query->execute(
        [
            'UserName' => $data['pseudo'],
            'UserScore' => $data['score'],
            'UserId' => $data['user_id'],
        ]
    );

    return $result;
}