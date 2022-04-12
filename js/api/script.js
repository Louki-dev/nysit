(function () {
    $(document).ready(function (e) {

        let que_count = 0,
            counter, //declare variable
            timeValue = 0; //start timer
        

        // if Start button is clicked
        $(document).on("click", "#start-button", function (e) { 
            const tl = gsap.timeline({ defaults: { duration: 0.75 } })
            
            tl.fromTo('#start-title', { opacity: 1 }, { opacity: 0 });
            tl.fromTo('#start-button-div', { opacity: 1 }, { opacity: 0 }, '<'); 

            tl.fromTo('#start-logo',
            {
            opacity: 0,
                onComplete: function () {
                    document.getElementById('start-logo').classList.remove("hide");
                }
            },{ opacity: 1 });
            tl.fromTo('.start-logo',
            {
            y: 0, rotation: '0deg'},
            {
            y: 0, rotation: ($(window).width() > 755 ? '180deg' : '270deg'),  // window is above 755 
                onComplete: function() {
                    document.getElementById('start-button-div').style.display = "none"; //hide the element
                    document.getElementById('nav-div').classList.remove("hide"); //remove class name
                    document.getElementById('time-div').classList.remove("hide");
                    document.getElementById('instruction-div').classList.remove("hide");
                    document.getElementById('option-div').classList.remove("hide");
                    document.getElementById('area').classList.add("hide");
                    document.getElementById('start-logo').classList.add("hide");

                    shuffleQuestions();
                    showQuestion(que_count);
                    startTimer(timeValue);
                }
            });        
        });

       
        function showQuestion(item) {
            const que_card = document.getElementById('que_card');
            
            // get the option key from questions.js and sort option in random
            var card = question[item].option.sort(() => Math.random() - .5);

            let que_card_content =
                // Left Card
                '<div class="image-parent">' + 
                '<div class="card trans-bg img" id="img1-left">' +
                '<div class="card-image">' +
                '<img src="' + card[0] + '" class="rounded-image mouse-pointer hoverable " id="option_1" alt="Option 1">' +
                '<div class="btn-floating halfway-fab mouse-default hide" id="selected-icon1"><i class="bi" id="selected-color1"></i></div>' +
                '</div></div>' +

                // Right Card
                '<div class="card trans-bg img" id="img2-right">' +
                '<div class="card-image">' +
                '<img src="' + card[1] + '" class="rounded-image mouse-pointer hoverable " id="option_2" alt="Option 2">' +
                '<div class="btn-floating halfway-fab mouse-default hide" id="selected-icon2"><i class="bi" id="selected-color2"></i></div>' +
                '</div></div></div>' +

                // Description / differences
                '<span class="parent-div text-light custom-font mt-3 mb-4"><div class="btn-floating btn-small mouse-default" id="desc-ans"><i class="bi" id="desc-icon"></i></div><span class="fs-1 ml-2 custom-font flow-text" id="desc-text">' + question[item].differnce + '</span></span>';
            
            // append the content to display
            que_card.innerHTML = que_card_content;
            
            //hide COMPARE and NEXT buttons when the page load
            document.getElementById('compare-next-text').classList.add("hide"); 
            document.getElementById('compare-next-btn').classList.add("hide"); 

            // hide description
            document.getElementById('desc-ans').classList.add("hide"); 
            document.getElementById('desc-text').classList.add("hide"); 


            // unhide instruction when the page load
            document.getElementById('instruction-div').classList.remove("hide"); 

            //once media or window is below 755
            if($(window).width() < 755)
            {
                // card animation up & down
                gsap.fromTo('#img1-left', { y: 160 }, { y: 0, duration: .2 });
                gsap.fromTo('#img2-right', { y: -150 }, { y: 0 , duration: .2 });

            } else {
                // card animation left & right
                gsap.fromTo('#img1-left', { x: 160 }, { x: 0, duration: .2 });
                gsap.fromTo('#img2-right', { x: -150 }, { x: 0 , duration: .2 });

            }

        }

        // if user choose option 1
        $(document).on("click", "#option_1", function (e) {
            let userAns = document.getElementById('option_1').src;
            let userIcon1 = document.getElementById('selected-icon1');
            let userIcon2 = document.getElementById('selected-icon2');
            let userColor1 = document.getElementById('selected-color1');  
            let userColor2 = document.getElementById('selected-color2'); 
            let option1 = document.getElementById('option_1');
            let option2 = document.getElementById('option_2');
            let correctAns = question[que_count].answer;
            let user_score = parseInt(document.getElementById('input-score').value);
            let qscore = 0;

            if (userAns == correctAns) {
                userIcon1.classList.add("teal");
                userIcon1.classList.remove("hide");
                userIcon2.classList.add("red");
                userIcon2.classList.remove("hide");
                userColor1.classList.add("bi-check-lg");
                userColor2.classList.add("bi-x");
                document.getElementById('img2-right').classList.add("hide");
                document.getElementById('desc-ans').classList.add("teal"); 
                document.getElementById('desc-icon').classList.add("bi-check-lg"); 
                
                // sum user score
                qscore += user_score + question[que_count].score;
                
                gsap.fromTo('#user_score', {
                    opacity: 0,
                    onComplete: function () {
                        document.getElementById('user_score').innerHTML = qscore;
                        document.getElementById('input-score').value = qscore;
                    },
                }, {
                    opacity: 1
                });
                
            } else {
                userIcon1.classList.add("red");
                userIcon1.classList.remove("hide");
                userIcon2.classList.add("teal");
                userIcon2.classList.remove("hide");
                userColor1.classList.add("bi-x");
                userColor2.classList.add("bi-check-lg");
                document.getElementById('img2-right').classList.add("hide");    
                document.getElementById('desc-ans').classList.add("red");    
                document.getElementById('desc-icon').classList.add("bi-x");     

            }

            // gsap animation for icons and description 
            gsap.fromTo('#selected-icon1', {scale: 0 }, { duration: 1, ease: "elastic.out(2, 0.3)", scale: 1});
            gsap.fromTo('#desc-ans', { opacity: 0 }, { duration: 1, opacity: 1 });
            gsap.fromTo('#desc-text', { opacity: 0 }, { duration: 1, opacity: 1 });

            
            //once user selected, hide the instruction 
            document.getElementById('instruction-div').classList.add("hide"); 

            //once user selected, unhide COMPARE and NEXT buttons
            document.getElementById('compare-next-text').classList.remove("hide"); 
            document.getElementById('compare-next-btn').classList.remove("hide"); 

            //unhide description
            document.getElementById('desc-ans').classList.remove("hide"); 
            document.getElementById('desc-text').classList.remove("hide"); 

            //once user selected, disabled all options
            option1.classList.add("disabled");
            option2.classList.add("disabled");

            // stops the timer or setInterval
            clearInterval(counter);
        });

        // if user choose option 2
        $(document).on("click", "#option_2", function (e) {
            let userAns = document.getElementById('option_2').src;
            let userIcon1 = document.getElementById('selected-icon1');
            let userIcon2 = document.getElementById('selected-icon2');
            let userColor1 = document.getElementById('selected-color1');  
            let userColor2 = document.getElementById('selected-color2');   
            let option1 = document.getElementById('option_1');
            let option2 = document.getElementById('option_2');
            let correctAns = question[que_count].answer;
            let user_score = parseInt(document.getElementById('input-score').value);
            let qscore = 0;

            if (userAns == correctAns) {
                userIcon1.classList.add("red");
                userIcon1.classList.remove("hide");
                userIcon2.classList.add("teal");
                userIcon2.classList.remove("hide");
                userColor1.classList.add("bi-x");
                userColor2.classList.add("bi-check-lg");
                document.getElementById('img1-left').classList.add("hide");
                document.getElementById('desc-ans').classList.add("teal");      
                document.getElementById('desc-icon').classList.add("bi-check-lg");  
                
                // sum user score
                qscore += user_score + question[que_count].score;

                gsap.fromTo('#user_score', {
                    opacity: 0,
                    onComplete: function () {
                        document.getElementById('user_score').innerHTML = qscore;
                        document.getElementById('input-score').value = qscore;
                    },
                }, {
                    opacity: 1
                });
                
            } else {
                userIcon1.classList.add("teal");
                userIcon1.classList.remove("hide");
                userIcon2.classList.add("red");
                userIcon2.classList.remove("hide");
                userColor1.classList.add("bi-check-lg");
                userColor2.classList.add("bi-x");
                document.getElementById('img1-left').classList.add("hide");
                document.getElementById('desc-ans').classList.add("red");        
                document.getElementById('desc-icon').classList.add("bi-x");   
                
                
            }

            // gsap animation for icons and description 
            gsap.fromTo('#selected-icon2', {scale: 0 }, {  scale: 1, duration: 1, ease: "elastic.out(2, 0.3)" });
            gsap.fromTo('#desc-ans', { opacity: 0 }, { duration: 1, opacity: 1 });
            gsap.fromTo('#desc-text', { opacity: 0 }, { duration: 1, opacity: 1 });
            
            //once user selected, unhide the instruction 
            document.getElementById('instruction-div').classList.add("hide"); 

            //once user selected, unhide COMPARE and NEXT buttons
            document.getElementById('compare-next-text').classList.remove("hide"); 
            document.getElementById('compare-next-btn').classList.remove("hide"); 
            
            //unhide description
            document.getElementById('desc-ans').classList.remove("hide"); 
            document.getElementById('desc-text').classList.remove("hide"); 

            //once user selected disabled all options
            option1.classList.add("disabled");
            option2.classList.add("disabled");

            // stops the timer or setInterval
            clearInterval(counter);
        });


        // if Compare Button is clicked 
        $(document).on("click", "#compare_button", function (e) {
           
            const check_class = document.getElementById('img2-right').classList.contains("hide"),
                card_right = document.getElementById('img2-right'),
                card_left = document.getElementById('img1-left');

            check_class ? card_right.classList.remove("hide") & card_left.classList.add("hide") : card_right.classList.add("hide") & card_left.classList.remove("hide");

        });


        // if Next Button is clicked and Question Comppleted
        $(document).on("click", "#next_button", function (e) {
            if (que_count < question.length - 1) {  // 0 < 10 = increment
                que_count++;
                showQuestion(que_count);
                clearInterval(counter);
                startTimer(timeValue);          
            } else {

                gsap.fromTo("#completed", 3.5, { rotationX: -90 }, { rotationX: 0, ease: Elastic.easeOut });
                gsap.fromTo("#completed", 1.2, { opacity: 0 }, { opacity: 1 }, '<');

                // display completed content
                document.getElementById('completed').classList.remove("hide");
                document.getElementById('time-div').classList.add("hide");
                document.getElementById('instruction-div').classList.add("hide");
                document.getElementById('option-div').classList.add("hide");
                document.getElementById('compare-next-text').classList.add("hide");
                document.getElementById('compare-next-btn').classList.add("hide");
                document.getElementById('nav-div').classList.add("hide");
                document.getElementById('area').classList.remove("hide");
                clearInterval(counter);
                que_count = 0; //reset the question
                document.getElementById('user_score-completed').innerHTML = document.getElementById('input-score').value;

                const completed_tl = gsap.timeline({ defaults: { duration: 0.75 } })

                completed_tl.fromTo('#desc-completed-div', {opacity: 0, onComplete: function () {
                    document.getElementById('desc-completed-div').classList.remove("hide");
                }
                }, { delay: 1.3, opacity: 1 });
                completed_tl.fromTo('#score-completed-div', {opacity: 0, onComplete: function () {
                    document.getElementById('score-completed-div').classList.remove("hide");
                }
                }, { opacity: 1 }, '<');
                completed_tl.to('#completed-text', { delay: 1.2, opacity: 0,  onComplete: function () {
                    // display user form
                    document.getElementById('score-completed-div').classList.add("hide");
                    document.getElementById('desc-completed-div').classList.add("hide");
                    document.getElementById('completed-text').classList.add("hide");
                    document.getElementById('user-form-completed-div').classList.remove("hide");
                    document.getElementById('user-form-completed-text').classList.remove("hide");
                    document.getElementById('user-form-completed-input').classList.remove("hide");
                    document.getElementById('user-form-completed-button').classList.remove("hide");
                }});
                completed_tl.fromTo('#user-form-completed-div', { opacity: 0 }, { opacity: 1 });   

            }
        });
        
        // shuffle all questions
        function shuffleQuestions() {
            question.sort(() => Math.random() - .5);
        }
     
        // Start timer when the game starts
        function startTimer(time) {
            counter = setInterval(timer, 100); //milliseconds, 0.1 in seconds
            const timecount = document.getElementById('time-sec');
            
            function timer() {
                timecount.style.width = time + "%";
                time++;

                if (time == 105) {
                    const time_tl = gsap.timeline({ defaults: { duration: 0.75 } })

                    // display time content
                    document.getElementById('times-up').classList.remove("hide");
                    document.getElementById('time-div').classList.add("hide");
                    document.getElementById('instruction-div').classList.add("hide");
                    document.getElementById('option-div').classList.add("hide");
                    document.getElementById('nav-div').classList.add("hide");
                    document.getElementById('area').classList.remove("hide");
                    clearInterval(counter);
                    document.getElementById('user_score-timesUp').innerHTML = document.getElementById('input-score').value;
                    
                    time_tl.fromTo('#score-div', {opacity: 0, onComplete: function () {
                        document.getElementById('score-div').classList.remove("hide");
                    }
                    }, { delay: 1.5, opacity: 1 });
                    time_tl.to('#times-up-text', { delay: 1, opacity: 0,  onComplete: function () {
                        
                        // display user form
                        document.getElementById('score-div').classList.add("hide");
                        document.getElementById('times-up-text').classList.add("hide");
                        document.getElementById('user-form-div').classList.remove("hide");
                        document.getElementById('user-form-text').classList.remove("hide");
                        document.getElementById('user-form-input').classList.remove("hide");
                        document.getElementById('user-form-button').classList.remove("hide");
                    }});
                    time_tl.fromTo('#user-form-div', { opacity: 0 }, { opacity: 1 });   
                    
                }
            }
        }


        // check input, if it is empty then disabled the button
        $(document).on('keyup', '#user-form-input', function () {
            const time_input = document.getElementById('user-form-input').value;

            var check_button = document.getElementById('user-form-button');
    
            time_input != '' ? check_button.disabled = false : check_button.disabled = true;

        });

        $(document).on('keyup', '#user-form-completed-input', function () {
            const time_input = document.getElementById('user-form-completed-input').value;

            var check_button = document.getElementById('user-form-completed-button');
    
            time_input != '' ? check_button.disabled = false : check_button.disabled = true;

        });
        
         // Restart the game
         $(document).on("click", "#restart", function (e) {
            location.reload();  
        });

        
    });

})();
