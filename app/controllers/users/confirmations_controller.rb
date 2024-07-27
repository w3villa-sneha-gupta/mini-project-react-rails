# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  skip_before_action :verify_authenticity_token, if: :json_request?

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
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])

    if resource.errors.empty?
      render json: { status: 'success', message: 'Email confirmed successfully.' }, status: :ok
    else
      render json: { status: 'error', errors: resource.errors.full_messages }, status: :unprocessable_entity
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
