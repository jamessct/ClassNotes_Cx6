require( 'sinatra' )
require( 'sinatra/contrib/all' )
require( 'pry-byebug' )
require_relative('./models/shoe')

get '/shoes' do
  @shoes = Shoe.all()
  erb ( :index )
end

get '/shoes/new' do
  erb( :new )
end

post '/shoes' do
  @shoe = Shoe.new( params )
  @shoe.save()
  erb( :create )
end
