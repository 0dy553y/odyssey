# frozen_string_literal: true

class CategoriesController < ApplicationController
    before_action :set_category, only: %i[show update destroy]
  
    def index
      @categories = Category.all
    end
  
    def show; 
        @category = Category.find(params.require(:id))
    end
  
    private
  
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
    end
  
    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:title)
    end
  end
  