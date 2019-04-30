<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST")
  {
    $display = test_input($_POST["displayname"]);
  }

  header('Location: index.html');

  function test_input($data)
  {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>