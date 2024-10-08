class News < ApplicationRecord
    valid :title, presence: true, length: { maximum: 100 }
    valid :content, presence: true
end
