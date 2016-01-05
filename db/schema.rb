# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160105020444) do

  create_table "device_notifications", force: true do |t|
    t.integer  "notification_id"
    t.integer  "user_id"
    t.boolean  "active"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "device_notifications", ["notification_id"], name: "index_device_notifications_on_notification_id", using: :btree
  add_index "device_notifications", ["user_id"], name: "index_device_notifications_on_user_id", using: :btree

  create_table "devices", force: true do |t|
    t.string   "imei_no"
    t.string   "device_type"
    t.string   "sim_no"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "geo_fences", force: true do |t|
    t.string   "name"
    t.string   "geo_fence_type"
    t.boolean  "enabled"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "radius"
  end

  create_table "locations", force: true do |t|
    t.string   "lat"
    t.string   "lng"
    t.string   "speed"
    t.integer  "device_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "geo_fence_id"
  end

  create_table "notifications", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "products", force: true do |t|
    t.string   "name"
    t.float    "price"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "role"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "contact_no"
    t.string   "api_token"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
