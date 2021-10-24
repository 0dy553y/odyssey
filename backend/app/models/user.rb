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
  has_many :created_challenges, class_name: 'Challenge',
                                foreign_key: :creator_id, inverse_of: :creator, dependent: :nullify

  has_many :sent_friend_requests, class_name: 'FriendRequest',
                                  foreign_key: :sender_id, inverse_of: :sender, dependent: :destroy
  has_many :sent_pending_friends, through: :sent_friend_requests, class_name: 'User', source: :sender
  has_many :received_friend_requests, class_name: 'FriendRequest',
                                      foreign_key: :receiver_id, inverse_of: :receiver, dependent: :destroy
  has_many :received_pending_friends, through: :received_friend_requests, class_name: 'User', source: :receiver

  has_many :from_friendships, class_name: 'Friendship',
                              foreign_key: :second_user_id, inverse_of: :first_user, dependent: :destroy
  has_many :from_friends, through: :from_friendships, class_name: 'User', source: :first_user
  has_many :to_friendships, class_name: 'Friendship',
                            foreign_key: :first_user_id, inverse_of: :second_user, dependent: :destroy
  has_many :to_friends, through: :to_friendships, class_name: 'User', source: :second_user

  has_many :posts, class_name: 'Post',
                   foreign_key: :creator_id, inverse_of: :creator, dependent: :destroy

  has_one_attached :avatar

  validates :email, uniqueness: { case_sensitive: false, if: -> { provider == 'email' } }
  validates :username, presence: true,
                       uniqueness: { case_sensitive: false },
                       format: {
                         with: /^[a-zA-Z0-9_.]*$/,
                         multiline: true,
                         message: 'only allows letters, numbers, underscore or punctuation'
                       }
  validates :avatar,
            content_type: { in: ['image/png', 'image/jpg', 'image/jpeg'], message: 'is not a supported file type' },
            size: { less_than: 1.megabytes, message: 'must be less than 1MB' }

  before_validation do
    self.uid = username if uid.blank?
    self.provider = 'username' if provider.blank?
  end

  def friendships
    from_friendships + to_friendships
  end

  def friends
    from_friends + to_friends
  end

  def email_required?
    false
  end

  def will_save_change_to_email?
    false
  end
end
