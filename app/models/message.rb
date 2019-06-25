class Message < ApplicationRecord
  belongs_to :group_user
  validates :body, presence: true, unless: :image?
end
