class CreateDevices < ActiveRecord::Migration
  def change
    create_table :devices do |t|
      t.string :imei_no
      t.string :device_type
      t.string :sim_no
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
