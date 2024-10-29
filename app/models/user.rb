class User < ApplicationRecord
    # set and authenticate against a BCrypt password
    has_secure_password
    

    has_many :participants
    has_many :events, through: :participants

    # validation
    validates :password, length: { minimum: 8 }
    validates :username, length: { minimum: 4 }
    validates :first_name, :last_name, :email, :password, :username, presence: true
    validates :email, :username, uniqueness: true
end
