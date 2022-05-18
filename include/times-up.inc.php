<!-- Times Up -->
<div class="center container times-up hide" id="times-up">
    <div class="white-text tada" id="times-up-text">
        <div class=""><i class="bi bi-alarm fs-custom-icon red-text text-lighten-1"></i></div>
        <p class="flow-text fw-bold">TIME'S UP!</p>
        <p class="flow-text custom-font-start-title white-text hide fs-1" id="score-div">YOUR SCORE: <span class="fs-3" id="user_score-timesUp">0</span></p>
    </div>
        
    <div class="mt-2 white-text hide" id="user-form-div">
        <p class="custom-font-start-title blue-grey-text text-lighten-3 hide" id="user-form-text">ENTER YOUR NAME</p>
        <input id="user-form-input" type="text" class="center white-text custom-font-start-title hide" style="width: 300px;">
        <p><button class="waves-effect btn-flat mt-2 rounded z-depth-2 white-text custom-font hide" id="user-form-button" disabled="true"><span class="flow-text">Save</span></button></p>
    </div>
    </div>

    <!-- Timer Footer -->
    <div class="footer">
        <!-- timer -->
        <div class="progress mt-5 score hide" id="time-div" style="padding: 10px; margin: 0;">
            <div class="determinate red lighten-1" id="time-sec" style="width: 0%;"></div>
        </div>
        <!-- process loader -->
        <div class="progress blue-grey hide" id="button_loader" style="margin: 0;">
            <div class="indeterminate score"></div>
        </div>
    </div>
</div>