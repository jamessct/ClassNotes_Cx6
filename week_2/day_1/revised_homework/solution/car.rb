class Car

  attr_reader :fuel, :speed
  def initialize()
    @fuel = 100
    @speed = 0
  end

  def accelerate()
    @speed += 10
    @fuel -= 5
  end

  def break()
    @speed -= 10
    @speed = 0 if @speed < 0
  end
end
