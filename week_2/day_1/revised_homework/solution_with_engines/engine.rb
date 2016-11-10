class Engine
  attr_reader :acceleration, :fuel_usage
  def initialize(acceleration, fuel_usage)
    @acceleration = acceleration
    @fuel_usage = fuel_usage
  end
end
