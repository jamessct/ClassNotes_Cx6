#React Country

##Learning Objectives
- Rewrite existing application using React
- Make HTTP requests in React - considering async issues
- More practice of passing around data

##Intro
You all wrote awesome applications using the countries REST API.  Today we are going to re-write this application using React.

[i]: show example of what we are going to make. 

##Design
Let's think about which components we might need to make this, and what state and props each would need to have.

[i]: Discuss design and get to a structure that looks something this.
[i]: This whole class we want it to be (or at least feel) like it is them who are creating it.

- CountryBox: state: countries, currentCountry
- CountrySelect: state: selectedIndex,  props - countries, handleChange
- CountryDetail: props - country

##Implementation

[i]: Hand out countries_template start point and get students to look at code for 5mins to see what components etc have been set up, see what's loading at localhost at this point. Will need to npm install and webpack. 

Let's look at our countries box that will be our main parent component. This should control the state of our application.  Let's set up the initial state of the box so that it has an empty list of countries and a focus country which will start as null.

```
//CountriesBox.jsx
getInitialState:function(){
  return { countries:[], focusCountry:null }
},

```

We have loaded this in our app.js and asked React to render it. 

Go to React Dev tools in the console to show the state of the components.

#Getting Countries from API

We're going to use another of the lifecycle methods to do our AJAX call to the API, componentDidMount. This method will be triggered when the component has successfully been rendered into the DOM. The React documentation reccommends that this is the right place to do AJAX requests. 

[Task]: Make a request to the Rest Countries API and pass them to the component's state when loaded. 

```
componentDidMount: function() {
  var url = "https://restcountries.eu/rest/v1/all";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
    if(request.status === 200){
      var data = JSON.parse(request.responseText);
      this.setState({countries: data});
    }
  }.bind(this)
  request.send(null);
}
```

Again we can check dev tools and see that the state has changed!

##Creating a select
Now we can start adding to our other components. Let's have a look at our countries select dropdown - currently there is no information in it. 

Inspect with our react tools and we can see that we don't have any properties on our selector.  What properties would we like this to have? The list of countries we just stored in our state. Let's set that as a prop on it. 

```
render:function(){
  return(
    <div>
      <h2>Country Box</h2>
      <CountrySelect countries={this.state.countries}></CountrySelect>
    </div>
    )
  }
  ```

  Selector has all it needs, let's now set it up so that it can select a country.

  [Task]: How might we add the options into the select?

  ```
  var CountrySelect = React.createClass({
    render: function(){
      var options = this.props.countries.map(function (country, index) {
        return <option value={index} key={index}>{country.name}</option>;
      });
      return (
       <select>
        {options}
      </select>
    }
  })
  ```

  We want the select to keep tabs on its own state. And change when it is clicked. Let's first set the initial state. 

  ```
  getInitialState: function() {
    return { selectedIndex: undefined };
  },
  ```

  ```
  //CountrySelect.jsx render
  return(
    <select value={this.state.selectedIndex}>
     {options}
   </select>
   )
   ```

   Let's listen to when the select has changed

   ```
   return(
    <select value={this.state.selectedIndex} onChange={this.handleChange}>
     {options}
   </select>
   )
   ```

   And now let's handle it and update the state of this component

 ```  
   handleChange: function(event){
    var newIndex = event.target.value;
    this.setState({selectedIndex: newIndex})
    //todo update the current country on the country box
  },
  ```

  Now that we have updated the state of the the selector component we now want to update the state of the currentCountry on the CountryBox.  How can we do this? (Discuss)

  Callbacks!

  ##Updating the selected country
  Let's create a method on the comment box that will set the country that we want to focus on. 

  We can call this anything we want.  And then let's pass this method to the countries selector.


```
  //CountryBox.jsx
  
  setFocusCountry:function(country){
    this.setState({focusCountry: country})
  },
  render:function(){
    return(
      <div>
        <h2>Country Box</h2>
        <CountrySelect countries={this.state.countries} selectCountry={this.setFocusCountry}></CountrySelect>
      </div>
      )
    }
```

    Now we can tell the country selector to call this method when it has selected a country.

    ```
    //CountrySelect.jsx
    handleChange: function(event){
      var newIndex = event.target.value;
      this.setState( { selectedIndex: newIndex } );
      this.props.selectCountry( this.props.countries[newIndex] );   
    },
    ```

    We can now use the React tools to check that it is updating.  Great.

    Let's go over what happened here.

    ##Country Detailed Display
    Now that we have a selector that is updating the selected country, the final piece in the puzzle is our detailed display.

    We now want to give the CountryDetail some properties, as currently it has nothing. What do we want to pass? Yes the country.

    ```
    <CountryDetail country={ this.state.focusCountry }></CountryDetail>
    ```

    We can use this in our countryDetail component. We put in a guard so that before the request returns the countries data it will just return and say nothing is selected.

    ```
    var CountryDetail = React.createClass({
      render:function(){
        if(!this.props.country){return <h4> No Country Selected </h4>}
        return(
          <h4> {this.props.country.name} </h4>
          )
        }
      })

      ```

      Notice that it is not updating when the countries first load.  

      Let's fix this - when we make the request we'll set the first country to be automatically displaying. 
      [i]: Task - 10mins.

      ```
      componentDidMount:function(){
        var url = "https://restcountries.eu/rest/v1/all";
        var request = new XMLHttpRequest();
        request.open("GET", url);
        request.onload = function(){
          if(request.status === 200){
            var data = JSON.parse(request.responseText);
            this.setState({countries: data, focusCountry:data[0]});//added line
          }
        }.bind(this)
        request.send(null);
      },
      ```

      Task: 
      - Add more information about each country in the CountryDisplay


