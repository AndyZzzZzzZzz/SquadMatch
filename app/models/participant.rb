class Participant < ApplicationRecord
    belongs_to :user
    belongs_to :event

    validates :join_at, presence: true
    validates :user_id, uniqueness: { scope: :event_id, message: "has already joined this event" }
    validate :event_not_full

    before_create :set_join_at

    private

    def set_join_at
        self.join_at ||= Time.current
    end

    def event_not_full
        if event.participants.count >= event.capacity
        errors.add(:event, "is already at full capacity")
        end
    end
end
