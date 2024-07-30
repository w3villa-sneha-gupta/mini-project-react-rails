# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  include RackSessionsFix
  respond_to :json

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:phone_number])
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200, message: 'Registered successfully. Please verify your email and phone number to login.' },
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }
    else
      # Log errors for debugging
      Rails.logger.debug("User creation failed: #{resource.errors.full_messages}")
      error_message = resource.errors.full_messages.to_sentence
      render json: {
        status: { message: error_message }
      }, status: :unprocessable_entity
    end
  end

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:phone_number])
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:phone_number])
  end
end
