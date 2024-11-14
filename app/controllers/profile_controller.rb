class ProfileController < ApplicationController
  # require user login
  before_action :require_login
  before_action :set_user, only: [ :index, :edit, :update, :destroy ]


  def index
  end

  def edit
  end

  def destroy
    @user.destroy
    reset_session # Log out the user after deletion
    redirect_to root_path, notice: "Your account has been deleted."
  end


  def update
    if @user.update(profile_params)
      flash[:notice] = "Profile has been updated"
      redirect_to profile_index_path
    else
      flash.now[:alert] = @user.errors.full_messages.join(" ")
      render :edit
    end
  end

  private

  def set_user
    @user = current_user
  end

  def profile_params
    params.require(:user).permit(:first_name, :last_name, :email, :username, :password, :password_confirmation)
  end
end
