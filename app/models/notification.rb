class Notification < ActiveRecord::Base
	has_many :device_notifications
	has_many :users, through: :device_notifications
end
