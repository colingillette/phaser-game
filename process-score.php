<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST")
  {
    $display = test_input($_POST["displayname"]);
  }

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
  if (!mysqli_ping($conn))
  {
    $_SESSION["error"] = "The connection to the server is not active";
    header('Location: failuer.php');
    exit();
  }

  $display = enforce_input_logic($display);

  // Sends user back to game page
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
?>