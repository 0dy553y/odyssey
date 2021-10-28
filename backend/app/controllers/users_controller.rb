# frozen_string_literal: true

class UsersController < ApplicationController
  include UserHelper

  def user_details
    @user = user
  end
end
