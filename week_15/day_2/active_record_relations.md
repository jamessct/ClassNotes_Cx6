# TicketMaster - Rails relations

### Objectives

- Build on SQL relationships learned in module one
- How we can use Rails & ActiveRecord to setup relations
- Build a working one-to-many and many-to-many api using rails

## Overview

We are going to build a ticketmaster app. It will be specifically for Music artists. Our app will be able to:

- Send Artists and associated Albums as JSON
- Send Artist Gigs and Venues as JSON

So a JSON API.

## Relationships

has\_many - Indicates a one-to-many connection with another model. This association indicates that each instance of the model has zero or more instances of another model.

belongs\_to - A belongs\_to association sets up a one-to-one connection with another model, such that each instance of the declaring model "belongs to" one instance of the other model.

has\_and\_belongs\_to\_many - A has\_and\_belongs\_to\_many association creates a direct many-to-many connection with another model, with no intervening model. We don't often make these as they restrict us - if we ever want to add information to the association we can't. 

has\_many :through - A has\_many :through association is often used to set up a many-to-many connection with another model. This association indicates that the declaring model can be matched with zero or more instances of another model by proceeding through a third model.


##Artists and Albums

First of all we have an Artist who will have, potentially, many albums. What's the relationship here? One to Many.

An Artist will also play at many Venues. But a Venue will also host many Artists. What's the relationship here? This is a Many-to-Many relationship. So we need a join table, Gig would be a good name for this table.

## Setup

Let's setup our app, in Terminal:

```
  rails new ticketmaster
  cd ticketmaster
  rake db:create
```

## Artist

The first model we want to setup is our Artist, for now it will just have a Name column. We setup a model using the Rails command line tools:

```
  rails generate model Artist name:string
  rake db:migrate
  rails console
```

If we look in app/models there will be a artist.rb with and Artist class. 

We can create some data in seeds.rb - remember 'create' does both 'new' and 'save' at once. We are saving these artists to variables in our seed file to be used later:

```
Artist.delete_all()

a1 = Artist.create( {name: 'Oasis'} )
a2 = Artist.create( {name: 'Justin Bieber'} )


//terminal 
rake db:seed
```

## Setting up our one to many

We now want to have associated albums. So we are going to need an Album Class:

```
  rails generate model Album name:string artist:references
  rake db:migrate
```

This sets up a new model in app/models. If we have a closer look at this model though we will notice something. There is a function being called.

```
belongs_to( :artist )
```

Using the artist:references in our rails command sets this up for us. If we have a look in our schema.rb we will see our new table and a column for artist_id.

This belongs_to sets up the one to one connection with another model. We still need to migrate for these changes to take affect:

```
# In seeds.rb:

Album.delete_all()

Album.create( { artist_id: a1.id, name: 'Roll With It' } )
Album.create( { artist_id: a2.id, name: 'An album title' } )

# In terminal:

rake db:seed
rails console
```

In rails console we now have access to our models and their functionality, which is currently being provided by the inherited ActiveRecord module:

```
  # View all albums - note the artist_id
  Album.all()
  # Save the last artist
  album = Album.last
  # Retrieve the associated artist
  album.artist
```

We now have the artist through the album. At the minute though we can't get all the albums associated to an artist. Try it and we get an error. How can we fix this?

We can invoke a function to setup a has_many link to albums in our Artist class:

```
  has_many( :albums )

  # in rails console:

  artist = Artist.first
  artist.albums
```

## Many to Many - Has many through

Now we can associate Artists to Albums we want to be able to associate Artists to Venues.

DRAW:

An Artist has many Venues and Venues have many Artists. We are going to use a Gig join table which will hold the venue_id and an artist_id. Each row in Gig will also include a ticket price and a date. We call this association in Rails a has many through.

In terminal:

```
  rails generate model Venue name:string location:string
  rake db:migrate
  rails generate model Gig price:integer date:datetime artist:references venue:references
  rake db:migrate
```

OK, we now have our table and model setup but we need to use the ActiveRecord methods so we can read the associated data.

#### Venue

A venue has many gigs but these are associated through the gigs table. So we can say in venue.rb:

```
  has_many( :gigs )
  has_many( :artists, {through: :gigs} )
```

#### Artist

The artist model has the same relationship just inversely:

```
  has_many( :gigs )
  has_many( :venues, {through: :gigs} )
```

#### Gig

Finally, a row in the gigs table belongs to a row in the other models (venue and artist):

```
//gig.rb
  belongs_to( :artist )
  belongs_to( :venue )
```

This should already be setup because of our references in our command line command when generating the model.

We can now add to our seeds.rb:

