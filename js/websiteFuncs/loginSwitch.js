/*
 * Jquery file for FetchQuest Site
 * made by G.W
 */

 $('#login').on('shown.bs.modal', function () {
   $('#login').trigger('focus')
 });


//on ready
/*
$(document).ready(function(){
  //on click of the register's "login" button
  $("#r2l").click(function(){
    //show the login window's content
    $(".login").show();
    //make slide animation work
    //change height over time
    $("#login_div").animate({
       height: '100%'
    }, { duration: 400, queue: false });
    //change width instantly (otherwise the animation goes diagonal)
    $("#login_div").animate({
       width: '100%'
    }, { duration: 0, queue: false });

    //hide the register window
    //change height over a period (queue: false also makes animations
    // not wait for each other, so all this happens at once)
    $("#register_div").animate({
       height: '0%',
    }, { duration: 400, queue: false, complete: $(".register").hide() });
    //change width instantly (duration 0 means take 0ms)
    $("#register_div").animate({
       width: '0px'
    }, { duration: 0, queue: false });
  });

  //login to register
  $('#l2r').click(function(){
    //same as above, reversed
    $(".register").show();

    //same as above, reversed
    $("#register_div").animate({
       height: '100%'
    }, { duration: 400, queue: false });
    $("#register_div").animate({
       width: '100%'
    }, { duration: 0, queue: false });

    $("#login_div").animate({
       height: '0%'
    }, { duration: 400, queue: false, complete: $(".login").hide() });
    $("#login_div").animate({
       width: '0px'
    }, { duration: 0, queue: false });
  });
})
*/