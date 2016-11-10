require( 'sinatra' )
require( 'sinatra/contrib/all' )
require( 'pry-byebug' )
require_relative('./models/pizza') 

get '/pizza' do
  @pizzas = Pizza.all()
  erb ( :index )
end

get '/pizza/:id' do
  # find pizza with specified id
  @pizza = Pizza.find( params[:id] )
  erb( :show )
end

get '/pizza/new' do 
  erb( :new )
end

post '/pizza' do 
  @pizza = Pizza.new( params )
  @pizza.save() 
  erb( :create )
end

get '/pizza/:id/edit' do
  @pizza = Pizza.find( params[:id] )
  erb( :edit )
end

post '/pizza/:id' do
  @pizza = Pizza.update( params )
  redirect to( "/pizza/#{params[:id]}" )
end

post '/pizza/:id/delete' do
  Pizza.destroy( params[:id] )
  redirect to('/pizza')
end