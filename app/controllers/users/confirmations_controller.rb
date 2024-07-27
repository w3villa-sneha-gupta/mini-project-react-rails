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
      redirect_to new_otp_verification_path(user_id: user.id) and return# Redirect to OTP verification page
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
end
