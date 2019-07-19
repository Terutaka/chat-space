json.array! @messages do |message|
  json.id message.id
  json.time message.created_at.strftime("%Y/%m/%d %H:%M")
  json.body message.body
  json.image message.image.url
  json.user_name message.user.name
  json.group_id message.group.id
end