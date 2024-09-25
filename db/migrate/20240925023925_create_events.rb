class CreateEvents < ActiveRecord::Migration[7.2]
  def change
    create_table :events do |t|
      t.references :host, null: false, foreign_key: { to_table: :users }  
      t.references :club, null: false, foreign_key: true   
      t.references :event_type, null: false, foreign_key: true 
      t.string :title, null: false        
      t.integer :capacity, null: false       
      t.string :location, null: false
      t.date :event_date, null:false
      t.time :event_time, null:false       
      t.text :description                    
      t.timestamps
    end
  end
end
