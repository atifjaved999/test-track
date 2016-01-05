class Admin::NotificationsController < ApplicationController
  before_action :set_notification, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @notifications = Notification.all
    respond_with([:admin,@notifications])
  end

  def show
    respond_with(@notification)
  end

  def new
    @notification = Notification.new
    respond_with([:admin,@notification])
  end

  def edit
  end

  def create
    @notification = Notification.new(notification_params)
    @notification.save
    respond_with([:admin,@notification])
  end

  def update
    @notification.update(notification_params)
    respond_with([:admin,@notification])
  end

  def destroy
    @notification.destroy
    respond_with([:admin,@notification])
  end

  private
    def set_notification
      @notification = Notification.find(params[:id])
    end

    def notification_params
      params.require(:notification).permit(:name)
    end
end
