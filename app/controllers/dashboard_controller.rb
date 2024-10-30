class DashboardController < ApplicationController
  # require user login
  before_action :require_login
  
  def index
  end
end
