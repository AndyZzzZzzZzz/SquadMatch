class EventsController < ApplicationController
  # before_action :authenticate_user # Ensure the user is logged in
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
    @event.host_id = current_user.id
    if @event.save
      @event.participants.create(user: current_user, join_at: Time.current)
      redirect_to dashboard_path(refresh: true), flash: { event_create_notice: "Event created successfully" }
    else
      flash.clear
      flash.now[:alert] = @event.errors.full_messages.join(", ")
      @categories = Category.all
      @event_types = EventType.all
      @clubs = Club.all
      render :new
    end
  end

  def join
    @event = Event.find(params[:id])
    if @event.participants.exists?(user_id: current_user.id)
      render json: { status: "error", message: "You have already joined this event." }, status: :unprocessable_entity
      return
    end
  
    if @event.participants.count >= @event.capacity
      render json: { status: "error", message: "This event is full." }, status: :unprocessable_entity
      return
    end
    participant = Participant.new(user: current_user, event: @event, join_at: Time.current)
    if participant.save
      render json: { status: "success", message: "You have successfully joined the event." }, status: :ok
    else
      render json: { status: "error", message: participant.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  private
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
    redirect_to login_path, alert: "Please log in to create an event." unless current_user
  end
end
