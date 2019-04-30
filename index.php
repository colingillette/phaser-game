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
        <h1 id="title">Phaser.js Platformer!</h1>
    </header>

    <article>
        <h2 class="article-header">Welcome to My Phaser.js Platform Game</h2>
        <p>
            This is a simple, random-generation driven game that implements a neat library called 
            <a href="https://phaser.io/">Phaser.js</a>. This is an open-source JavaScript library
            that was designed for browser-based JavaScript video games.
        </p>
        <p>
            The site also uses PHP and MySQL to store user scores and data that can be displayed in
            the webpage. See the <a href="https://github.com/colingillette/phaser-game">GitHub</a> page
            for this project to check on any technical requirements or setup that may be required.
        </p>
    </article>

    <article>
        <h2 class="article-header">How do I Play?</h2>
        <p>
            The object of the game is very simple: collect the stars and avoid the bombs. Each level ends when all the
            stars are collected. A game will end if your character is hit by a bomb. As the levels progress, the gameplay 
            becomes much more difficult, adding more stars and bombs to impede your progress. Your player, having gained experience
            from the previous level they survived, will become slightly faster after each level as well.
        </p>
        <p>
            The game only requires directional arrows to play!
        </p>

        <table>
            <tr>
                <th><span class="glyphicon glyphicon-arrow-up"></span></th>
                <th><span class="glyphicon glyphicon-arrow-left"></span></th>
                <th><span class="glyphicon glyphicon-arrow-right"></span></th>
            </tr>
            <tr>
                <td>Allows the character to jump</td>
                <td>Moves the character left</td>
                <td>Moves the character right</td>
            </tr>
        </table>

        <p>
            Once you're done playing the game, hit the <b>Submit</b> button below to save your score. 
            Don't forget to look and see how you compare to other players!
        </p>
    </article>

    <section id="gamespace">
        <h2 class="article-header">Play the Game!</h2>
        <script src="game.js"></script>
    </section>
    
    <article>
        <h2 class="article-header" id="score-submit-header">Submit your score!</h2>
        <form name="form" action="process-score.php" method="POST">
            <br>
            <label for="displayname">Display Name:&nbsp;</label><input type="text" name="displayname" id="displayname" value="Guest"><br>
            <label for="score">Score:&nbsp;</label><input type="text" name="score" id="score" value="0" readonly><br>
            <label for="level">Level:&nbsp;</label><input type="text" name="level" id="level" value="1" readonly><br><br>
            <input type="submit" id="submit" name="submit" value="Submit" onclick="return validateDisplay();">
        </form>
    </article>
    
    <article>
        <h2 class="article-header">Top 10 Scores</h2>
    </article>

</body>
</html>