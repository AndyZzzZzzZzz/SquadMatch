class Event < ApplicationRecord
    belongs_to :host, class_name: "User"
    belongs_to :club, optional: true
    belongs_to :event_type
    belongs_to :category


    has_many :participants, dependent: :destroy
    has_many :users, through: :participants
    

    # validates :host, :event_type, :capacity, :location, :title, :event_datetime, :category, presence: true
    validates :host, presence: true
    validates :title, presence: true, length: { maximum: 100 }
    validates :capacity, numericality: { only_integer: true, greater_than: 0 }
    validates :location, presence: true
    validates :event_datetime, presence: true
    validates :category_id, presence: true
    validates :event_type_id, presence: true
    validate :event_datetime_must_be_in_future

    private
    def event_datetime_must_be_in_future
        # Combine event_date and event_time into a single DateTime object for comparison
        if event_datetime.present? && event_datetime <= DateTime.now
            errors.add(:event_datetime, "must be in the future")
        end
    end
end
