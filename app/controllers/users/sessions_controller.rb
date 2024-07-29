class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  include RackSessionsFix
  respond_to :json

  # POST /resource/sign_in
  def create
    if params[:email].present? && params[:password].present?
      user = User.find_by(email: params[:email])
      Rails.logger.debug "User found: #{user.inspect}"

      if user.present?
        if user.valid_password?(params[:password]) && user.active
          set_flash_message!(:notice, :signed_in)
          sign_in(user)
          render json: {
            status: { code: 200, message: 'Signed in successfully.' },
            data: UserSerializer.new(user).serializable_hash[:data][:attributes]
          }
        else
          render json: {
            status: { code: 401, message: 'User not activated. Please verify your account.' }
          }, status: :unauthorized
        end
      else
        render json: {
          status: { code: 401, message: 'Invalid email or password.' }
        }, status: :unauthorized
      end
    else
      render json: {
        status: { code: 400, message: 'Email and password are required.' }
      }, status: :bad_request
    end
  rescue StandardError => e
    Rails.logger.error "Error during sign-in: #{e.message}"
    render json: { status: { code: 500, message: 'Internal Server Error' } }, status: :internal_server_error
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
  end
end
