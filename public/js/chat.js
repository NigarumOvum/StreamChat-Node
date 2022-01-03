let socket = io();

function scrollToBottom() {
  // Selector
  let messages = $('#messages');
  let newMessage = messages.children('li:last-child')
  // height
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    // console.log('should scroll')
    // console.log(lastMessageHeight)
    // console.log(scrollHeight)
    messages.scrollTop(scrollHeight)
  }
}





 socket.on('connect', function () {
  //  console.log('connected to the server');

   //  socket.emit('createEmail', {
   //    to: 'yonski@email.com',
   //    text: 'Hey. this is me bitch'
   //  });
   //  socket.emit('createMessage', {
   //    to: 'piedra@punto.com',
   //    text: 'Mi espalda'
   //  });

  var params = $.deparam(window.location.search)
  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else{
      // console.log('no error')
    }
  })

 })

 socket.on('updateUserList', function(users){
   var ol = $('<ol></ol>');
   users.forEach(function (user){
     ol.append($('<li></li>').text(user));
   })
   $('#users').html(ol);
  //  console.log('Users List', users)
 })


 socket.on('disconnect', function () {
   console.log('disconnected from the server')
 })

 // socket.on('newEmail', function(email){
 //   console.log('tu as email nouveau', email)
 //  console.log(`You have new email.
 //     from: ${email.from}
 //     message: ${email.text}
 //     date: ${email.createdAt}
 //  `);


socket.on('newAlertMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')

  let template = $('#message_alert').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

})

socket.on('newExitMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')

  let template = $('#message_exit').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

})


socket.on('welcomeMessage', function (message) {
  // console.log(message.text)
  // console.log('tienes nuevo mensaje', message);
  let formattedTime = moment(message.createdAt).format('h:mm a')
  // let alert = message.alert;
  // var li = $('<li></li>');
  // li.text(`${message.from}: ${message.text} ${formattedTime}`);
  // $('#messages').append(li)

  let template = $('#message_template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

})


socket.on('newMessage', function (message) {
  // console.log(message.text)
  // console.log('tienes nuevo mensaje', message);
  let formattedTime = moment(message.createdAt).format('h:mm a')
  // let alert = message.alert;
  // var li = $('<li></li>');
  // li.text(`${message.from}: ${message.text} ${formattedTime}`);
  // $('#messages').append(li)
  
  let template = $('#newMessage').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  
  $('#messages').append(html);
  scrollToBottom();

 })


socket.on('myMessage', function (message) {
  // console.log(message.text)
  // console.log('tienes nuevo mensaje', message);
  let formattedTime = moment(message.createdAt).format('h:mm a')
  // let alert = message.alert;
  // var li = $('<li></li>');
  // li.text(`${message.from}: ${message.text} ${formattedTime}`);
  // $('#messages').append(li)

  let template = $('#myMessage').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

})


socket.on('newLocationMessage', function(message){
  let formattedTime = moment(message.createdAt).format('h:mm a')
  // console.log(formattedTime)
  let template = $('#location_template').html();
  let html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  })

  // let li = $('<li></li>');
  // let a = $('<a target="_blank">My Location </a><i>'+formattedTime+'</i>');
  // li.text(`${message.from}: `);
  // a.attr('href', message.url);
  // li.append(a);
  $('#messages').append(html)
  scrollToBottom();
}); 

// socket.emit('createMessage', {
//   from: 'frank',
//   text: 'hi'
// }, function(data){
//   console.log('ich bin ein junge: ', data)
// });


$('#message-form').on('submit', function(e){
  e.preventDefault();
  var messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function(data){
      messageTextbox.val('');
  })
})

let locationButton = $('#send-location');
locationButton.on('click', function(){
  // console.log('it is working')
  if(!navigator.geolocation){
    return alert('Geolocation not suported by your browser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending...')

  navigator.geolocation.getCurrentPosition(function (position){
    // console.log(position)
    
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
    locationButton.removeAttr('disabled').text('Send location');
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  })


})