class Device < ActiveRecord::Base
  has_many :locations
  has_many :notifications
  has_many :notifications, through: :device_notifications
    
end
