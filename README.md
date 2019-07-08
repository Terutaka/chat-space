# README
[![Image from Gyazo](https://i.gyazo.com/4a3c2f2f6d6590c34ab9a63af92ef021.gif)](https://gyazo.com/4a3c2f2f6d6590c34ab9a63af92ef021)

[![Image from Gyazo](https://i.gyazo.com/b68401e24a4634f1dd77a15cf889962f.gif)](https://gyazo.com/b68401e24a4634f1dd77a15cf889962f)

[![Image from Gyazo](https://i.gyazo.com/5c3555d958181db9632392334746b403.gif)](https://gyazo.com/5c3555d958181db9632392334746b403)

[![Image from Gyazo](https://i.gyazo.com/b4118621bcff45506062f9d8cd739632.gif)](https://gyazo.com/b4118621bcff45506062f9d8cd739632)
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique:true|
|email|string|null: false, unique:true|
|password|string|null: false|

### Association
- has_many :massages
- has_many :groups, through: :members
- has_many :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :users, through: :members
- has_many :members

## groupusersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
- has_many :message

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|foreign_key: true|
|user_id|integer|foreign_key: true|

### Association
- belongs_to :member



