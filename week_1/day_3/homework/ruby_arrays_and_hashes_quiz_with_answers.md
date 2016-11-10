# Homework

### A. Given the following data structure:

```
lines = ['Gyle Centre', 'Edinburgh Park', 'Murrayfield Stadium', 'Haymarket', 'Princes Street']
```

1. Work out how many stops there are in the current west array ```lines.count```
2. Return 'Edinburgh Park' from the array ```lines[1]```
3. How many ways can we return 'Princes Street' from the array? ```lines[-1], lines[4]```
4. Work out the index position of 'Haymarket' ```lines.index('Haymarket')```
5. Add 'Airport' to the start of the array ```lines.unshift('Airport')```
6. Add 'York Place' to the end of the array ```lines.push('York Place') || lines << 'York Place'```
7. Remove 'Edinburgh Park' from the array using it's name ``` lines.delete("Edinburgh Park") ```  
8. Delete 'Edinburgh Park' from the array by index ``` lines.delete_at(1) ```
9. Reverse the positions of the stops in the array ```lines.reverse```
10. Print out all of the stops using a for loop and a while loop

```
i = 0
while i < line.size
	puts line[i]
	i += 1
end

```

```
for tram in line
	puts tram
end

```


### B. Given the following data structure:

```
  my_hash = {0 => "Zero", 1 => "One", :two => "Two", "two" => 2}
```

1. How would you return the string `"One"`? ``` my_hash[1] ```
2. How would you return the string `"Two"`? ``` my_hash[:two] ```
3. How would you return the number `2`?  ``` my_hash["two"] ```
4. How would you add `{3 => "Three"}` to the hash? ``` my_hash[3] = "Three" ```
5. How would you add `{:four => 4}` to the hash? ``` my_hash[:four] = 4 ```


### C. Given the following data structure:

```
  users = {
    "Jonathan" => {
      :twitter => "jonnyt",
      :favourite_numbers => [12, 42, 75, 12, 5],
      :home_town => "Stirling",
      :pets => {
        "fluffy" => :cat,
        "fido" => :dog,
        "spike" => :dog
      }
    },
    "Erik" => {
      :twitter => "eriksf",
      :favourite_numbers => [8, 12, 24],
      :home_town => "Linithgow",
      :pets => {
        "nemo" => :fish,
        "kevin" => :fish,
        "spike" => :dog,
        "rupert" => :parrot
      }
    },
    "Avril" => {
      :twitter => "bridgpally",
      :favourite_numbers => [12, 14, 85, 88],
      :home_town => "Dunbar",
      :pets => {
        "colin" => :snake
      }
    },
  }
```

1. Return Jonathan's Twitter handle (i.e. the string `"jonnyt"`) ``` users["Jonathan"][:twitter] ```
2. Return Erik's hometown ``` users["Erik"][:home_town] ```
3. Return the array of Erik's favorite numbers ``` users["Erik"][:favourite_numbers] ```
4. Return the type of Avril's pet Colin ``` users["Anil"][:pets][:colin] ```
5. Return the smallest of Erik's favorite numbers ``` users["Erik"][:favourite_numbers].min ```
6. Return an array of Avril's favorite numbers that are even 

``` 
result = []
for number in users["Avril"][:favourite_numbers]
	result << number if number.even?
end
puts result

or

def evil_even_numbers(array_of_numbers)
  result = []
  for number in array_of_numbers
    result.push(number) if(number.even?)
  end

  return result
end

array = users["Avril"][:favourite_numbers]
evens = evil_even_numbers(array)

print evens
puts
```

7. Return an array of Jonathans favourite numbers, sorted in ascending order and excluding duplicates

```
users["Jonathan"][:favourite_numbers].sort.uniq
```

8. Add the number `7` to Erik's favorite numbers ``` users["Erik"][:favorite_numbers] << 7 ```

9. Change Erik's hometown to Edinburgh ```  users["Erik"][:home_town] = "Edinburgh" ```

10. Add a pet dog to Erik called "Fluffy" ```  users["Erik"][:pets]["fluffy"] = :dog ```

11. Add yourself to the users hash

``` 
me =  {
     :twitter => "tgoncalves",
     :favorite_numbers => [14, 28],
     :home_town => "Morningside",
     :pets => {
       "tommy" => :cat
     }
   }

users["Tony"] = me 

```




