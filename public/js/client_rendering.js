$(document).ready(function(){
	$.get('/api/get-friends').then(function(response){
		var friends = JSON.parse(response);
		friends = friends.data;
		setInterval(function(){
			if(friends.length){
				window.drawing.createGraph(friends.pop());
			}
		}, 0)
	})

  $('.mutual').on('click', function(){
    $.get('/api/get-user').then(function(response){
      friendList = JSON.parse(response).friends;
      var getMutual = function(idArray){
        var currentFriend = idArray.pop();
        var payload = {id: currentFriend};
        $.post('/api/get-mutual', payload).then(function(response){
          console.log('response: ', response)
          var mutualList = JSON.parse(response);
          var loadMutual = function(list){
            var currentMutual = list.pop();
            window.drawing.addEdge(currentFriend, currentMutual);
            if(list.length){
              return loadMutual(list);
            } else {
              return;
            }
          }
          if(mutualList.length){
            loadMutual(mutualList);
          }
        })
        if(idArray.length){
            return getMutual(idArray);
        } else {
            return;
        }
      }
      getMutual(friendList);
    })
  })

  $('.connect').on('click', function(){
    $.get('/api/get-user').then(function(response){
      var user = JSON.parse(response);
      window.drawing.addUser(user, true);
    })
  })

  $('.fly').on('click', function(){
    $.get('/api/get-user').then(function(response){
      var friends = JSON.parse(response).friends;
      var current;
      setInterval(function(){
        current = friends.pop();
        window.drawing.goToNode(current);
      }, 1000)
    })
  })
        
})