class UpdateClubInEvents < ActiveRecord::Migration[7.2]
  def change
    change_column_null :events, :club_id, true
  end
end
