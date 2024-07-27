class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :validatable, :confirmable, :jwt_authenticatable, jwt_revocation_strategy: self

  before_create :generate_otp

  def generate_otp
    self.otp = SecureRandom.hex(3).to_i(16).to_s.rjust(6, '0')
    self.otp_sent_at = Time.now.utc
    self.otp_verified = false
  end

  def verify_otp(otp)
    return false if otp_verified || otp_expired?

    if self.otp == otp
      update(otp_verified: true)
      true
    else
      false
    end
  end

  def otp_expired?
    otp_sent_at < 10.minutes.ago
  end
end
