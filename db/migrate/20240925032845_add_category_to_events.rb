class AddCategoryToEvents < ActiveRecord::Migration[7.2]
  def change
    add_reference :events, :category, null: false, foreign_key: true
  end
end
