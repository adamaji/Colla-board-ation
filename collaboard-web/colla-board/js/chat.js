$(document).ready(function() {

  /*
  * Create a Firebase Reference
  *
  */

  var messagesRef = new Firebase('https://colla-board.firebaseio.com/');


  /*
  * Register DOM elements
  *
  * We register DOM elements so we can
  * use them over and over efficiently.
  * These vars are prefixed with $ to indicate
  * they are registered with jQuery.
  */
  var $newMessage = $('#new-message');
  var $username = $('#username');
  var $messages = $('#messages');
  var $objects = $('#objects');

  var $newObj = $('#new-obj');
  var $newPos = $('#new-pos');

  var $clearBtn = $('#clear-all');


  /*
  * Load messages from Firebase
  *
  * This metthod is called when the existing
  * messages are first received and when new
  * message are added to Firebase.
  */

  messagesRef.limitToLast(10).on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var username = data.name || "anonymous";
    var message = data.text;

    if ( message ) {

      //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
      var messageElement = $("<li>");
      var nameElement = $("<strong class='example-chat-username'></strong>");
      nameElement.text(username);
      messageElement.text(message).prepend(nameElement);

      //ADD MESSAGE TO LIST
      $messages.append(messageElement);

      //SCROLL TO BOTTOM OF CHAT BOX
      $messages[0].scrollTop = $messages[0].scrollHeight;
    }
  });

  //////

  messagesRef.limitToLast(10).on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var username = data.object;
    var message = data.position;

    if ( username && message ) {

      //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
      var messageElement = $("<li>");
      var nameElement = $("<strong class='example-chat-username'></strong>");
      nameElement.text(username);
      messageElement.text(message).prepend(nameElement);

      //ADD MESSAGE TO LIST
      $objects.append(messageElement);

      //SCROLL TO BOTTOM OF CHAT BOX
      $objects[0].scrollTop = $objects[0].scrollHeight;
    }
  });  


  /*
  * Listen for user input
  *
  * This method listens for each keypress
  * on the message input field and saves
  * the data to Firebase when content is submitted.
  */

  $newMessage.keypress(function (e) {
    // GET FIELD VALUES
    var username = $username.val();
    var message = $newMessage.val().trim();

    // SAVE MESSAGE WHEN 'ENTER' IS PRESSED
    if (e.keyCode == 13 && message.length) {
      messagesRef.push({name:username, text:message});
      // messagesRef.child("text").set( {
      //   text: message
      // })
      $newMessage.val('');
    }
  });

  $newObj.keypress(function (e) {
    var objName = $newObj.val();
    var pos = $newPos.val();

    if (e.keyCode == 13 && objName.length && pos.length ) {
      messagesRef.push({object: objName, position: pos});

      $newObj.val('');
      $newPos.val('');
    }    
  });

  $newPos.keypress(function (e) {
    var objName = $newObj.val();
    var pos = $newPos.val();

    if (e.keyCode == 13 && objName.length && pos.length ) {
      messagesRef.push({object: objName, position: pos});

      $newObj.val('');
      $newPos.val('');
    }    
  });

  $clearBtn.click(function (e) {
    var onComplete = function(error) {
      if (error) {
        console.log('Synchronization failed');
      } else {
        console.log('Synchronization succeeded');
      }
    };

    messagesRef.remove(onComplete); 
    $messages.empty();
    $objects.empty();
  })
});
