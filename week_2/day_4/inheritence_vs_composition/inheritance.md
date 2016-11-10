# Inheritance

##Learning Objectives

- Be able to describe inheritance
- Implement superclass and subclass
- Know how to override methods
- Know how to invoke super behaviour
- Sharing a constructor

# Duration 2 hours

Sometimes we might have a bunch of classes that all share some behaviour. For example, a car can accelerate and so can a boat.

A sparrow can fly. But so can a duck!

How can we represent this in our code?

```
touch sparrow.rb duck.rb
mkdir specs
touch specs/sparrow_spec.rb specs/duck_spec.rb

subl .

#sparrow_spec

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

#sparrow
class Sparrow
	def fly
		"flying"
	end
end

```

Now if we want our duck to fly what do we do? The simplest solution is that we can copy and paste the code.

```
#duck_spec
require('minitest/autorun')
require_relative('../duck')

class DuckTest < MiniTest::Test
	def setup
		@duck = Duck.new
	end

	def test_duck_can_fly
		assert_equal("flying", @duck.fly)
	end
end

#duck
class Duck
	def fly
		"flying"
	end
end

```
This is dirty.

We want to be able to reuse our code.

If we change this method we need to alter it in two places. We can move this to a "super class" where the behaviour can be shared among the two "sub classes".

```
#terminal
touch bird.rb

#bird.rb
class Bird
   def fly
		"flying"
	end
end

#duck
require_relative('bird')
class Duck < Bird

end

#sparrow
require_relative('bird')
class Sparrow < Bird

end

```
Our test still passes. This is as if the two classes are joined together - the behaviour is passed down to the subclass. This is called "inheriting" properties or behaviours.

##Overriding

If we declare a method with the same name in a subclass that is shared with a parent, we override it.  Ruby first looks to the class, and then the super class.  Let's change the duck so it has specific behaviour.
```
class DuckTest < MiniTest::Test
	def setup
		@duck = Duck.new
	end

	def test_duck_can_fly
		assert_equal("duck flying", @duck.fly)
	end
end
```

```
#duck
class Duck < Bird
	def fly
		"duck flying"
	end
end
```
##Super
What if wanted our duck to do something unique and to also do it's parent behaviour.  Enter super.

Super calls it's parent(super) class method.
```
#duck
class Duck < Bird
	def fly
		bird_flying = super()
		"duck " + bird_flying
	end
end
```


## Shared Constructor

Note that if we add a constructor to Bird, all of the derived classes share it.

```
#bird
  attr_reader :num_legs
  def initialize
    @num_legs = 2
  end

#duck_spec
def test_duck_has_2_legs
	assert_equal(2, @duck.num_legs)
end
```
If we added a parameter to the constructor, all of our bird classes would have to use it.

```
#bird
  attr_reader :num_legs
  def initialize(num_legs)
    @num_legs = num_legs
  end
```

See that tests fail.


[i] Task - 30mins.  
- Make a Person class.  A person should have a first name, last name and health(starts at 100) and a talk method which say's their name.
- Make a Healer class, which inherits from person and can heal themselves, increasing health by 10.

#Using Inheritance

We can now understand where the assert_equal method comes from in our tests.  Because we inherit from MiniTest::Test the object has method it has inherited that we can use.  

#Warning
It is important for us to know about inheritance as it is commonly used in many libraries.  However large complicated inheritance structures can often make our programs very difficult to read.
