require 'pry-byebug'
class League

  attr_accessor :matches

  def initialize(matches, teams)
    @matches = matches
    @teams = teams
  end

  def all_goals()
    all_goals = 0
    @matches.each {|match| all_goals += (match.away_score + match.home_score)}
    return all_goals
  end

  def winners()
    winners = @matches.select {|match| match.winner if match.winner}
    return winners
  end

  def results()
    final_scores = @teams.map do |team|
      {team: team,
       score: calculate_score(team)}
    end
    sorted_finals = final_scores.sort { |hash1, hash2| hash2[:score] <=> hash1[:score] }
    return sorted_finals
  end

  def calculate_score(team)
    wins = team.results[:wins]
    draws = team.results[:draws]
    win_points = wins * 3
    draw_points = draws
    return win_points + draw_points
  end



end