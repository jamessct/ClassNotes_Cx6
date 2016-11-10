#Snakes and Ladders

Let's make a game of snakes and ladders.

##Learning Objectives
	- Learn how to construct a game using multiple objects.
	- Learn how to TDD a solution, using an agile approach.
	- See example of Delegation.


#Basic
Get the class to think about how they could construct a game of snakes and ladders.
A game that has an array of players,  each just a hash.

Want to be able to move players by a value.

Simple game,  two players, alternative turns, moves player by a set amount each turn.

Setup game player state.
Allow moving players.


Setup state for current player
Allow finding current player
Allow changing current player

Allow player to play turn.

Create command line interface


Win Logic - Know when the game is won.
Dice - Move players by a random element.
Snakes and Ladders, certain positions which alter the position of the player.


## Game
	- state: array of players with their positions [{name:ad, position},{{name:ad, position}}]
	- functionality: can update the position of the player.(game.move({player:0, spaces:3}))
	```
		mkdir specs
		touch specs/game_spec.rb
	```

	```
	require 'minitest/autorun'
	require_relative '../game'
	class TestGame < Minitest::Test
		def setup
	    @game = Game.new("Jay", "Tony")
	  end
		def test_players_start_at_zero
			assert_equal( [ {name:"Jay", position:0}, {name:"Tony", position:0} ], @game.players )
		end
	end
	```


	Let's make this pass
	touch game.rb
	```
		class Game
			attr_reader :players
			def initialize(player_1_name, player_2_name)
				@players = [ {name:player_1_name, position:0}, {name:player_2_name, position:0}]
			end
		end
	```
That's the state set up.  Let's get to the functionality.
```
	def test_can_move_players
		@game.move_player(0, 5)
		assert_equal( {name:"Jay", position:5}, @game.players[0] )
	end
```
```
	def move_player(player_index, distance)
		player = @players[player_index]
		player[:position] += distance
	end
```

Now we would like someway to keep track of who is the current player
```
	def test_current_player_is_first_player
		assert_equal( {name:"Jay", position:0}, @game.current_player )
	end
```
```
	def initialize(player_1_name, player_2_name)
		@players = [ {name:player_1_name, position:0}, {name:player_2_name, position:0}]
		@current_player_index = 0
	end

	def current_player
		return @players[@current_player_index]
	end
```
Add move_current_player method, which updating the current_player to next player.

```
	def test_can_move_current_player
		@game.move_current_player(5)
		assert_equal( {name:"Jay", position:5}, @game.current_player )
	end
```

```
	def move_current_player(distance)
		move_player( @current_player_index, distance )
	end
```

We need to be able to change current player

```
	def test_can_change_current_player
		@game.change_current_player()
		assert_equal( {name:"Tony", position:0}, @game.current_player )
	end
```

```
	def change_current_player
		@current_player_index = (@current_player_index + 1) % @players.length
	end
```

Now we want method to play a turn.  This will need to update the current player
and change the turn.
```
def test_taking_turn_increases_current_player_position
	@game.play_turn(1)
	assert_equal( { name:"Jay", position:1 } , @game.players[0] )
end

def test_taking_turn_changes_current_player
	@game.play_turn(1)
	assert_equal( "Tony", @game.current_player[:name] )
end

def play_turn(number)
	move_current_player( number )
	change_current_player()
end
```

We'll setup the info has with information about the player and the roll number.  before we change the current player we'll get the position for the player who has just played.  We will see this info has in use next when we create the ui.

```
def test_taking_turn_return_turn_info
	info = @game.play_turn(1)
	assert_equal( {
		player_name: "Jay",
		roll: 1,
		end_position:1
	},
	info )
end

```


```
def play_turn(number)
	info = {
		player_name: current_player[:name],
		roll: number
	}
	move_current_player( number )
	info[:end_position] = current_player[:position]
	change_current_player()
	info
end
```

We are going to now want to create a UI for out basic version of the game.  To help in this we'll make the play turn method return some information about the turn that was just played.

We'll create a game runner class, this will take in a game that it will run.  It will be composed of this.  As this is our User Interface(View) object we will leave testing this for now.  The key game logic is abstracted in the game class which is nicely tested.

```
touch game_runner.rb
```
```
require_relative('./game')


class GameRunner
  def initialize(game)
    @game = game
  end

  def run_game
    puts "Welcome to Snakes and Ladders"
    while( true ) do
      play_turn()
    end
  end

  def play_turn
    puts "#{@game.current_player()[:name]}. Press Enter to roll dice. "
    gets
    info = @game.play_turn( 4 )
    show_turn_info( info )
  end

  def show_turn_info(turn_info)
    puts "#{ turn_info[:player_name] } rolled a #{ turn_info[:roll] }"
    puts "#{ turn_info[:player_name] } now at position #{ turn_info[:end_position] }"
    puts "\n"
  end

end

game = Game.new("Jay", "Tony")
runner = GameRunner.new(game)
runner.run_game

```
```
	ruby game_runner.rb
```

