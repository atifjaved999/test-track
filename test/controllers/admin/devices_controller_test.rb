require 'test_helper'

class Admin::DevicesControllerTest < ActionController::TestCase
  setup do
    @admin_device = admin_devices(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:admin_devices)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create admin_device" do
    assert_difference('Admin::Device.count') do
      post :create, admin_device: { device_type: @admin_device.device_type, imei_no: @admin_device.imei_no, sim_no: @admin_device.sim_no, user_id: @admin_device.user_id }
    end

    assert_redirected_to admin_device_path(assigns(:admin_device))
  end

  test "should show admin_device" do
    get :show, id: @admin_device
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @admin_device
    assert_response :success
  end

  test "should update admin_device" do
    patch :update, id: @admin_device, admin_device: { device_type: @admin_device.device_type, imei_no: @admin_device.imei_no, sim_no: @admin_device.sim_no, user_id: @admin_device.user_id }
    assert_redirected_to admin_device_path(assigns(:admin_device))
  end

  test "should destroy admin_device" do
    assert_difference('Admin::Device.count', -1) do
      delete :destroy, id: @admin_device
    end

    assert_redirected_to admin_devices_path
  end
end
