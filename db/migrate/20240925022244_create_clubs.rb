class CreateClubs < ActiveRecord::Migration[7.2]
  def change
    create_table :clubs do |t|
      # t.string :club_name
      # t.text :description
      # t.datetime :created_date
      # t.references :category, null: false, foreign_key: true
      # t.integer :leader
      # t.integer :member_count
      t.string :club_name, null: false
      t.text :description
      t.date :created_date, default: -> { 'CURRENT_DATE' }
      t.references :category, foreign_key: true  # Foreign key to categories table
      t.references :leader, null: false, foreign_key: { to_table: :users }  # Foreign key to users table
      t.integer :member_count, default: 0

      t.timestamps
    end
  end
end
