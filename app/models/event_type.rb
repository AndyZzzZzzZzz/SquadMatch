class EventType < ApplicationRecord
    validates :type_name, presence: true
end
