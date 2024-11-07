module Api
  class EventsController < Api::ApplicationController
    def index
      # Fetch upcoming events with associated host, club, event_type, and category
      events = Event.includes(:users, :host, :club, :event_type, :category)
      .where("event_datetime >= ?", DateTime.now)
      .order(event_datetime: :asc)

      # Define the data to be included in the JSON response
      render json: events.as_json(
      only: [ :id, :title, :description, :event_datetime, :location, :capacity ],
      include: {
      users: { only: [ :id, :first_name, :last_name ] },
      event_type: { only: [ :id, :type_name ] },
      category: { only: [ :id, :name ] },
      host: { only: [ :id, :first_name, :last_name ] },
      club: { only: [ :id, :club_nq1ame ] }
      }
      ), status: :ok
    end

    # def join
    #   @event = Event.find(params[:id])
    
    #   if @event.participants.exists?(user_id: current_user.id)
    #     render json: { status: 'error', message: 'You have already joined this event.' }, status: :unprocessable_entity
    #     return
    #   end
    
    #   if @event.participants.count >= @event.capacity
    #     render json: { status: 'error', message: 'This event is full.' }, status: :unprocessable_entity
    #     return
    #   end
    
    #   participant = Participant.new(user: current_user, event: @event, join_at: Time.current)
    
    #   if participant.save
    #     render json: { status: 'success', message: 'You have successfully joined the event.' }, status: :ok
    #   else
    #     render json: { status: 'error', message: participant.errors.full_messages.join(', ') }, status: :unprocessable_entity
    #   end
    # end

  end
end
