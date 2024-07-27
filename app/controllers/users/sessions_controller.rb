# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  respond_to :json
  include RackSessionsFix

  def create
    self.resource = warden.authenticate!(auth_options)
    
    if resource.email_verified && resource.phone_verified
      sign_in(resource_name, resource)
      render json: { status: 'success', message: 'Signed in successfully.' }, status: :ok
    else
      sign_out(resource_name)
      render json: { status: 'error', message: 'Please verify your email and phone number before signing in.' }, status: :unauthorized
    end
  end

  protected
  
  private
  def respond_with(current_user, _opts = {})
    render json: {
      status: { 
        code: 200, message: 'Logged in successfully.',
        data: { user: UserSerializer.new(current_user).serializable_hash[:data][:attributes] }
      }
    }, status: :ok
  end
  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.devise_jwt_secret_key!).first
      current_user = User.find(jwt_payload['sub'])
    end
    
    if current_user
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
