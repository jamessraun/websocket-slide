$(document).ready(function() {
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

  firebase.database().ref('slider').set({
    load: {
      key: 'sapi'
    },
    slideChanged: '',
  });

  var form = $('form.login');
  var secretTextBox = form.find('input[type=text]');
  var presentation = $('.reveal');

  var key = "",
    animationTimeout;


  form.submit(function(e) {

    e.preventDefault();

    key = secretTextBox.val().trim();
    console.log(key.length);
    if (key.length) {
      firebase.database().ref('slider/load').set({
        key: key
      });

      firebase.database().ref('/slider/load/key').on('value', function(snapshot) {
        console.log('datacoyy masuk!!!!!', snapshot.val());
        console.log(key);
        if (snapshot.val() === key) {
          presentation.removeClass('blurred');
          form.hide();
          var ignore = false;

          $(window).on('hashchange', function() {

            if (ignore) {
              return;
            }

            var hash = window.location.hash;

            firebase.database().ref('/slider/slideChanged/').set({
              hash: hash
            });
          });

          firebase.database().ref('/slider/slideChanged/').on('value', function(snapshot) {
            console.log('data snapshot', snapshot.val());
            window.location.hash = snapshot.val().hash
            ignore: true
            setInterval(function() {
              ignore = false;
            }, 100);
          });


        } else {
          clearTimeout(animationTimeout);
          secretTextBox.addClass('denied animation');
          animationTimeout = setTimeout(function() {
            secretTextBox.removeClass('animation');
          }, 1000);

          form.show();
        }
      });
    }
  })
})
