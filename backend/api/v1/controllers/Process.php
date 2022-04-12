<?php
namespace api\v1\controllers;

use api\v1\models\process\Process as modelProcess;

class Process
{
 
    public function actionAddUser()
    {
        return modelProcess::addUser();
    }

    public function actionLeaderboard()
    {
        return modelProcess::leaderboard();
    }

}
