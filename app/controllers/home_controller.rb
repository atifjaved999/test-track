class HomeController < ApplicationController
  before_filter :authenticate_user!
  def index
    if current_user.is?("admin")
      redirect_to admin_index_path
    end
    @lat, @lng = 51.508742, -0.120850
  end
end
