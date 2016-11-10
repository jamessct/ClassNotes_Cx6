# Quick 'this' Review

## Learning Objectives
- Revisit this

## Duration 
10 mins

# Instructor Notes
Show the initial app and explain what it does. We use the 'celebrate' property on the athlete to allow them to optionally celebrate() after a sprint.

1. Console log 'this' in the race
2. Console log 'this' in the athlete celebrate callback

Explain that the line of code for celebrate() is executed in the Athlete, not the Race, and that's why this has changed etc.

3. Try to write out "Mo has won the "+this.name in the celebrate callback and show that it prints out the Athlete name, not the race
4. Show that using .bind() fixes this, demo .bind( {name: "jeff"} ) to show that it can be set to any object. Explain that bind is a method on a Function object.