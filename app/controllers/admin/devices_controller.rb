class Admin::DevicesController < ApplicationController
  before_action :set_device, only: [:show, :edit, :update, :destroy]

  # GET /admin/devices
  # GET /admin/devices.json
  def index
    @devices = Device.all
  end

  # GET /admin/devices/1
  # GET /admin/devices/1.json
  def show
  end

  # GET /admin/devices/new
  def new
    @device = Device.new
  end

  # GET /admin/devices/1/edit
  def edit
  end

  # POST /admin/devices
  # POST /admin/devices.json
  def create
    @device = Device.new(device_params)

    respond_to do |format|
      if @device.save
        format.html { redirect_to admin_device_path(@device), notice: 'Device was successfully created.' }
        format.json { render :show, status: :created, location: @device }
      else
        format.html { render :new }
        format.json { render json: @device.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/devices/1
  # PATCH/PUT /admin/devices/1.json
  def update
    respond_to do |format|
      if @device.update(device_params)
        format.html { redirect_to admin_device_path(@device), notice: 'Device was successfully updated.' }
        format.json { render :show, status: :ok, location: @device }
      else
        format.html { render :edit }
        format.json { render json: @device.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/devices/1
  # DELETE /admin/devices/1.json
  def destroy
    @device.destroy
    respond_to do |format|
      format.html { redirect_to admin_devices_url, notice: 'Device was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_device
      @device = Device.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def device_params
      params.require(:device).permit(:imei_no, :device_type, :sim_no, :user_id)
    end
end
