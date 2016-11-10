##Awesome Print for Rails/IRB

To make rails console output easier to read we can use a gem called Awesome Print. 

https://github.com/awesome-print/awesome_print

To use it, go to your Gemfile in your rails app and include: 

```
require 'awesome_print'
```

You can then pretty print anything in your Rails console using 'ap' before the command, e.g. 'ap Person.all'.

To avoid having to use 'ap' every time you can set up awesome print as a default. Go to ~ and make a file called .irbrc. In here write:

```
require "awesome_print"
AwesomePrint.irb!
```

This will set it as a default for irb (why not) and also as long as you've included awesome_print in your Gemfile it will automatically use it in rails console too without the ap prefix. 



