require 'pry-byebug'
require_relative('../models/rental.rb')

#index
get '/rentals' do
  @rentals = Rental.all()
  erb :'rentals/index'
end

#new

#create
