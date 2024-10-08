class CreateNews < ActiveRecord::Migration[7.2]
  def change
    create_table :news do |t|
      t.string :title, limit: 250, null: false
      t.text :content, null: false

      t.timestamps
    end
  end
end
