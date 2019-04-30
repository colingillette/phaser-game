<?php session_start(); ?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Phaser Platformer</title>
    <link href="main.css" type="text/css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Gentium+Basic|Proza+Libre" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <script src="//cdn.jsdelivr.net/npm/phaser@3.16.2/dist/phaser.js"></script>
</head>
<body>
    <header>
        <h1 id="title">We're Sorry!</h1>
    </header>
    <article>
        <h2>There seems to have been an issue when storing your score.</h2>

        <p>
            It looks like we had the following error: <?php echo $_SESSION["error"]; ?>
        </p>

        <p>
            You can click <a href="index.html">here</a> to return to the game and try again.
        </p>
    </article>
</body>
</html>