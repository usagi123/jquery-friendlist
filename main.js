$(function(){
    var $friends = $('#friends');
    var $name = $('#name');
    var $age = $('#age');

    var friendTemplate = $('#friend-template').html();

    function addFriend(friend){
        $friends.append(Mustache.render(friendTemplate, friend));
    }

    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/johnbob/friends',
        success: function(friends) {
            console.log("I have friends!", friends); //returns all of johnbob's friends
            $.each(friends, function(i, friend){
                addFriend(friend);
            });
        },
        error: function(){
            alert('Error loading friends')
        }
    });

    $('#add-friend').on('click', function(){

        var friend = {
            name: $name.val(),
            age: $age.val(),
        }

        $.ajax({
            type: 'POST',
            url: 'http://rest.learncode.academy/api/johnbob/friends',
            data: friend,
            success: function(newFriend) {
                console.log("Friend added!", newFriend); //the new item is returned with an ID
                addFriend(newFriend);
            },
            error: function(){
                alert('Error adding friend')
            }
        });
    });

    $friends.delegate('.remove', 'click', function(){

        var $li = $(this).closest('li');

        $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/johnbob/friends/' + $(this).attr('data-id'),
            success: function(){
                console.log('Friend Deleted Successfully!');
                $li.fadeOut(300, function(){
                    $(this).remove();
                })
            }
        })
    })

    $friends.delegate('.editFriend', 'click', function(){
         var $li = $(this).closest('li');
         $li.find('input.name').val($li.find('span.name').html());
         $li.find('input.age').val($li.find('span.age').html());
         $li.addClass('edit');

    });

    $friends.delegate('.cancelEdit', 'click', function(){
        $(this).closest('li').removeClass('edit')

    });

    $friends.delegate('.saveEdit', 'click', function(){
        var $li = $(this).closest('li');
        var friend = {
            name: $li.find('input.name').val(),
            age: $li.find('input.age').val(),
        }

        $.ajax({
            type: 'PUT',
            url: 'http://rest.learncode.academy/api/johnbob/friends/' + $li.attr('data-id'),
            data: friend,
            success: function(newFriend) {
                console.log("Friend editted!", newFriend); //the new item is returned with an ID
                $li.find('span.name').html(friend.name);
                $li.find('span.age').html(friend.age);
                $li.removeClass('edit')
            },
            error: function(){
                alert('Error updating friend')
            }
        });
    });
})