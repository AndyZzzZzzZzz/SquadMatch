class LoginController < ApplicationController
  def index
    # Render the login form
  end

  def create
    user = User.find_by(username: params[:username])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to dashboard_path, notice: 'Logged in successfully'
    else
      flash.now[:alert] = 'Invalid username or password'
      render :index
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to login_path, notice: 'Logged out successfully'
  end
end
