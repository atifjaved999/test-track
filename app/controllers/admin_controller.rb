class AdminController < ApplicationController
  before_action :set_user, only: [:show_user, :edit_user, :update_user, :destroy_user]
  before_filter :authenticate_user!
	def index
	end

	def users
		@users = User.all
	end

	def new_user	
	end

	def create_user
		binding.pry
		@user = User.new(user_params)

		respond_to do |format|
		  if @user.save
		    format.html { redirect_to users_admin_index_path, notice: 'user was successfully created.' }
		  else
		    format.html { render :new } # asdfasdf
		  end
		end
	end

	def show_user	
	end

	def edit_user
	end

	def update_user
	  respond_to do |format|
	    if @user.update(user_params)
	      format.html { redirect_to show_user_admin_index(@user), notice: 'user was successfully updated.' }
	    else
	      format.html { render :edit } # asdfasdf
	    end
	  end
	end


	private

	def set_user
	  @user = User.find(params[:id])
	end

	def user_params
	  params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :contact_no)
	end
end
