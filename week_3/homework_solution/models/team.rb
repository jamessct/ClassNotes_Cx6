require( 'pg' )
require_relative('../db/sql_runner')

class Team

  attr_accessor :id, :name

  def initialize(options)
    @id = options['id'].to_i
    @name = options['name']
  end

  def save()
    sql = "INSERT INTO teams (name) VALUES ('#{@name}') RETURNING *"
    team = SqlRunner.run(sql).first
    @id = team['id'].to_i
  end

  def matches()
    sql = "SELECT * FROM matches WHERE away_id = #{@id} OR home_id = #{@id}"
    matches = Match.map_items(sql)
    return matches
  end

  def results()
    matches = matches()
    result = {
      wins: 0,
      losses: 0,
      draws: 0
    }
    matches.each do |match|
      if match.is_draw?
        result[:draws] += 1 
        next
      end
      result[:wins] += 1 if match.result[:winner].id == @id
      result[:losses] += 1 if match.result[:loser].id == @id
    end
    return result
  end

  def self.all()
    sql = "SELECT * FROM teams"
    return Team.map_items(sql)
  end

  def self.delete_all()
    sql = "DELETE FROM teams"
    SqlRunner.run(sql)
  end

  def self.find(id)
    sql = "SELECT * FROM teams WHERE id = #{id}"
    team = Team.map_item(sql)
    return team
  end

  def self.map_items(sql)
    teams = SqlRunner.run(sql)
    result = teams.map { |team| Team.new( team ) }
    return result
  end

  def self.map_item(sql)
    result = Team.map_items(sql)
    return result.first
  end

end