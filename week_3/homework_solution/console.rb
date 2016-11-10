require_relative( 'models/match.rb' )
require_relative( 'models/team.rb' )
require_relative( 'models/league.rb' )

require( 'pry-byebug' )

Match.delete_all()
Team.delete_all()


team1 = Team.new({'name' => 'Edinburgers'})
team1.save()
team2 = Team.new({'name' => 'FC Glasgae'})
team2.save()
team3 = Team.new({'name' => 'Living Stone United'})
team3.save()
team4 = Team.new({'name' => 'AmberDeen'})
team4.save()

match1 = Match.new({'away_id' => team1.id, 'home_id' => team2.id, 'away_score' => 2, 'home_score' => 2})
match1.save
match2 = Match.new({'away_id' => team3.id, 'home_id' => team4.id, 'away_score' => 5, 'home_score' => 2})
match2.save
match3 = Match.new({'away_id' => team4.id, 'home_id' => team1.id, 'away_score' => 0, 'home_score' => 9})
match3.save
match4 = Match.new({'away_id' => team2.id, 'home_id' => team3.id, 'away_score' => 8, 'home_score' => 6})
match4.save

matches = Match.all()
teams = Team.all()

league = League.new(matches, teams)

binding.pry
nil
