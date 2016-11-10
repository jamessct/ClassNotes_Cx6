class AnimalsController < ApplicationController
  def index
    @animals = ["Tiger", "Snow Leopard"]
    respond_to do |format|
      format.html
      format.json{ render :json => @animals }
    end
  end
end