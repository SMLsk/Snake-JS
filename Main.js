/* 初始化背景 */
var table = document.getElementById("table1");
(function(){
	for(var i = 1;i <= 24;i++){
		var tr = document.createElement("tr");
		table.appendChild(tr);
		for(var j = 1;j <= 24;j++){
			var td = document.createElement("td");
			td.id = i + '-' + j;
			td.width = 5;
			td.height = 5;
			// td.innerHTML = td.id;
			if(i == 1 || j == 1 || i == 24 || j == 24){
				td.style.backgroundColor = 'yellow';
			}
			tr.appendChild(td);
		}
	}
})();
/* 获取键盘事件，控制蛇的方向 */
var body = document.body;
body.onkeydown = function(e){
	e = e || event;
	if(mySnake.alive && !pause){
		switch(event.keyCode){
			case 37:
				//alert("hero.moveLeft()");
				mySnake.swerve(-1);
				break;
			case 38:
				mySnake.swerve(2);
				break;
			case 39:
				mySnake.swerve(1);
				break;
			case 40:
				mySnake.swerve(-2);
				break;
			default:
				// alert("错误");
				// break;
		}
	}
}

/* 控制游戏开始和暂停 */
var button1 = document.getElementById("button1");
var pause = true;
button1.onclick = function(){
	if(mySnake.alive){
		pause = pause ? false:true;
		if(pause){
			this.innerHTML = '开始';
		}else{
			this.innerHTML = '暂停';
		}
	}else{
		location.reload();
	}
}

/* 初始化 */
var head = null;
var score = 0;
var foods = new Array();
var bodyPosition = new Array();
var mySnake = createSnake();
var counter = 0;
var h1 = document.getElementById("h1");
getBodyPosition(mySnake,bodyPosition);




drawSnake(mySnake);
getBodyPosition(mySnake,bodyPosition);
function animate(){
	if(mySnake.alive && !pause){
		clear(bodyPosition);
		//更新状态
		mySnake.snakeMove();
		if(!checkDie(bodyPosition)){
			return false;
		}
		for(var i = 0;i < foods.length;i++){
			if(foods[i].position == head.position){
				mySnake.eat();
				score += foods[i].score;
				foods.splice(i,1);
				h1.innerHTML = "分数为：" + score;
			}
		}
		//绘制蛇
		drawSnake(mySnake);
		// console.log(JSON.stringify(foods));
		// console.log(JSON.stringify(head));
		// console.log(JSON.stringify(mySnake))
	}
	//console.log(JSON.stringify(mySnake));
}
window.setInterval("animate()",200);
window.setInterval("drawFoods(foods)",500);
window.setInterval("createFood()",1500);


























