class HomeController < ApplicationController
  def index
    # Fetch upcoming events with associated host, club, event_type, and category
    @events = Event.includes(:host, :club, :event_type, :category)
      .where("event_datetime >= ?", DateTime.now)
      .order(event_datetime: :asc) # Order by datetime, default to ascending
  end

  def dashboard
    @events = Event.includes(:host, :club, :event_type, :category)
      .where("event_datetime >= ?", DateTime.now)
      .order(event_datetime: :asc) # Order by datetime, default to ascending
  end
end
