## Restful library

#### Objectives:

  - Extend an existing codebase to be able to create many-to-many relationships
  - Retreive data from many-to-many relationships
  - Create views to display said data

### Recap

So yesterday we extended our music library, creating a RESTful app with one-to-many relationship. That's fine and shiny, but last week we learned about another relationship - many-to-many.
[Q:] Ask students about possible many-to-many models (e.g. coffees-orders, pokemons-trainers, zombies-people, users-songs, library: books-members)

Since we accidentally have some codebase for a nice library, and since we all know that the future of passing on knowledge is in paper-based books, we are going to build an app to handle rentals for our CodeClan library!

## Create db/tables

Let's do some planning. Figure out how our db and models will look like!

We will need:

- Books
  - Columns
    - Title
    - Author
    - ID
  - Methods: save, self.all, self.delete, self.update, self.find, members

- Members
  - Columns:
    - Name
    - Address
    - ID
  - Methods: save, self.all, self.delete, self.update, self.find, books

- RentedBooks, or Rentals
  - Columns
    - BookID
    - MemberID
  - Methods: save, self.all, self.delete, self.update, self.find, book, member

Let's check out the starter code, shall we?

[Q:] Ask about ON DELETE CASCADE and map_items, go through file structure and layout.erb!

We have everything else set up for a basic starting point, except for one thing - Creating the db itself! Let's do it now!
In terminal:

```
createdb library
psql -d library -f db/library.sql
```

In terminal:
```
ruby db/seeds.rb
```

[Q:] Add a few more book/member/rental objects!

## To the browser!
```
ruby main.rb
```
Let's check out the functionality we already have!
As you can see, we can create new Members, Books, but not Rentals. Let's create it!

First, let's go backwards: I want to create a new Rental. For that, I need a form. For that, I'd like to see a link/anchor tag pointing towards that. Do I have it? No? Then let's create it!

In rentals/index.erb:

```
<div>
  <% @rentals.each do |rental| %>
    Book: <%= rental.book.title  %> - Rented by: <%= rental.member.name  %><br><hr>
  <% end %>
  <a href="rentals/new">Rent a book!</a>
</div>
```

What happens if we try to click on it? Sinatra doesn't know this ditty? Then show it how it's done!

[Q:] What do we need in order to create a new rental object?

in controllers/rental_controller.rb:

```
require 'pry-byebug'
require_relative('../models/rental')
require_relative('../models/book')
require_relative('../models/member')

#index
get '/rentals' do
  @rentals = Rental.all()
  erb(:'rentals/index')
end

#new
get '/rentals/new' do #NEW
  @books = Book.all()
  @members = Member.all()
  erb(:'rentals/new')
end

#create
```

Restart our server, then click on the link again. WHOO! No errors.
But still. It's empty. Desolate. Depressing. Let's liven it up a bit, shall we?
Let's create our form in new.erb:

Here we'll create a select tag with options for each book, and a select tag with options for each member.


```
touch views/rentals/new.erb
```

```
  <h2>New Rental</h2>

  <form action="/rentals" method="post">
    <label for="book_id">Book:</label>
    <select name="book_id">
    <% @books.each do |book| %>
      <option value="<%= book.id %>"><%= book.title %></option>
    <% end %>
    </select>
    <label for="member_id">Member:</label>
    <select name="member_id">
    <% @members.each do |member| %>
      <option value="<%= member.id %>"><%= member.name %></option>
    <% end %>
    </select>
    <input type='submit' value="Add Rental!">
  </form>
  <br>
  <br>
  <a href="/">Back</a>
```

Cool! A beautiful form! So what would happen if I click on submit? Nothing? Aww snap, we have to create the controller action for our post method too.

In controller/rental_controller

```
require 'pry-byebug'
require_relative('../models/rental')
require_relative('../models/book')
require_relative('../models/member')

#index
get '/rentals' do
  @rentals = Rental.all()
  erb(:'rentals/index')
end

#new
get '/rentals/new' do
  @books = Book.all()
  @members = Member.all()
  erb(:'rentals/new')
end

#create
post '/rentals' do #NEW
  @rental = Rental.new(params)
  @rental.save
  redirect to( "rentals" )
end
```

Nice one! We can redirect wherever we want, or do an erb(:'rentals/create'), it's up to us which one we prefer!

Beautiful! We can create new rentals!

But what if I want to check if Tony rented out his favourite book - Old tractors and the men who love them? We can manually search through our rentals - or better, we should just check it on Tony's own show page!

For us to display the necessary information we only need to come up with a nice method! member.books sound familiar? Let's start with the first step!

In our members/show.erb:

```
  <h2><%= @member.name %></h2>

  <h3>Address: <%= @member.address %></h3>

  Books rented out:
  <ul>
  <% @member.books.each do |book| %>
      <li>Book: <%= book.title %> By: <%= book.author %></li>
  <% end %>
  </ul>
```

Great! This will display all the rented books by our member in an unordered list. As soon as we write the method "books" for our Member class.

In models/member.rb:

```
def books()
  sql = "SELECT b.* FROM books b INNER JOIN rentals r ON r.book_id = b.id WHERE r.member_id = #{@id}"
  return Book.map_items(sql)
end
```


Excellent! So now if we go and check Tony, we can see what books were rented out by him!

Task:
  Let's create the same method for books! (book.members)

  ```
  def members()
    sql = "SELECT m.* FROM members m INNER JOIN rentals r ON r.member_id = m.id WHERE r.book_id = #{@id}"
    return Member.map_items(sql)
  end
  ```

  ```
  <div>
  <h1><%= @book.title %></h1>
  <h2>By: <%= @book.author %></h2>
  </div>

  Rented by:
  <ul>
    <% @book.members.each do |member| %>
      <li><%= member.name  %></li>
    <% end %>
  </ul>
  ```
