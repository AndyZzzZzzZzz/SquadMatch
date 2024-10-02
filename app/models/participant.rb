class Participant < ApplicationRecord
    belongs_to :user
    belongs_to :event

    validates :join_at, presence: true
end
