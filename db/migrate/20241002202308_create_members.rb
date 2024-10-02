class CreateMembers < ActiveRecord::Migration[7.2]
  def change
    create_table :members, id: false do |t|
      t.references :user, null: false, foreign_key: true
      t.references :club, null: false, foreign_key: true
      t.datetime :join_at, null:false
      t.timestamps
    end
    execute "ALTER TABLE members ADD PRIMARY KEY (user_id, club_id);"
  end
end
