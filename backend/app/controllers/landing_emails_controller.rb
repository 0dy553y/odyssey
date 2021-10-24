# frozen_string_literal: true

class LandingEmailsController < ApplicationController
  skip_before_action :authenticate_user!

  # POST /landing_emails
  def create
    @landing_email = LandingEmail.new(landing_email_params)

    if @landing_email.save
      show_success_message('Success! Stay tuned for good things coming your way.')
      render :show, status: :created, location: @landing_email
    else
      show_error_message('Something failed... please try again later :-(')
      render 'layouts/empty', status: :unprocessable_entity
    end
  end

  private

  def landing_email_params
    params.require(:landing_email).permit(:email)
  end
end
