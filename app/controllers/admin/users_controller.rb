class Admin::UsersController < ApplicationController
	  before_action :set_user, only: [:show, :edit, :update, :destroy]
	  before_filter :authenticate_user!
		def index
		end

		def index
			@users = User.all
		end

		def new	
			@user = User.new
		end

		def create
			@user = User.new(user_params)

			respond_to do |format|
			  if @user.save
			    format.html { redirect_to admin_user_path(@user), notice: 'User was successfully created.' }
			  else
			    format.html { render :new } # asdfasdf
			  end
			end
		end

		def show	
		end

		def edit
		end

		def update
		  respond_to do |format|
		    if @user.update(user_params)
		      format.html { redirect_to admin_user_path(@user), notice: 'User was successfully updated.' }
		    else
		      format.html { render :edit } # asdfasdf
		    end
		  end
		end

		def destroy
			binding.pry
		  @user.destroy
		  respond_to do |format|
		    format.html { redirect_to admin_users_path, notice: 'User was successfully destroyed.' }
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
