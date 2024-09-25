class Event < ApplicationRecord
    belongs_to :host, class_name: "User"
    belongs_to :club
    belongs_to :event_type
    belongs_to :category

    validates :host, :event_type, :capacity, :location, :title, :event_datetime, :category, presence: true
    validate :event_datetime_must_be_in_future

    private
    def event_datetime_must_be_in_future
        # Combine event_date and event_time into a single DateTime object for comparison
        if event_datetime.present? && event_datetime <= DateTime.now
            errors.add(:event_datetime, "must be in the future")
        end
    end
end
