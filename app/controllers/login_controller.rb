class LoginController < ApplicationController
  def index
    # Render the login form
  end

  def create
    logger.debug "Params received: #{params.inspect}"

    user = User.find_by(username: params[:username])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      # redirect_to dashboard_path, notice: 'Logged in successfully'
      flash[:notice] = "Logged in sucessfully"
      redirect_to dashboard_path
    else
      logger.debug "Authentication failed"
      flash.clear
      flash.now[:alert] = "Invalid username or password"
      # render :index
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.replace("login_form", partial: "login/form") }
        format.html { render :index }
      end
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to home_path, notice: "Logged out successfully"
  end
end
