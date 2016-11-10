require('minitest/autorun')
require_relative('../car')
require_relative('../engine')

class TestCar < MiniTest::Test
  def test_car_speed_starts_0
    engine = Engine.new(10, 5)
    car = Car.new(engine)
    assert_equal(0, car.speed() )
  end

  def test_car_fuel_level_starts_at_100
    engine = Engine.new(10, 5)
    car = Car.new(engine)
    assert_equal(100, car.fuel() )
  end

  def test_accelerating_increases_car_speed
    engine = Engine.new(10, 5)
    car = Car.new(engine)
    car.accelerate()
    assert_equal(10, car.speed() )
  end

  def test_accelerating_increases_car_speed_by_engine
    turbo_engine = Engine.new(100, 5)
    car = Car.new(turbo_engine)
    car.accelerate()
    assert_equal(100, car.speed() )
  end

  def test_accelerating_decreases_fuel
    engine = Engine.new(10, 5)
    car = Car.new(engine)
    car.accelerate()
    assert_equal(95, car.fuel() )
  end

  def test_break_decreases_speed
    engine = Engine.new(10, 5)
    car = Car.new(engine)
    car.accelerate()
    car.break()
    assert_equal(0, car.speed() )
  end

  def test_break_doesnt_go_below_0
    engine = Engine.new(10, 5)
    car = Car.new(engine)
    car.break()
    assert_equal(0, car.speed() )
  end
end
