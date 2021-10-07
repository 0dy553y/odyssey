# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User

  validates_uniqueness_of :email, case_insensitive: true
  validates_uniqueness_of :username, case_insensitive: true

  # only allow letter, number, underscore and punctuation.
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, multiline: true

  before_validation do
    self.uid = username if uid.blank?
  end

  def email_required?
    false
  end

  def will_save_change_to_email?
    false
  end
end

