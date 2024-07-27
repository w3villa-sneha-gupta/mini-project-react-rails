class Users::OtpVerificationsController < ApplicationController
    skip_before_action :verify_authenticity_token
    respond_to :json
  
    # GET /otp_verifications/new
    def new
      @user = User.find(params[:user_id])
      if @user
        # This would typically render a form in an HTML view. For APIs, this might return JSON or a status.
        render json: { message: 'OTP verification page', user_id: @user.id }, status: :ok
      else
        render json: { status: 'error', message: 'User not found' }, status: :not_found
      end
    end
  
    # POST /otp_verifications
    def create
      @user = User.find(params[:user_id])
      if @user.verify_otp(params[:otp])
        @user.update(otp: nil, phone_verified: true) # Clear OTP and set phone_verified to true
        render json: { status: 'success', message: 'Phone number verified successfully.' }, status: :ok
      else
        render json: { status: 'error', message: 'Invalid OTP. Please try again.' }, status: :unprocessable_entity
      end
    end
  end


  