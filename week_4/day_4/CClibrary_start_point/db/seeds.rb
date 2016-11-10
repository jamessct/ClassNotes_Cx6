require('pry-byebug')
require_relative('../models/book.rb')
require_relative('../models/member.rb')
require_relative('../models/rental.rb')

Rental.delete_all()
Book.delete_all()
Member.delete_all()


book1 = Book.new({ 'title' => 'Eating people is wrong', 'author' => 'Malcolm Bradbury'})
book2 = Book.new({ 'title' => 'How to avoid huge ships', 'author' => 'Cpt. John W. Trimmer'})
book3 = Book.new({ 'title' => 'Everything I want to do is illegal', 'author' => 'Joel Salatin'})
book4 = Book.new({ 'title' => 'Old tractors and the men who love them', 'author' => 'Roger Welsh'})
book5 = Book.new({ 'title' => 'The practical pyromaniac', 'author' => 'William Gurstelle'})

book1.save
book2.save
book3.save
book4.save
book5.save


member1 = Member.new({ 'name' => 'Conan the Librarian', 'address' => 'Hyboria'})
member2 = Member.new({ 'name' => 'Val Gibson/Dryden', 'address' => 'Kanto region'})
member3 = Member.new({ 'name' => 'Antonio Eusebio De Abreu Goncalves', 'address' => 'Papa Tyno Authentic Italian Ristorante'})
member4 = Member.new({ 'name' => 'Jay Chetty', 'address' => 'TableTennisLand'})
member5 = Member.new({ 'name' => 'Zsolt Podoba-Szalai', 'address' => 'Nearest Chippie'})

member1.save
member2.save
member3.save
member4.save
member5.save


rental1 = Rental.new({'book_id' => book1.id, 'member_id' => member1.id})
rental2 = Rental.new({'book_id' => book2.id, 'member_id' => member1.id})
rental3 = Rental.new({'book_id' => book3.id, 'member_id' => member2.id})
rental4 = Rental.new({'book_id' => book4.id, 'member_id' => member1.id})
rental5 = Rental.new({'book_id' => book5.id, 'member_id' => member2.id})
rental6 = Rental.new({'book_id' => book3.id, 'member_id' => member3.id})
rental7 = Rental.new({'book_id' => book2.id, 'member_id' => member5.id})
rental8 = Rental.new({'book_id' => book4.id, 'member_id' => member5.id})

rental1.save
rental2.save
rental3.save
rental4.save
rental5.save
rental6.save
rental7.save
rental8.save

binding.pry
nil
