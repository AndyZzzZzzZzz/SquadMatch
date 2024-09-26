class User < ApplicationRecord
    # set and authenticate against a BCrypt password
    has_secure_password

    # validation
    validates :password, length: { minimum: 8 }
    validates :username, length: { minimum: 4 }
    validates :first_name, :last_name, :email, :password, :username, presence: true
    validates :email, :username, uniqueness: true
end
