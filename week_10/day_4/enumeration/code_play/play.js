var Bank = function(){
  this.accounts = [100,200,300,400];
  this.sum = 0
}

Bank.prototype = {
  setSum: function(){
    this.sum = 0;
    this.accounts.forEach(function(account){
      console.log(this);
      this.sum += account
    }.bind(this));
  }
}


var b = new Bank();
// console.log('b sum', b.sum)

b.setSum();

// console.log('sum after', b.sum)
