class UpdateTypeInEventTypes < ActiveRecord::Migration[7.2]
  def change
    rename_column :event_types, :type, :type_name
    
    change_column :event_types, :type_name, :string
  end
end
