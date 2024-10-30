class User < ApplicationRecord
    # set and authenticate against a BCrypt password
    has_secure_password


    has_many :participants
    has_many :events, through: :participants

    # validation
    # validates :password_digest, length: { minimum: 8 }
    # validates :username, length: { minimum: 4 }
    # validates :first_name, :last_name, :email, :password_digest, :username, presence: true
    # validates :email, :username, uniqueness: true
    validates :first_name, presence: { message: "First name can't be blank" }
    validates :last_name,  presence: { message: "Last name can't be blank" }
    validates :username,
                presence: { message: "Username can't be blank" },
                uniqueness: { message: "Username has already been taken" },
                length: { minimum: 4, message: "Username must be at least 4 characters long" }
    validates :email,
                presence: { message: "Email can't be blank" },
                uniqueness: { message: "Email has already been taken" },
                format: { with: URI::MailTo::EMAIL_REGEXP, message: "Email is invalid" }
    validates :password,
                presence: { message: "Password can't be blank" },
                length: { minimum: 6, message: "Password must be at least 6 characters long" },
                if: :password_digest_changed?
end
