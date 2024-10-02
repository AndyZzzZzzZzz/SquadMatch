class CreateParticipants < ActiveRecord::Migration[7.2]
  def change
    create_table :participants, id: false do |t|
      t.references :user, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true
      t.datetime :join_at, null:false
      t.timestamps
    end
    execute "ALTER TABLE participants ADD PRIMARY KEY (user_id, event_id);"
  end
end
