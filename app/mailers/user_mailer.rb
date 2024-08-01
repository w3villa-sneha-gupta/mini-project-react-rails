# app/mailers/user_mailer.rb
class UserMailer < ApplicationMailer
  default from: 'no-reply@example.com'

  def email_verification
    @user = params[:user]
    @url = verify_email_url(token: @user.verification_token)
    mail(to: @user.email, subject: 'Email Verification')
  end
end
