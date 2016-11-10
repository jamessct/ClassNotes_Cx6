require('minitest/autorun')
require_relative('../engine')

class TestCar < MiniTest::Test
  def test_engine_should_have_fuel_usage
    engine = Engine.new(10, 5)
    assert_equal(5, engine.fuel_usage() )
  end

  def test_engine_should_have_acceleration
    engine = Engine.new(10, 5)
    assert_equal(10, engine.acceleration() )
  end
end
