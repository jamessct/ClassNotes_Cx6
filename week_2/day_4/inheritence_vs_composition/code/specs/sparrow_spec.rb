require('minitest/autorun')
require_relative('../sparrow')

class SparrowTest < MiniTest::Test
	def setup
		@sparrow = Sparrow.new
	end

	def test_sparrow_can_fly
		assert_equal("flying", @sparrow.fly)
	end
end
