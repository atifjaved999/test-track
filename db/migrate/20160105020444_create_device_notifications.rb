class CreateDeviceNotifications < ActiveRecord::Migration
  def change
    create_table :device_notifications do |t|
      t.integer :device_id
      t.integer :user_id
      t.boolean :active

      t.timestamps
    end
    add_index :device_notifications, :device_id
    add_index :device_notifications, :user_id
  end
end
