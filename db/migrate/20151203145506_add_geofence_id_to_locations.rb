class AddGeofenceIdToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :geo_fence_id, :integer
  end
end
