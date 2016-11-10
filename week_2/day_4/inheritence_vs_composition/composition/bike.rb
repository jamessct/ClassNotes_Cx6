

class Bike
  def initialize(sounder, propulsion)
    @sounder = sounder
    @propulsion = propulsion
  end
  def alert
    @sounder.trigger()
  end

  def accelerate
    @propulsion.move()
  end
end


class Horn
  def trigger
    "Honk Honk"
  end
end

class Pedal
  def move
    "Pedal Pedal"
  end
end

class ElectricEngine
  def move
    "Hmmm Hmm"
  end
end

class Bell
  def trigger
    "Ring Ring"
  end
end


bell = Bell.new()
pedal = Pedal.new()
bike = Bike.new( bell,  pedal)

puts bike.accelerate()
puts bike.alert()

horn = Horn.new()
engine = ElectricEngine.new()
bike_with_horn = Bike.new( horn, engine)
puts bike_with_horn.accelerate()
puts bike_with_horn.alert()