[LUNCH]

We now have a very simple game.  Not really snakes and ladders yet, but we have the basic mechanism for game in place, and simple UI This is an agile approach.  Try and get simple MVP up and running as soon as possible.


#With Win state.

## Add Win logic
Start basic, make target position if player gets above this then the game is won.

```
#game_spec
def setup
	@game = Game.new("Jay", "Tony",1)
end

def test_has_target
	assert_equal( 1, @game.target )
end
```
```
#game
attr_reader :players, :target
def initialize(player_1_name, player_2_name, target)
	...
	@target = target
end
```



Showing winner
```
def test_can_show_winner
	@game.move_current_player(5)
	assert_equal( {name:"Jay", position:5} , @game.winner )
end

def test_can_show_no_winner
	assert_equal( false , @game.winner )
end
```

```
def winner
	for player in @players
		return player if player[:position] >= @target
	end
	return false
end
```
Add to UI game_runner.rb.

```

def run_game
  puts "Welcome to Snakes and Ladders, first to square #{ @game.target } wins"
  while( !@game.winner ) do
    play_turn()
  end
  puts "#{@game.winner[:name]} wins the game. Woop"
end

```

#With Random movement
Add a Dice object and use this to put the value into what we are moving the player by.
Add to game.

touch dice.rb
```
class Dice
  def initialize(number_of_sides)
    @sides = number_of_sides
  end

  def roll
    Random.rand(@sides) + 1
  end
end
```

game_runner

```
require_relative('./dice')
class GameRunner
  def initialize(game, dice)
    @game = game
    @dice = dice
  end
	...
	def play_turn
    puts "#{@game.current_player()[:name]}. Press Enter to roll dice. "
    gets
    info = @game.play_turn( @dice.roll() )
    show_turn_info( info )
  end
end
	...
	game = Game.new("Jay", "Tony", 16)
	dice = Dice.new(6)
	runner = GameRunner.new(game, dice)
	runner.run_game
```

Nice we have a random element in the game.
But still no snakes and ladders.
How shall we add this.

#Adding Snakes and Ladders
Need certain positions that alter positively(ladder), negatively(snakes).
Add a movement adjuster.
```
	touch adjuster_spec.rb
	touch adjuster.rb
```
adjuster_spec.rb
```
require 'minitest/autorun'
require_relative '../adjuster'

class TestAdjuster < Minitest::Test
  def test_gives_adjustment
    adjuster = Adjuster.new( {4 => 6, 3 => -5} )
    assert_equal( 6, adjuster.adjustment(4) )
  end

  def test_gives_nil_if_no_adjustment
    adjuster = Adjuster.new( {4 => 6, 3 => -5} )
    assert_equal( nil, adjuster.adjustment(5) )
  end
end
```
adjuster.rb
```
class Adjuster
  def initialize(adjustments)
    @adjustments = adjustments
  end

  def adjustment( position )
    @adjustments[ position ]
  end
end
```

We now want our game to be able to have a adjuster that it can delegate to.

game_spec.rb
```
	def test_game_will_consider_adjustment
		adjustments = {4 => 8}
		adjuster = Adjuster.new(adjustments)
		info = @game.play_turn(4, adjuster)
		assert_equal( {
			player_name: "Jay",
			roll: 4,
			adjustment: 8,
			end_position:12
		},
		info )
	end
```


And now let's add this functionality to the game.
game.rb
```
def initialize( player_1_name, player_2_name, target, adjuster=nil)
	@players = [ {name:player_1_name, position:0}, {name:player_2_name, position:0}]
	@current_player_index = 0
	@target = target
	@adjuster = adjuster
end
...
def play_turn(number)
	info = {
		player_name: current_player[:name],
		roll: number
	}
	move_current_player( number )
	if @adjuster
		adjustment = @adjuster.adjustment( current_player()[:position] )
		info[:adjustment] = adjustment
		move_current_player( adjustment ) if adjustment
	end
	info[:end_position] = current_player[:position]
	change_current_player()
	info
end
```
game_runner.rb
```
	def show_turn_info(turn_info)
		puts "#{ turn_info[:player_name] } rolled a #{ turn_info[:roll] }"
		if( turn_info[:adjustment] )
			if( turn_info[:adjustment] > 0)
				puts "Nice you hit ladder move forward #{turn_info[:adjustment]}"
			else
				puts "Ouch, snake move back #{turn_info[:adjustment]}"
			end
		end
		puts "#{ turn_info[:player_name] } now at position #{ turn_info[:end_position] }"
		puts "\n"
	end


	adjustments = {4 => 8}
	adjuster = Adjuster.new(adjustments)
	game = Game.new("Jay", "Tony", 16, adjuster)
	runner = GameRunner.new(game, dice)
	runner.run_game
```

ruby game_runner.rb

#Further Lab - Homework
Add some extra functionality to the game.
