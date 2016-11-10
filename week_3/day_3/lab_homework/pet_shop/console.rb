require_relative('./models/store')
require_relative('./models/pet')
require_relative('./db/sql_runner')


require( 'pry-byebug' )

runner = SqlRunner.new( {dbname:'pet_shop', host:'localhost'} )

store = Store.new( {'name' => "HeavyPetting", 'address' => '1 Street, Town', 'stock_type' => 'Slow Pets'}, runner )
store.save()


pet1 = Pet.new( { 'name' => 'George', 'type' => 'Sloth', 'store_id' => store.id }, runner )
pet2 = Pet.new( { 'name' => 'Sarah',  'type' => 'Tortoise', 'store_id' => store.id}, runner )

pet1.save()
pet2.save()

binding.pry
nil
