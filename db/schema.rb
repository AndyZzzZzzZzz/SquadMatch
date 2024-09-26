# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_09_25_040844) do
  create_schema "auth"
  create_schema "extensions"
  create_schema "graphql"
  create_schema "graphql_public"
  create_schema "pgbouncer"
  create_schema "pgsodium"
  create_schema "pgsodium_masks"
  create_schema "realtime"
  create_schema "storage"
  create_schema "vault"

  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_graphql"
  enable_extension "pg_stat_statements"
  enable_extension "pgcrypto"
  enable_extension "pgjwt"
  enable_extension "pgsodium"
  enable_extension "plpgsql"
  enable_extension "supabase_vault"
  enable_extension "uuid-ossp"

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "clubs", force: :cascade do |t|
    t.string "club_name", null: false
    t.text "description"
    t.date "created_date", default: -> { "CURRENT_DATE" }
    t.bigint "category_id"
    t.bigint "leader_id", null: false
    t.integer "member_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_clubs_on_category_id"
    t.index ["leader_id"], name: "index_clubs_on_leader_id"
  end

  create_table "event_types", force: :cascade do |t|
    t.string "type_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.bigint "host_id", null: false
    t.bigint "club_id"
    t.bigint "event_type_id", null: false
    t.string "title", null: false
    t.integer "capacity", null: false
    t.string "location", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "category_id", null: false
    t.datetime "event_datetime", null: false
    t.index ["category_id"], name: "index_events_on_category_id"
    t.index ["club_id"], name: "index_events_on_club_id"
    t.index ["event_type_id"], name: "index_events_on_event_type_id"
    t.index ["host_id"], name: "index_events_on_host_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "clubs", "categories"
  add_foreign_key "clubs", "users", column: "leader_id"
  add_foreign_key "events", "categories"
  add_foreign_key "events", "clubs"
  add_foreign_key "events", "event_types"
  add_foreign_key "events", "users", column: "host_id"
end
