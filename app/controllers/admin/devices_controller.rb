class Admin::DevicesController < ApplicationController
  before_action :set_admin_device, only: [:show, :edit, :update, :destroy]

  # GET /admin/devices
  # GET /admin/devices.json
  def index
    @admin_devices = Admin::Device.all
  end

  # GET /admin/devices/1
  # GET /admin/devices/1.json
  def show
  end

  # GET /admin/devices/new
  def new
    @admin_device = Admin::Device.new
  end

  # GET /admin/devices/1/edit
  def edit
  end

  # POST /admin/devices
  # POST /admin/devices.json
  def create
    @admin_device = Admin::Device.new(admin_device_params)

    respond_to do |format|
      if @admin_device.save
        format.html { redirect_to @admin_device, notice: 'Device was successfully created.' }
        format.json { render :show, status: :created, location: @admin_device }
      else
        format.html { render :new }
        format.json { render json: @admin_device.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/devices/1
  # PATCH/PUT /admin/devices/1.json
  def update
    respond_to do |format|
      if @admin_device.update(admin_device_params)
        format.html { redirect_to @admin_device, notice: 'Device was successfully updated.' }
        format.json { render :show, status: :ok, location: @admin_device }
      else
        format.html { render :edit }
        format.json { render json: @admin_device.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/devices/1
  # DELETE /admin/devices/1.json
  def destroy
    @admin_device.destroy
    respond_to do |format|
      format.html { redirect_to admin_devices_url, notice: 'Device was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_device
      @admin_device = Admin::Device.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_device_params
      params.require(:admin_device).permit(:imei_no, :device_type, :sim_no, :user_id)
    end
end
