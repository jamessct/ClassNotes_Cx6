require('minitest/autorun')
require_relative('./test.rb')

class TestTest < MiniTest::Test
  def test_does_test_work
    assert_equal("Yay?", @test)
  end
end