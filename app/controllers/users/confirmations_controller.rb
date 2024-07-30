# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  skip_before_action :verify_authenticity_token
  include RackSessionsFix
  respond_to :json

  # POST /resource/confirmation
  def create
    self.resource = resource_class.send_confirmation_instructions(resource_params)
    if successfully_sent?(resource)
      render json: { status: 'success', message: 'Confirmation instructions sent.' }, status: :ok
    else
      render json: { status: 'error', errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    user = User.find_by(confirmation_token: params[:confirmation_token])

    if user.present? && user.confirmed_at.nil?
      user.update(email_verified: true, confirmed_at: Time.current)
      user.update(otp: SecureRandom.hex(3)) # Generate a 6-character OTP
      send_phone_otp(user)
      render json: { status: 'success', message: 'Email verified successfully.' }, status: :ok
    else
      render json: { status: 'error', errors: ['Invalid or expired confirmation token'] }, status: :unprocessable_entity
    end
  end

  private

  def send_phone_otp(user)
    if user.phone_number.present?
      client = Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
      client.messages.create(
        from: ENV['TWILIO_PHONE_NUMBER'],
        to: user.phone_number,
        body: "Your OTP for phone verification is #{user.otp}"
      )
    else
      raise "Phone number not provided."
    end
  end

  protected

  def json_request?
    request.format.json?
  end

  # GET /resource/confirmation/new
  # def new
  #   super
  # end

  # POST /resource/confirmation
  # def create
  #   super
  # end

  # GET /resource/confirmation?confirmation_token=abcdef
  # def show
  #   super
  # end

  # protected

  # The path used after resending confirmation instructions.
  # def after_resending_confirmation_instructions_path_for(resource_name)
  #   super(resource_name)
  # end

  # The path used after confirmation.
  # def after_confirmation_path_for(resource_name, resource)
  #   super(resource_name, resource)
  # end
end
