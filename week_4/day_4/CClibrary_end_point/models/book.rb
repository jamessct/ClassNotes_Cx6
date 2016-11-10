require('pg')
require_relative('../db/sql_runner')

class Book

  attr_reader :id, :title, :author

  def initialize( options )
    @id = options['id'].to_i
    @title = options['title']
    @author = options['author']
  end

  def save()
    sql = "INSERT INTO books (title, author) VALUES ('#{@title}', '#{@author}' ) RETURNING *"
    book = SqlRunner.run(sql).first
    @id = book['id']
  end

  def members()
    sql = "SELECT m.* FROM members m INNER JOIN rentals r ON r.member_id = m.id WHERE book_id = #{@id}"
    return Member.map_items(sql)
  end

  def self.find(id)
    sql = "SELECT * FROM books WHERE id = #{id}"
    return Book.map_item(sql)
  end

  def self.all()
    sql = "SELECT * FROM books"
    return Book.map_items(sql)
  end

  def self.delete_all()
    sql = "DELETE FROM books"
    SqlRunner.run(sql)
  end


  def self.map_items(sql)
    book = SqlRunner.run(sql)
    result = book.map { |product| Book.new( product ) }
    return result
  end

  def self.map_item(sql)
    result = Book.map_items(sql)
    return result.first
  end

end
