class Bike
  def alert
    "Ring Ring"
  end

  def accelerate
    "Pedal Pedal"
  end
end

class BikeWithHorn < Bike
  def alert
    "Honk Honk"
  end
end

class ElectricBike < Bike
  def accelerate
    "Hmmm Hmmm"
  end
end

class ElectricBikeWithHorn < BikeWithHorn
  def accelerate
    "Hmmm Hmmm"
  end
end

bike = Bike.new()
puts bike.accelerate()
puts bike.alert()

bikeWithHorn = BikeWithHorn.new()
puts bikeWithHorn.accelerate()
puts bikeWithHorn.alert()

electricBike = ElectricBike.new()
puts electricBike.accelerate()
puts electricBike.alert()
