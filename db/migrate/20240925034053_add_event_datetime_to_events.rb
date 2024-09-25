class AddEventDatetimeToEvents < ActiveRecord::Migration[7.2]
  def change
    remove_column :events, :event_date
    remove_column :events, :event_time

    add_column :events, :event_datetime, :datetime, null: false
  end
end
