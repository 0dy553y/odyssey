# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User

  has_many :user_challenges, dependent: :destroy
  has_many :challenges, through: :user_challenges
  has_many :user_tasks, dependent: :destroy
  has_many :tasks, through: :user_tasks

  validates :email, uniqueness: { case_sensitive: false, if: -> { provider == 'email' } }
  validates :username, presence: true,
                       uniqueness: { case_sensitive: false },
                       format: {
                         with: /^[a-zA-Z0-9_.]*$/,
                         multiline: true,
                         message: 'only allows letters, numbers, underscore or punctuation'
                       }

  before_validation do
    self.uid = username if uid.blank?
    self.provider = 'username' if provider.blank?
  end

  def email_required?
    false
  end

  def will_save_change_to_email?
    false
  end
end
