# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    protect_from_forgery
    include RackSessionsFix
    respond_to :json
  
    def google_oauth2
        handle_auth "Google"
      end
    
      def facebook
        handle_auth "Facebook"
      end
    
      def handle_auth(kind)
        @user = User.from_omniauth(request.env["omniauth.auth"])
    
        if @user.persisted?
          flash[:notice] = I18n.t "devise.omniauth_callbacks.success", kind: kind
          sign_in_and_redirect @user, event: :authentication
        else
          session["devise.#{kind.downcase}_data"] = request.env["omniauth.auth"]
          redirect_to new_user_registration_url, alert: @user.errors.full_messages.join("\n")
        end
      end
    # Optionally, you might want to override the after_omniauth_failure_path_for method
    # to handle failures differently if necessary.
end
  