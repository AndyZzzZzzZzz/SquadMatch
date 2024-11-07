class EventsController < ApplicationController
  before_action :authenticate_user # Ensure the user is logged in
  # before_action :set_event, only: [:show, :edit, :update, :destroy]

  # GET /events
  # def index
  #   @events = Event.all.order(event_datetime: :asc)
  # end

  # GET /events/new
  def new
    @event = Event.new
    @categories = Category.all
    @event_types = EventType.all
    @clubs = Club.all
  end

  def create
    @event = Event.new(event_params)
    @event.host_id = current_user.id  # Set the host to the current user

    if @event.save

      @event.participants.create(user: current_user, join_at: Time.current)
      # redirect_to dashboard_path, notice: 'Event created successfully.'
      redirect_to dashboard_path, flash: { event_create_notice: "Event created successfully" }
    else
      # Re-initialize instance variables for rendering the form again
      flash.clear
      flash.now[:alert] = @event.errors.full_messages.join(", ")
      @categories = Category.all
      @event_types = EventType.all
      @clubs = Club.all
      render :new
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  # def set_event
  #   @event = Event.find(params[:id])
  # rescue ActiveRecord::RecordNotFound
  #   redirect_to events_path, alert: 'Event not found.'
  # end

  # Only allow a list of trusted parameters through.
  def event_params
    params.require(:event).permit(
      :club_id,
      :event_type_id,
      :title,
      :capacity,
      :location,
      :description,
      :category_id,
      :event_datetime
    )
  end

  # Load associations for form dropdowns
  def load_associations
    @clubs = Club.all
    @event_types = EventType.all
    @categories = Category.all
  end

  def authenticate_user
    redirect_to login_path, alert: 'Please log in to create an event.' unless current_user
  end
end
