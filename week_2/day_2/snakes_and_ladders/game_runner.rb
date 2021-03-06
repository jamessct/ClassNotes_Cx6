require_relative('./game')
require_relative('./adjuster')

class GameRunner
  def initialize(game)
    @game = game
  end

  def run_game
    puts "Welcome to Snakes and Ladders, first to square #{ @game.target() } wins."
    while( !@game.winner() ) do
      play_turn()
    end

    puts "#{ @game.winner[:name] } wins the game. Woo."
  end

  def play_turn
    puts "#{@game.current_player()[:name]}. Press Enter to roll dice."
    gets
    info = @game.play_turn( rand(1..6) )
    show_turn_info( info )
  end

  def show_turn_info( turn_info )
    puts "#{turn_info[:player_name]} rolled a #{turn_info[:roll]}"

    adjustment = turn_info[:adjustment]
    if( adjustment )
      if( adjustment > 0 )
        puts "Nice you hit a ladder move forward #{ adjustment }"
      else
        puts "Ooh, snake! Move back #{ adjustment }"
      end
    end
    puts "#{turn_info[:player_name]} now at positon #{turn_info[:end_position]}"
    puts "\n"
  end

end
adjuster = Adjuster.new( {4 => 2, 6 => -1})
game = Game.new("Jay", "Tony", 8, adjuster)
runner = GameRunner.new( game )
runner.run_game()