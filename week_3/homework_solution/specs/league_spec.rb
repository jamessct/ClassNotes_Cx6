require( 'minitest/autorun' )
require('pry-byebug')
require_relative( '../models/league' )
require_relative( '../models/team' )
require_relative( '../models/match' )


class TestSales < Minitest::Test

  def setup
    @team1 = Team.new({'name' => 'Edinburgers'})
    @team1.id = 1
    @team2 = Team.new({'name' => 'FC Glasgae'})
    @team2.id = 2
    @team3 = Team.new({'name' => 'Living Stone United'})
    @team3.id = 3
    @team4 = Team.new({'name' => 'AmberDeen'})
    @team4.id = 4
    @match1 = Match.new({'away_id' => @team1.id, 'home_id' => @team2.id, 'away_score' => 2, 'home_score' => 2})
    @match2 = Match.new({'away_id' => @team3.id, 'home_id' => @team4.id, 'away_score' => 5, 'home_score' => 2})
    @match3 = Match.new({'away_id' => @team4.id, 'home_id' => @team1.id, 'away_score' => 0, 'home_score' => 9})
    @match4 = Match.new({'away_id' => @team2.id, 'home_id' => @team3.id, 'away_score' => 8, 'home_score' => 6})
    matches = [@match1, @match2, @match3, @match4]
    teams = [@team1, @team2, @team3, @team4]
    @league = League.new(matches, teams)
  end

  def test_all_goals
    assert_equal( 34, @league.all_goals )
  end

end 