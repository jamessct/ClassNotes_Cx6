Class v Object
Class like blueprint. Perform operation on the object created from the class.  Instantiate.

4 Pillars:
Abstraction
  Abstract our program into classes and objects. Each object has it's own responsibility.  Think about our program from the view of the object.  Try and achieve *Single Responsibility Principle*
Encapsulation
  Keeping information private that doesn't need to be seen by other objects. Keep instance variables private.  Only expose the methods that are required.
Inheritance
  Pull out behaviour into a superclass.  All objects inheriting from superclass get this behaviour.
  *Favour composition over inheritance*
Polymorphism
  An object can act as many things. It's type can be considered that of any interfaces it implements, or classes it extends.

  * Decoupling classes *
  * Program to an interface no an implementation *
  * Dependency Inversion *

Abstract Class
  Class that cannot be instantiated. Defined methods that subclasses can share.  DRY code.

Interface
  Set of methods a class must implement. 
  Not a class. A contract. 

  Subclass can only have ONE superclass

  class can implement many interfaces

Composition
    Object delegating to another object to achieve a task.
    Design Pattern
    * Strategy * Has a setter
    * Dependency Injection * 

Overriding vs Overloading
  Overriding -> Implementing a method defined in a superclass
  Overloading -> Methods with the same name but different signatures, number or type of input parameters.