require_relative( 'models/pokemon' )
require_relative( 'models/trainer' )
require( 'pry-byebug' )


trainer1 = Trainer.new({ 'name' => 'Tony' })
trainer2 = Trainer.new({ 'name' => 'Valerie' })

trainer1.save()
trainer2.save() 

pokemon1 = Pokemon.new({ 'name' => 'Charmander'})
pokemon2 = Pokemon.new({ 'name' => 'Pikachu' })

pokemon1.save()
pokemon2.save()

binding.pry
nil
