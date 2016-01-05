class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :devices
  has_many :geo_fences

  has_many :device_notifications
  has_many :notifications, through: :device_notifications
  

  def is?( requested_role )
    self.role == requested_role.to_s
  end

end
