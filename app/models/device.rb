class Device < ActiveRecord::Base
  has_many :locations
  
  has_many :device_notifications
  has_many :notifications, through: :device_notifications
    
end
