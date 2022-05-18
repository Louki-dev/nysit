<?php

namespace api\v1\models\process;

use core\misc\Database;
use core\misc\Defaults;
use core\misc\Utilities;


class Process
{

    public static function addUser()
    {
        $userName = Utilities::fetchRequiredDataFromArray($_POST, 'username');
        $userScore = Utilities::fetchDataFromArray($_POST, 'score');

        $checkuser = (new Database())->processQuery("SELECT * FROM users WHERE `user_name` = ?", [$userName]);

        // if ($userScore == '0'){
        //     $userScore = 1;
        // }
        if (!empty($checkuser)){
            foreach($checkuser as $existData){
                $existUserId = $existData['user_id'];
                $users = (new Database())->processQuery("UPDATE users SET `user_updated_at` = CURRENT_DATE WHERE `user_name` = ?", [$userName]); 
                $emptyScore = (new Database())->processQuery("UPDATE ranks SET `rank_score` = ? WHERE `rank_user_name` = ?", [null, $existUserId]); 
                $output = (new Database())->processQuery("UPDATE ranks SET `rank_score` = ? WHERE `rank_user_name` = ?", [$userScore, $existUserId]); 
            }    
            
        }else{
            $users = (new Database())->processQuery("INSERT INTO users (`user_name`) VALUES (?)", [$userName]);
            $output = (new Database())->processQuery("INSERT INTO ranks (rank_user_name, rank_score) VALUES (?,?)", [$users['last_inserted_id'], $userScore]);
        }

        
        return Utilities::response(((!empty($output['response']) && $output['response'] == Defaults::SUCCESS) ? true : false), null, null);
    }

    public static function leaderboard(){

        $currentUser = Utilities::fetchDataFromArray($_GET, 'user');
        $currentUserComp = Utilities::fetchDataFromArray($_GET, 'user_comp');
        if ($currentUser == ""){
            $result = $currentUserComp;
        }else{
            $result = $currentUser;
        }

        $total = (new Database())->processQuery("SELECT count(*) as `count` FROM ranks LEFT JOIN users ON `user_id`  = rank_user_name ORDER BY rank_score DESC", []);
        
        // use DISTINCT in the GROUP_CONCAT to make sure there are no gaps in the rankings
        $users = (new Database())->processQuery("SELECT *, FIND_IN_SET( rank_score, (SELECT GROUP_CONCAT( DISTINCT rank_score ORDER BY rank_score DESC ) FROM ranks)) AS ranking FROM ranks LEFT JOIN users ON `user_id` = rank_user_name ORDER BY rank_score DESC", []);

        // GET pecified User Rank
        $user = (new Database())->processQuery("SELECT *, FIND_IN_SET( rank_score, (SELECT GROUP_CONCAT( DISTINCT rank_score ORDER BY rank_score DESC ) FROM ranks)) AS ranking FROM ranks LEFT JOIN users ON `user_id` = rank_user_name WHERE `user_name` = ? ORDER BY rank_score DESC", [$result]);

        return Utilities::response(true, null, ["user" => $user,"users" => $users, "count" => isset($total) && count(['count']) > 0 ? reset($total)['count'] : 0]);
    }

}
