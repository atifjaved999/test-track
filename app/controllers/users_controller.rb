class UsersController < ApplicationController
 
  def notification	
  end

  def update
  	current_user.update_attributes(user_params)
  	redirect_to notification_users_url,:notice => "User notification update"
  end

private
	def user_params
		params.require(:user).permit!#(:name, notification_ids: [])
	end
end
