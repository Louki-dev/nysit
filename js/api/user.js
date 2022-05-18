(function () {
    
    function ajaxRequest(payload = null, options = null, callback, errocallback = null) {
        try {
            var defaults = {
                type: "POST",
                cache: false,
                async: true,
                processData: true,
            }

            var object = {
                data: payload,
                dataType: "json",
                success: function (response) {
                    callback(response);
                },

                error: function (response) {
                    if (errocallback) {
                        errocallback(response);
                    }
                }
            };

            // assign the variables and return as parameters
            var ajaxRequest = Object.assign({}, object, defaults, options);

            return $.ajax(ajaxRequest);

        } catch (e) {
            alert(e);
        }
    return true;
    }
    
    $(document).ready(function (e) {

        // INSERTING DATA
        $(document).on("click", "#user-form-button", function (e) {
            document.getElementById('button_loader').classList.remove("hide");
            document.getElementById('user-form-button').disabled = true;

            var userscore = document.getElementById('input-score').value
            var name = $('#user-form-input').val();

            // assign variables for payload
            var data = {
                username: name,
                score:  userscore,
            };

            addUser(data);
        });

        $(document).on("click", "#user-form-completed-button", function (e) {
            document.getElementById('button_loader').classList.remove("hide");
            document.getElementById('user-form-completed-button').disabled = true;

            var userscore = document.getElementById('input-score').value
            var name = $('#user-form-completed-input').val();

            // assign variables for payload
            var data = {
                username: name,
                score:  userscore,
            };

            CompletedUser(data);
        });
    });


    // ALL FUNCTIONS HERE   

    function addUser(data) {
        ajaxRequest(data,
            {
                url: user_api,
                type: "POST",
                dataType: "json",
            },
            function (response_data) {
                if (response_data.status == true) {
                    // gsap here and display scoreboard
                    const table_tl = gsap.timeline({ defaults: { duration: 0.75 } })

                    table_tl.fromTo('#user-form-div', { opacity: 1 }, {
                        opacity: 0,
                        onComplete: function () { 
                            document.getElementById('button_loader').classList.add("hide");
                            $("#table-scoreboard").load(displayLeaderboard()); // load ranks after user form is hidden
                        }
                    });  
                    
                    table_tl.fromTo('#table-scoreboard', {
                        opacity: 0,
                        onComplete: function () {
                            document.getElementById('table-scoreboard').classList.remove('hide');
                            document.getElementById('area').classList.remove('hide');

                        }}, { opacity: 1 });
                } 
            });
    }

    function CompletedUser(data) {
        ajaxRequest(data,
            {
                url: user_api,
                type: "POST",
                dataType: "json",
            },
            function (response_data) {
                if (response_data.status == true) {
                    // gsap here and display scoreboard
                    const table_tl = gsap.timeline({ defaults: { duration: 0.75 } })

                    table_tl.fromTo('#user-form-completed-div', { opacity: 1 }, {
                        opacity: 0,
                        onComplete: function () { 
                            document.getElementById('button_loader').classList.add("hide");
                            $("#table-scoreboard").load(displayLeaderboard()); // load ranks after user form is hidden
                        }
                    });  
                    
                    table_tl.fromTo('#table-scoreboard', {
                        opacity: 0,
                        onComplete: function () {
                            document.getElementById('table-scoreboard').classList.remove('hide');
                            document.getElementById('area').classList.remove('hide');

                        }}, { opacity: 1 });
                } 
            });
    }


    function displayLeaderboard()  {
        var name = $('#user-form-input').val();
        var completed_name = $('#user-form-completed-input').val();
        ajaxRequest(
            {
            user: name,
            user_comp: completed_name
            },
            {
                url: leaderboard_api,
                type: "GET",
                dataType: "json"
            },
            function (response_data) {
                if (response_data.status == true) {
                    if (response_data.content != null) {
                        if (response_data.content.users.length > 0) {
                            $('#table-paginate').pagination({
                                dataSource: response_data.content.users,
                                pageSize: 5,
                                showPageNumbers: false,
                                showNavigator: true,
                                callback: function (data, pagination) {
                                    generateLeaderboard('#table-body', data, response_data.content.user); // display data from response
                                }
                            })
                            generateUserRank('#current_rank', response_data.content.user);
                        }
                    }
                }
            });
    }

    function generateLeaderboard($table_id_name, $content, $current) {

        $($table_id_name).empty(); //empty the data first before adding or append to avoid replication

        for (var num = 0; num < $content.length; num++) {
            // place the data from content users
            $html = [
                $current[0].user_name == $content[num].user_name ? '<tr class="score white-text">' : '<tr class="">',
                '<td>'+ $content[num].ranking +'</td>',
                '<td>'+$content[num].user_name+'</td>',
                '<td class="white-text">'+$content[num].rank_score+'</td>',
                '</tr>'
            ]
            $($table_id_name).append($html.join("")); //returns an array as a string and append it to the table
        }

    }

    function generateUserRank($user_rank, $content) {
        $($user_rank).empty();

        $html = [
            '<span class="white-text blue-grey-text text-lighten-3 custom-font-start-title"><span class="teal-text text-lighten-3">YOU</span> [' + $content[0].user_name + ' - ' + $content[0].rank_score + '] - <span class="teal-text text-lighten-3">RANK</span> ' + $content[0].ranking + '</span>',
        ]

        $($user_rank).append($html.join("")); //returns an array as a string and append it to the table
        
    }
    
})();