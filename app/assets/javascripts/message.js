$(function(){
  
  function message_build(message){
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class="message" >
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
      $(".input-box__text").val("");
      $(".hidden").val("");
      $(".form__submit").prop("disabled",false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert("メッセージの投稿に失敗しました");
    })
  });
});