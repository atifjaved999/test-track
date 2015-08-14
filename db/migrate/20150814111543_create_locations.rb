class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :lat
      t.string :lng
      t.string :speed
      t.integer :device_id

      t.timestamps null: false
    end
  end
end
