class Club < ApplicationRecord
  belongs_to :category
  belongs_to :leader, class_name: 'User'

  validates :club_name, :leader, presence: true
end
