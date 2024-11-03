class UsersController < ApplicationController
  def new
    @user = User.new
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      redirect_to login_path, flash: { login_notice: "Account created successfully" }
    else
      flash.clear
      flash.now[:alert] = @user.errors.full_messages.join(", ")
      render :index
    end
  end

  def check_username
    username = params[:username]
    is_unique = !User.exists?(username: username)
    render json: { is_unique: is_unique }
  end

  # Action to check if email is unique
  def check_email
    email = params[:email]
    is_unique = !User.exists?(email: email)
    render json: { is_unique: is_unique }
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :username, :password, :password_confirmation)
  end
end
