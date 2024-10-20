module Api
  class EventsController < Api::ApplicationController
    def index
      # Fetch upcoming events with associated host, club, event_type, and category
      events = Event.includes(:host, :club, :event_type, :category)
      .where("event_datetime >= ?", DateTime.now)
      .order(event_datetime: :asc)

      # Define the data to be included in the JSON response
      render json: events.as_json(
      only: [:id, :title, :description, :event_datetime, :location, :capacity],
      include: {
      event_type: { only: [:id, :type_name] },
      category: { only: [:id, :name] },
      host: { only: [:id, :first_name, :last_name] },
      club: { only: [:id, :club_name] }
      }
      ), status: :ok
    end
  end
end
