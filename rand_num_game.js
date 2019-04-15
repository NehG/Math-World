function rand_num_game(){
  this.username = document.querySelector(".username").value;
  if(this.username.toLowerCase() == "unknown") this.username += this.GUID();
  document.querySelector(".user").textContent = String(this.username).toUpperCase();
  this.attempts = 1;
  this.score = 0;
  this.equationArr = [];
  this.responseArr = [];
  this.equAnsArr = [];
  this.equation = "";
  this.gameboardEle = document.querySelector(".gameboard");
  this.scoreEle = document.querySelector(".scoreEle");
  this.msgEle = document.querySelector(".msgEle");
  this.equationEle = document.querySelector(".equationEle");
  this.ansEle = document.querySelector(".ansEle");
  this.attemptsEle = document.querySelector(".attempts");
  this.evalBtn = document.querySelector(".evalBtn");
  this.skipBtn = document.querySelector(".skipBtn");
  this.quitBtn = document.querySelector(".quitBtn");
  this.resetBtn = document.querySelector(".resetBtn");

  localStorage.setItem('Username',this.username);

  if(this.equation_gen) this.equation_gen();
  if(this.eval) this.evalBtn.onclick = this.eval.bind(this);
  if(this.isSkiped) this.skipBtn.onclick = this.isSkiped.bind(this);
  if(this.isReset) this.resetBtn.onclick = this.isReset.bind(this);
  if(this.isQuit) this.quitBtn.onclick = this.isQuit.bind(this);

};

document.querySelector(".game_init_btn").onclick = function(){
  new rand_num_game();
};

rand_num_game.prototype.isSkiped = function(){
  this.msgEle.textContent = "Wishing You Good Luck :) !";
  this.equation_gen();
};

rand_num_game.prototype.isReset = function(){
  this.msgEle.textContent = "Wishing You Good Luck :) !";
  localStorage.clear();
  this.score = 0;
  this.attempts = 1;
  this.username = (prompt("Please Enter New Username:"));
  if(this.username == "") this.username = "Unknown" + this.GUID();
  if(this.username.toLowerCase() == "unknown") this.username += this.GUID();
  this.scoreEle.textContent = this.score;
  this.attemptsEle.textContent = this.attempts;
  this.ansEle.value = "";
  this.equation_gen();
  localStorage.setItem('Username', this.username);
  document.querySelector(".user").textContent = String(this.username).toUpperCase();
};

rand_num_game.prototype.isQuit = function (){
  open(location, '_self').close();
}

rand_num_game.prototype.addition = function (x, y){
  return x + y;
};

rand_num_game.prototype.subtraction = function (x, y){
  return x - y;
};

rand_num_game.prototype.multiplication = function (x, y){
  return x * y;
};

rand_num_game.prototype.division = function (x, y){
  if(y == 0) this.equation_gen();
  return Math.round((x / y)*100)/100;
};

rand_num_game.prototype.rand_gen = function (max = 0){
  if(this.score >= 5){
    return Number(Math.floor(Math.random() * Math.floor( max || this.score * 100 )));
  }
  else{
    return Number(Math.floor(Math.random() * Math.floor( max || 100 )));
  }
};

rand_num_game.prototype.equation_gen = function (){
  this.operand1 = this.rand_gen();
  this.operand2 = this.rand_gen();
  this.operator = this.rand_gen(5);

  switch (this.operator) {
    case 0:
      this.ans = this.addition(this.operand1, this.operand2);
      this.equationEle.textContent = this.operand1 + " + " + this.operand2;
      break;
    case 1:
      this.ans = this.subtraction(this.operand1, this.operand2);
      this.equationEle.textContent = this.operand1 + " - " + this.operand2;
      break;
    case 2:
      this.ans = this.multiplication(this.operand1, this.operand2);
      this.equationEle.textContent = this.operand1 + " * " + this.operand2;
      break;
    case 3:
      this.ans = this.division(this.operand1, this.operand2);
      this.equationEle.textContent = this.operand1 + " / " + this.operand2;
      break;

    default: this.equation_gen();

  }

  this.equation = this.equationEle.textContent;
};

rand_num_game.prototype.win = function (msg = ""){
  this.msgEle.textContent = ( msg || `You think we can't generate tough questions? - Reach to score 5 and battle begains!` );
  this.score += 1;
  this.scoreEle.textContent = this.score;
  this.localStorage();
  this.attempts += 1;
  this.attemptsEle.textContent = this.attempts;
  explode(200, 200);
  explode(1200, 200);
  this.equation_gen();
};

rand_num_game.prototype.loss = function (msg = ""){
  this.msgEle.textContent = ( msg || `You could not beat us, right ans was ${this.ans}! Good Luck!` );
  this.score -= 1;
  this.scoreEle.textContent = this.score;
  this.localStorage();
  this.attempts += 1;
  this.attemptsEle.textContent = this.attempts;
  this.equation_gen();
};

rand_num_game.prototype.eval = function (){
  uans = Number(this.ansEle.value);
  this.responseArr.push(this.ansEle.value);
  this.ansEle.value = "";
  if(this.ans == uans){
    return this.win();
  }
  else{
    return this.loss();
  }
};

rand_num_game.prototype.localStorage = function (){
  this.equationArr.push(this.equation);
  this.equAnsArr.push(this.ans);

  const obj = {
    "username" : this.username,
    "score" : this.score,
    "attempts" : this.attempts,
    "equations" : this.equationArr,
    "user-response" : this.responseArr,
    "answers" : this.equAnsArr
  };
  localStorage.setItem('userprofile', JSON.stringify(obj));
};

rand_num_game.prototype.GUID = function () {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};
