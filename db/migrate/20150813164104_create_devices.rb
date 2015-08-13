class CreateDevices < ActiveRecord::Migration
  def change
    create_table :devices do |t|
      t.string :imei
      t.string :type
      t.string :sim_no
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :devices, :users
  end
end
