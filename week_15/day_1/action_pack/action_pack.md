#Action Pack


 - 'From request to response'

2hrs

##Learning Objectives
 - Understand the role of ActionPack
 - Create a rails application using ActionPack functionality.
 - Describe the role of
  - Router
  - Controllers
  - Views
 - Create a static application using ActionPack responding with either json or HTML


##Introduction
Handling incoming HTTP requests and creating the response. This is the cycle that web frameworks are created to handle.  In Rails it is the router, controllers and views role to handle this. ActionPack is the name given to this part of Rails.

https://github.com/rails/rails/tree/master/actionpack

Let's create a new application to see action pack in action.
We're going to create an application that will return a list of animals.

```
  rails new animals
  cd animals
  subl .
  rails server
```

We would like to be able to go to localhost:3000/animals and see a list of animals.

Rails will tell us what is missing.

"No route matches [GET] "/animals""

It also give us a link to the documents.

##Routing

The router is the first object we control that the request comes into contact with.
The routers role is is to recognise the URL and action of the HTTP request and dispatch it to a controller action.

[i]: Draw single router and Controller

Our application is telling us that there is no route defined for a GET to '/animals'.

Let's go and tell our router about this.

goto /config/routes.rb

There are lots of commented out examples of ways to set up routes.

We're going to setup a regular route.  We want to make a route for

GET /animals

```
  get 'animals' => 'animals#index'
```

What happened here.  get is just a method, which takes in a hash.

```
  get( { 'animals' => 'animals#index' } )
```

Ruby allows us to remove the brackets for calling a method and passing in a hash.
As long as it's the last method.

The router has dispatched the request to be handled by an AnimalsController.  We haven't made this yet.  We'll do that next.

#Controller
MVC - Model View Controller.

The router determines which controller to use.  The controllers job is to make sense of the request and to produce the appropriate output.

Let's generate the controller. Rails does give command line tools to help creating files,  but we simply just need to create a controller here.  Let's do it manually.

!!!! Notice that controller names are plural !!!!

```
  touch app/controllers/animals_controller.rb
```

We now need to create the class of AnimalsController.  This will inherit (discuss) from the the application controller. Giving it this out the box controller functionality.  

```
  //animals_controller.rb
  class AnimalsController < ApplicationController
  end
```

localhost:3000/animals

We now have a different error.  Unknown action. The controller has been found but the action index is not defined.   Actions are defined as methods on the controller.  Let's define the index action.

```
  class AnimalsController < ApplicationController
    def index
    end
  end
```

A new error. Great. This bring us to the V in MVC the view. The router dispatched the request to the controller.  The controller expects there to be a view defined.

Rails favours convention over configuration.  Default conventions are set up that we can follow.  A good example of this is how controllers looks for view files. Rails follows the convention of looking for views in the views folder.

We can do this by creating a folder 'animals',  and a file 'index.html.erb'.

```
mkdir app/views/animals
touch app/views/animals/index.html.erb
```

No error great.  Let's put his something in the view folder

```
views/animals/index.html.erb
<h2> Animals </h2>
```

We don't have to explicitly tell the controller to render anything. According to the 'convention over configuration' principle it automatically finds the file in the views folder action_name.html.erb.

Note the name of the file is important if it doesn't match the action Rails will not find it.

We have fulfilled a request/response cycle using Rails/ActionPack.  We have seen the Router dispatch the HTTP request to the correct controller.  And the Controller generate and return an HTTP response using a View which it has found by the convention of rendering the file in views folder.

##Passing information between the controller and View.
What we would like is to display a list of animals.  Let's create a list of animals in our controller.

```
  class AnimalsController < ApplicationController
    def index
      @animals = [ {name: "Tiger"}, {name: "Snow Leopard"} ]
    end
  end
```

Now how do we expose this instance variable to the view? Rails exposes instance variables from the controller to the view! What! Exposes instance variables.  Yes this is pretty hideous but it is how Rails chose to do it and it's not going anywhere.  To expose something from a controller action make it an instance variable. Yuk,

```
//views/animals/index.html.erb
<h2> Animals </h2>

<ul>
  <% @animals.each do |animal| %>
    <li> <%=animal[:name]%> </li>
  <% end %>
</ul>
```


#Rails as an API
Rails is great as a server side application framework, rendering the HTML.  However as we have seen the role of a server side framework is becoming more about delivering data (JSON) than html.  

Rails also works great as an API.  To do this we don't need to worry about the views, and just generate the JSON.  This is how we are going to be focusing on using Rails.  More MC, than MVC.

To do this we need to tell our controller how to respond with different formats.

The respond_to controller method is designed for this. We won't use a view for sending json we will explicitily tell the controller to render the animals as json.

```
  def index
    @animals = ["Tiger", "Snow Leopard"]
    respond_to do |format|
      format.html
      format.json { render :json => @animals }
    end
  end
```

When using Rails as an API we also need to alter the application controller. This is to protect again CSRF attacks:

"an attack outlined in the OWASP Top 10 whereby a malicious website will send a request to a web application that a user is already authenticated against from a different website. This way an attacker can access functionality in a target web application via the victim's already authenticated browser. Targets include web applications like social media, in-browser email clients, online banking and web interfaces for network devices"
[https://www.veracode.com/security/csrf]()

application_controller.rb

```
  protect_from_forgery with: :null_session
```

We should see the JSON being return when going to http://localhost:3000/animals.json.


#Exercise
- Make a new api app of your choice with hard coded data
