class AddOtpToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :otp, :string
    add_column :users, :otp_sent_at, :datetime
    add_column :users, :otp_verified, :boolean
    add_column :users, :email_verified, :boolean
    add_column :users, :phone_verified, :boolean
  end
end
