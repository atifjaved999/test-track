class GeoFence < ActiveRecord::Base
  belongs_to :user
  # has_many :locations, dependent: :destroy
  has_one :center , foreign_key: "geo_fence_id", class_name: "Location"

end
