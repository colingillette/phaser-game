<?php

  session_start();

  if ($_SERVER["REQUEST_METHOD"] == "POST")
  {
    $display = test_input($_POST["displayname"]);
    $score = test_input($_POST["score"]);
    $level = test_input($_POST["level"]);
  }

  // Enforce logic on display name before saving it to the database
  $display = enforce_input_logic($display);

  // Store data and close connection
  store_data($display, $score, $level);

  // Redirect user back to game
  header('Location: index.html');

  // Sanitizes input
  function test_input($data)
  {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  // Makes sure our displayname data makes sense for our purposes
  function enforce_input_logic($data)
  {
    if (is_null($data) || !isset($data) || $data == "")
    {
      $data = "Guest";
    }

    if (iconv_strlen($data) > 30)
    {
      $data = substr($data, 0, 30);
    }

    // Clear out some troublesome words and characters
    $forbidden = array(":", ";", "*", "drop", "select", "from");
    foreach ($forbidden as $item)
    {
      $data =  str_ireplace($item, "", $data);
    }

    return $data;
  }

  // Store data in the database
  function store_data($display, $score, $level)
  {
    // Create database connection
    $servername = "localhost";
    $sqlusername = "cag35";
    $sqlpassword = "cag35";
    $dbname = "platformer";
    $conn = new mysqli($servername, $sqlusername, $sqlpassword, $dbname);
    
    // Check for any connection errors
    if (mysqli_connect_errno())
    {
      $_SESSION["error"] = "Failed to connect to database";
      header('Location: failure.php');
      exit();
    }

    $sql = mysqli_prepare($conn, "INSERT INTO platformer.scores (display_name, score, level, datetime) VALUES (?, ?, ?, ?);");
    mysqli_stmt_bind_param($sql, 'siis', $displayName, $scoreValue, $levelValue, $datetime);
    $displayName = $display;
    $scoreValue = (int)$score;
    $levelValue = (int)$level;
    $datetime = date('Y-m-d H:i:s');

    mysqli_stmt_execute($sql);
    mysqli_stmt_close($sql);

    mysqli_close($conn);
  }
?>