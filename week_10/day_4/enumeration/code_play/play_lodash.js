var _ = require('lodash');

var Bank = function(){
  this.accounts = [100,200,300,400];
  this.sum = 0
}

Bank.prototype = {
  setSum: function(){
    this.sum = 0;
    _.each(this.accounts, function(account){
      console.log('this', this)
      this.sum += account
    }.bind(this));
  },

  callFunction: function(toBeCalled){
    toBeCalled(this);
  }
}


var b = new Bank();
console.log('b sum', b.sum)

b.setSum();

console.log('sum after', b.sum)

b.callFunction(function(input){
  console.log('it gave me this', input);
});
