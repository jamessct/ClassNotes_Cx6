require_relative('bird')
class Duck < Bird
  def fly
    parent_behaviour = super()
    return "#{parent_behaviour} duck!"
  end
end
