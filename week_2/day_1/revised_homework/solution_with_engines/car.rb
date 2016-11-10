class Car
  attr_reader :fuel, :speed
  def initialize(engine)
    @fuel = 100
    @speed = 0
    @engine = engine
  end

  def accelerate()
    @speed += @engine.acceleration()
    @fuel -= @engine.fuel_usage()
  end

  def break()
    @speed -= 10
    @speed = 0 if @speed < 0
  end
end
