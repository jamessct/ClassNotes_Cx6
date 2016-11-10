require( 'minitest/autorun' )
require_relative( '../models/shoe' )

class TestShoe < MiniTest::Test

  def setup
    options = {
      'name' => 'Jay',
      'address' => '91 Street Edinburgh',
      'size' => '10',
      'quantity' => '5'
    }
    @shoe = Shoe.new( options )
  end

  def test_name()
    assert_equal( 'Jay', @shoe.name() )
  end

  def test_address()
    assert_equal( '91 Street Edinburgh', @shoe.address() )
  end

  def test_size()
    assert_equal( 10, @shoe.size() )
  end

  def test_quantity()
    assert_equal( 5, @shoe.quantity() )
  end

end
