class AddRadiusFieldToGeoFences < ActiveRecord::Migration
  def change
    add_column :geo_fences, :radius, :float
  end
end
