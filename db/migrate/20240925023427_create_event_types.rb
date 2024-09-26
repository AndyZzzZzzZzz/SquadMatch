class CreateEventTypes < ActiveRecord::Migration[7.2]
  def change
    create_table :event_types do |t|
      t.text :type, null: false
      t.timestamps
    end
  end
end
