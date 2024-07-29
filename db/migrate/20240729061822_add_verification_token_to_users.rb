class AddVerificationTokenToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :verification_token, :string
    add_column :users, :verification_token_sent_at, :datetime
  end
end
