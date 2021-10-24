class LandingEmailsController < ApplicationController
  before_action :set_landing_email, only: %i[ show update destroy ]

  # GET /landing_emails
  # GET /landing_emails.json
  def index
    @landing_emails = LandingEmail.all
  end

  # GET /landing_emails/1
  # GET /landing_emails/1.json
  def show
  end

  # POST /landing_emails
  # POST /landing_emails.json
  def create
    @landing_email = LandingEmail.new(landing_email_params)

    if @landing_email.save
      render :show, status: :created, location: @landing_email
    else
      render json: @landing_email.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /landing_emails/1
  # PATCH/PUT /landing_emails/1.json
  def update
    if @landing_email.update(landing_email_params)
      render :show, status: :ok, location: @landing_email
    else
      render json: @landing_email.errors, status: :unprocessable_entity
    end
  end

  # DELETE /landing_emails/1
  # DELETE /landing_emails/1.json
  def destroy
    @landing_email.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_landing_email
      @landing_email = LandingEmail.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def landing_email_params
      params.require(:landing_email).permit(:email)
    end
end