```
#top:
Gig.delete_all()
Venue.delete_all()

#bottom:
v1 = Venue.create( { name: 'o2', location: 'London' } )
v2 = Venue.create( { name: 'Corn Exchange', location: 'Edinburgh' } )

Gig.create( { price: 15, date: "2017-01-14", artist_id: a1.id, venue_id: v1.id  } )
Gig.create( { price: 15, date: "2017-03-23", artist_id: a2.id, venue_id: v2.id  } )

#in terminal:
rake db:seed
```

Now in the rails console we can see artist.gigs, venue.gigs, venue.artists etc.

## JSON API

Let's send our data down in JSON. We have an Artist so we need a controller to deal with sending the data. Let's create a controller.

```
touch app/controllers/artists_controller.rb
```

```
//artists_controller.rb

class ArtistsController < ApplicationController

  def index
    artists = Artist.all
    render :json => artists 
  end

end
```

Here we have setup a controller and passed in an index route by creating a method 'index'. Inside of this we read all the artists and send them down in JSON. Fire up the server and go to '/artists'. Why do we get this error?

We need to add it to our routes.rb:

```
  get 'artists' => 'artists#index'

```

The routes.rb deals with our incoming requests and delegates them to a controller and action split by the #.

Great, now we can GET all the artists we want to GET one. So we need a show route.

```
def show
  artist = Artist.find( params[:id] )
  render :json => artist 
end
```

And the routes.rb:

```
  get 'artists/:id' => 'artists#show'
```

Now we can get individual artists. We now want to expand our data and get the artists gigs? How can we do this?

## Nested Resources

Nested resources allow us to get data in reference to logical child or parent data. For example, we can get a single artist by /artists/6. Let's say we want to get the gigs that artist has. Logically, this would be a good route:

```
  artists/6/gigs
```

This would get us the all the gigs artist id 6 has. Let's make a gigs controller.

```
#in terminal:
touch app/controllers/gigs_controller.rb

#gigs_controller.rb
class GigsController < ApplicationController

end
```

Now we want to setup our routes. We have currently been setting up single routes but we can actually setup an entire set of RESTful routes with one rails method:

```
resources :artists 

#in terminal:
rake routes
```

Now we can see what has been setup for us! OK, we want to setup a nested route, how can we do that? In routes.rb, in rails we can:

```
resources :artists  do
  resources :gigs 
end

#in terminal:
rake routes
```

Now we can see we have this nested structure in place. Result. Let's make our index route in gigs_controller.rb:

```
def index
  gigs = Gig.where( { artist: params[:artist_id] } )
  render :json => gigs.as_json
end
```

We are grabbing all the gigs where the artist_id is equal to the artist_id in params. Note this is now artist_id ( Rails has done this for us because of our RESTful resources ). Then we send them down as json as before.

### Creating a new Gig

If we wanted to create a new Gig we can do with Insomnia. We need to add in:

```
//gigs_controller.rb

def create
  gig = Gig.create( { price: params[:price], date: params[:date], venue_id: params[:venue_id], artist_id: params[:artist_id] } )
  render( json: gig )
end
```

In Insomnia we can now POST to localhost:3000/artists/5/gigs to create a new gig for Artist number 5.

```
//JSON to POST in Insomnia

{ 
  "price": 9.99, 
  "date": "2016-09-09", 
  "venue_id": 1, 
  "artist_id": 5 
}
```

We can also actually take out the artist id from our request as it's already in the params from the URL.


```
//JSON to POST in Insomnia

{ 
  "price": 9.99, 
  "date": "2016-09-09", 
  "venue_id": 1
}
```


## Serialisation

Rails gives us some extra options when sending information as JSON. As well as sending information about one model, we can also include extra information about its associated models. Basically we are formatting the available data in the most useful way for us. This is called serialisation in Rails. 

The way we do this is to use a method called as_json on the information we are sending down. We can then tell it to include the information about one of its associations. For example with our list of artist's gigs, we can say to include the venue for each gig.  

```
def index
  gigs = Gig.where( { artist: params[:artist_id] } )
  render :json => gigs.as_json( { include: :venue } ) 
end
```

TASK: Include our albums on our artists show controller action [ 10 mins ]:

```
def show
  artist = Artist.find( params[:id] )
  render :json => artist.as_json( { include: :albums } ) )
end
```

We can also tell Rails which fields to include or exclude. For example for our gigs, let's only show the venue name.

```
def index
  gigs = Gig.where( { artist: params[:artist_id] } )
  render json: gigs.as_json( 
    { include: 
      { venue: { only: :name } }
    } 
  )
end
```

This can be a bit complicated to format (lots of brackets!) but can be really useful for formatting our APIs exactly how we want them to appear. 

More on serialisation:
http://api.rubyonrails.org/classes/ActiveModel/Serializers/JSON.html
