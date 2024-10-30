class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # for user session
  helper_method :current_user  # Makes current_user available in views

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def require_login 
    unless current_user
      redirect_to login_path
    end
  end
end
