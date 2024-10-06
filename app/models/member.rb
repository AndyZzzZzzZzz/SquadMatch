class Member < ApplicationRecord
    self.primary_key = [:user_id, :club_id]
    belongs_to :user
    belongs_to :club

    validates :join_at, presence: true
end
