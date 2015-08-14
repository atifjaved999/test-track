class Device < ActiveRecord::Base
	belongs_to :users
	has_many :locations
end
