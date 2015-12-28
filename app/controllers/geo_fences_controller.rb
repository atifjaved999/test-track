class GeoFencesController < ApplicationController
  before_action :set_geo_fence, only: [:show, :edit, :update, :destroy]
  def index
    @geo_fences = current_user.geo_fences
  end

  def new
  end

  def create
    @geo_fence = GeoFence.new(geo_fence_params)
    @geo_fence.user_id = current_user.id
    @geo_fence.save
    save_center(params[:center], @geo_fence.id)
    # save_coordinates(params[:coordinates_array], @geo_fence.id)
  end

  def show
    @center = @geo_fence.center
    @radius = @geo_fence.radius
  end

  def destroy
    @geo_fence.destroy
    respond_to do |format|
      format.html { redirect_to geo_fences_url, notice: 'Geo Fence was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def save_center(center, geo_fence_id)
        center = center.split(",")
        lat = center[0]
        lng = center[1]
        Location.create(:lat=>lat, :lng=>lng, :geo_fence_id=>geo_fence_id)
    end

    # def save_coordinates(coordinates_array, geo_fence_id)
    #   coordinates_array.each do |c|
    #     c = c.split(",")
    #     lat = c[0]
    #     lng = c[1]
    #     Location.create(:lat=>lat, :lng=>lng, :geo_fence_id=>geo_fence_id)
    #   end
    # end

    # Use callbacks to share common setup or constraints between actions.
    def set_geo_fence
      @geo_fence = GeoFence.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def geo_fence_params
      # params.require(:geo_fence).permit(:name, :geo_fence_type, :enabled, :user_id, :locations_atttibutes => [:id, :lat, :lng])
      params.permit(:name, :geo_fence_type, :enabled, :user_id, :radius)
    end

end
