
require_relative( 'models/pokemon' )
require_relative( 'models/trainer' )
require_relative( 'models/owned_pokemon' )

require( 'pry-byebug' )

OwnedPokemon.delete_all()
Trainer.delete_all()
Pokemon.delete_all()

trainer1 = Trainer.new({ 'name' => 'Tony' })
trainer2 = Trainer.new({ 'name' => 'Valerie' })

trainer1.save()
trainer2.save() 

pokemon1 = Pokemon.new({ 'name' => 'Charmander'})
pokemon2 = Pokemon.new({ 'name' => 'Pikachu' })

pokemon1.save()
pokemon2.save()

owned_pokemon1 = OwnedPokemon.new({ 'trainer_id' => trainer1.id , 'pokemon_id' => pokemon1.id })
owned_pokemon2 = OwnedPokemon.new({ 'trainer_id' => trainer2.id , 'pokemon_id' => pokemon1.id })
owned_pokemon3 = OwnedPokemon.new({ 'trainer_id' => trainer2.id , 'pokemon_id' => pokemon2.id })


owned_pokemon1.save
owned_pokemon2.save
owned_pokemon3.save


binding.pry
nil
