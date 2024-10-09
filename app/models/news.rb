class News < ApplicationRecord
    validates :title, presence: true, length: { maximum: 100 }
    validates :content, presence: true
end
