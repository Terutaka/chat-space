$(function(){

  function message_build(message){
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class="message" data-id=${message.id}>
                  <div class = "message__upper-info">
                    <div class = "message__upper-info__talker">
                    ${message.user_name}
                    </div>
                    <div class = "message__upper-info__date">
                    ${message.time}
                    </div>
                  </div>
                  <div class = "lower-message">
                    <div class = "message__text"> 
                    ${message.body}
                    </div>
                    <div class = 'lower-message__image'>
                    ${imagehtml}
                    </div>
                  </div>
                </div>`
    return html;
  }

  $("#new_message").on("submit",function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      type: "POST",
      url: url,
      data: formdata,
      dataType: "json",
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = message_build(message);
      $(".messages").append(html);
      $("form")[0].reset();
      $(".form__submit").prop("disabled",false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert("メッセージの投稿に失敗しました");
    })
  });

    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.message').last().data('message-id');
      var group_id = $('.chat').data('group-id')
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: '/groups/'+ group_id +'/api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {        
        messages.forEach(function(message){
          var insertHTML = message_build(message);
          $(".messages").append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        });        
      })
      .fail(function() {
        alert('自動更新に失敗');
      });
    };    
  setInterval(reloadMessages, 5000);
});