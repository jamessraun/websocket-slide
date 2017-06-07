$(function() {


	Reveal.initialize({
		history: true
	});

  var config = {
     apiKey: "AIzaSyD5yfH5IcH2bUUWQX9eReTrq8SmLITreFs",
     authDomain: "presentasi-b5279.firebaseapp.com",
     databaseURL: "https://presentasi-b5279.firebaseio.com",
     storageBucket: "presentasi-b5279.appspot.com",
     messagingSenderId: "1043681045990"
   };
   firebase.initializeApp(config);
   var database = firebase.database();


	var form = $('form.login');
	var secretTextBox = form.find('input[type=text]');
	var presentation = $('.reveal');

	var key = "", animationTimeout;


	form.submit(function(e){

		e.preventDefault();

		key = secretTextBox.val().trim();

		if(key.length) {
      firebase.database().ref('/slider/key/' +key).once('value').then(function(snapshot) {
        if(snapshot.val().key){
          console.log('datacoyy masuk!!!!!',snapshot.val().key);

    			presentation.removeClass('blurred');

    			form.hide();

    			var ignore = false;

    			$(window).on('hashchange', function(){

    				if(ignore){
    					return;
    				}

    				var hash = window.location.hash;

    				socket.emit('slide-changed', {
    					hash: hash,
    					key: key
    				});
    			});

    			socket.on('navigate', function(data){

    				// Another device has changed its slide. Change it in this browser, too:

    				window.location.hash = data.hash;
.

    				ignore = true;

    				setInterval(function () {
    					ignore = false;
    				},100);

    			});

        }else {
          // Wrong secret key

    			clearTimeout(animationTimeout);

    			// Addding the "animation" class triggers the CSS keyframe
    			// animation that shakes the text input.

    			secretTextBox.addClass('denied animation');

    			animationTimeout = setTimeout(function(){
    				secretTextBox.removeClass('animation');
    			}, 1000);

    			form.show();
    		}
        }

      });
		}

	});
