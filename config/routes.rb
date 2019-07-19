Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:edit, :update,:index]
  resources :groups, only: [:index,:new,:create, :edit, :update]  do
    resources :messages, only: [:index, :create]
    namespace :api do
    #controller下のディレクトリが入れ子状態になっているときはroutesをnamespace :ディレクトリ名 do endで囲う
      resources :messages, only: :index, defaults: { format: 'json' }
      #自動更新のapiのルーティングレスポンスのフォーマットをjsonに指定している
    end
  end
end
