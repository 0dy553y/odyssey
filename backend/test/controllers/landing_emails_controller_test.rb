require "test_helper"

class LandingEmailsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @landing_email = landing_emails(:one)
  end

  test "should get index" do
    get landing_emails_url, as: :json
    assert_response :success
  end

  test "should create landing_email" do
    assert_difference('LandingEmail.count') do
      post landing_emails_url, params: { landing_email: { email: @landing_email.email } }, as: :json
    end

    assert_response 201
  end

  test "should show landing_email" do
    get landing_email_url(@landing_email), as: :json
    assert_response :success
  end

  test "should update landing_email" do
    patch landing_email_url(@landing_email), params: { landing_email: { email: @landing_email.email } }, as: :json
    assert_response 200
  end

  test "should destroy landing_email" do
    assert_difference('LandingEmail.count', -1) do
      delete landing_email_url(@landing_email), as: :json
    end

    assert_response 204
  end
end
