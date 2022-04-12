<!-- include the header  -->
<?php require_once __DIR__ . "/include/index-header.inc.php"; ?>

</head>

<body>
  <!-- PRELOAD -->
  <div id="loader"></div> 

  <div class="container">

  <?php
    require_once __DIR__ . "/include/background-floating.inc.php";
    require_once __DIR__ . "/include/navigation.inc.php";
  ?>

      <!-- Start Title -->
      <span class="white-text fs-1 game-title" id="start-title">
        <span class="text center custom-font-start-title flow-text blue-grey-text text-lighten-3"></span>
        <span class="cursor">|</span>
      </span>

      <!-- Start Button -->
      <div class="start-button-div" id="start-button-div">
        <button class="waves-effect btn-flat mt-2 rounded z-depth-2 white-text custom-font" id="start-button"><p class="flow-text">< Play ></p></button>
      </div>

      <!-- Start Logo -->
      <i class="bi bi-code-square white-text start-logo start-button-div hide" id="start-logo"></i>

      
  <?php
    require_once __DIR__ . "/include/cards.inc.php";
    require_once __DIR__ . "/include/completed.inc.php";
    require_once __DIR__ . "/include/times-up.inc.php";
    require_once __DIR__ . "/include/leaderboard-table.inc.php";
  ?>

  </div>
  
</body>
</html>