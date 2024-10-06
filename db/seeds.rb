# # This file should ensure the existence of records required to run the application in every environment (production,
# # development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# #
# # Example:
# #
# #   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
# #     MovieGenre.find_or_create_by!(name: genre_name)
# #   end

# #insert examples:

# # remove all insert data
# # Event.delete_all
# # EventType.delete_all
# # Club.delete_all
# # Category.delete_all
# # User.delete_all

# #Category
# cat = Category.create!(name: "Badminton")
# Category.create!(name: "Tennis", description: "Clubs/Events related to Tennis")

# # User
# user = User.create!(
#   first_name: "John",
#   last_name: "Doe",
#   username: "johndoe",  # Add username here
#   email: "john.doe@example.com",
#   password: "securepassword",
#   password_confirmation: "securepassword"
# )

# # User.create!(username: "johndoe") do |u|
# #     u.first_nmae = "John",
# #     u.last_name = "Doe",
# #     u.email = "john.doe@example.com",
# #     u.password = "securepassword",
# #     u.password_confirmation = "securepassword"
# # end

# # create club using exists user and category
# # user = User.find_by(username: "johndoe")
# # category = Category.find_by(name: "Badminton")

# club = Club.create!(
#   club_name: "Tennis Club",
#   description: "A club for tennis players and enthusiasts",
#   leader: user,
#   category: cat,
#   member_count: 15
# )

# # event type
# evtype = EventType.create!(type_name: "activity")
# EventType.create!(type_name: "competition")

# # create event
# Event.create!(
#   host: user,
#   club: club,
#   event_type: evtype,
#   category: cat,
#   capacity: 100,
#   location: "Local Stadium",
#   description: "an badminton event",
#   title: "Badminton Event",
#   event_datetime: DateTime.new(2024, 12, 15, 14, 30)
# )

# create members
# Member.create!(
#     club_id: 1,
#     user_id: 1,
#     join_at: DateTime.now
# )

#create participants
# Participant.create!(
#     event_id: 1,
#     user_id: 1,
#     join_at: DateTime.now
# )

