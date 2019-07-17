$(function(){

  function appendUser(user) {
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`

    return html;
  };
  function appendError(msg) {
    var html = `<div class="chat-group-user clearfix">
                  ${msg}
                </div>`
    return html;
  }
  //$(function() {などはjsの即時関数 即時関数→、関数を定義すると同時に実行するための構文
  $("#user-search-field").on("keyup",function(){
    $(".user-search-result").empty();//.user-search-resultを空にする記述を最初に書くようにした
    var input = $("#user-search-field").val();
    if (input.length >= 1){//inputの文字が１以上のときにイベントを実行するようにした

    
      $.ajax({
        type: "GET",
        url: "/users",
        data: {keyword: input},
        dataType: "json"
      })
      .done(function(users){
        if(users.length !== 0) {
          users.forEach(function(user){
            var html = appendUser(user);
            $(".user-search-result").append(html);
          })
        }
        else {
          var html = appendError("一致するユーザーはいません");
          $(".user-search-result").append(html);
        }
      })
      .fail(function(){
        alert("ユーザー検索に失敗しました(TдT)")
      })
    }
  });
  function clickHTML(user){
    var userId = user.attr("data-user-id");
//Jqueryのattrメソッドの結果(userのid)をuerIdに代入
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                  <input name='group[user_ids][]' type='hidden' value="${userId}">
                  <p class='chat-group-user__name'>${user.attr("data-user-name")}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
               </div>`
    return html;
  };
//attrメソッドによって引数に指定した属性の値を取得することができる
  $(document).on("click",".user-search-add",function(){

//追加ボタンが押された時
    $input = $(this);
//jqueryオブジェクトを代入するのでわかりやすいようにinputという変数の前に$をつける
    var add_user_html = clickHTML($input);
    $("#search-users").append(add_user_html);
//#search-usersの下にhtmlを追加
      $(this).parent().remove();
//ここでremoveすることでチャットメンバーを追加のところから追加したuserを消す
//parentメソッド→引数を省略すると親要素すべてを選択する
  });

  $(document).on("click",".user-search-remove", function() {
//削除ボタンが押されたとき
//ここのthisはuser-search-removeのクラスの要素を取得している
    $(this).parent().remove();
//親要素であるchat-group-userごとremove(削除)する

  });
});