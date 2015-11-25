class Location < ActiveRecord::Base
  belongs_to :device
  belongs_to :geo_fence
end
