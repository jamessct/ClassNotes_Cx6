require('minitest/autorun')
require_relative('../car')

class TestCar < MiniTest::Test
  def test_car_speed_starts_0
    car = Car.new()
    assert_equal(0, car.speed() )
  end

  def test_car_fuel_level_starts_at_100
    car = Car.new()
    assert_equal(100, car.fuel() )
  end

  def test_accelerating_increases_car_speed
    car = Car.new()
    car.accelerate()
    assert_equal(10, car.speed() )
  end

  def test_accelerating_decreases_fuel
    car = Car.new()
    car.accelerate()
    assert_equal(95, car.fuel() )
  end

  def test_break_decreases_speed
    car = Car.new()
    car.accelerate()
    car.break()
    assert_equal(0, car.speed() )
  end

  def test_break_doesnt_go_below_0
    car = Car.new()
    car.break()
    assert_equal(0, car.speed() )
  end
end
