class CreateGeoFences < ActiveRecord::Migration
  def change
    create_table :geo_fences do |t|
      t.string :name
      t.string :geo_fence_type
      t.boolean :enabled
      t.integer :user_id

      t.timestamps
    end
  end
end
