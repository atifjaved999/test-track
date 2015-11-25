class GeoFencesController < ApplicationController

  def index
    @geo_fences = current_user.geo_fences
  end

  def new
    
  end

end
