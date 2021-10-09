# frozen_string_literal: true

require 'test_helper'

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @category = categories(:one)
  end

  test 'should get index' do
    get categories_url, as: :json
    assert_response :success
  end

  test 'should show category' do
    get category_url(@category), as: :json
    assert_response :success
  end
end
