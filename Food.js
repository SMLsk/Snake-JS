var flicker = false;
var foodPositions = new Array();
var cycle = 5;
var nameList = ['smallFood','middleFood','bigFood'];
var food = function(){
}

/* 创建食物 */
function createFood(){
	if(mySnake.alive && !pause){
		var x ,y,position;
		while(position == undefined || bodyPosition.includes(position) || x <= 2 || y <= 2 || x >= 23 || y >= 23){
			x = Math.ceil(Math.random() * 24);
			y = Math.ceil(Math.random() * 24);
			position = y + '-' + x;
		}
		var newFood = new food();
		newFood.name = nameList[Math.floor(Math.random() * 3)];
		switch(newFood.name){
			case 'smallFood':
				newFood.color = 'black';
				newFood.score = 1;
				break;
			case 'middleFood':
				newFood.color = 'black';
				newFood.score = 2;
				break;
			case 'bigFood':
				newFood.color = 'black';
				newFood.score = 3;
				break;
		}
		newFood.position = position;
		if(foods.length > 3){
			var tmp = foods.shift();
			drawNode(tmp.position,"white");
			foodPositions.shift();
		}
		foods.push(newFood);
		foodPositions.push(position);
	}
}

var drawFoods = function(foods){
	if(mySnake.alive && !pause){
		flicker = flicker ? false : true;
		//alert(console.log(JSON.stringify(foods)));
		if(flicker){
			for(var i = 0;i < foods.length;i++){
				drawNode(foods[i].position,foods[i].color);
			}
		}else{
			for(var i = 0;i < foods.length;i++){
				drawNode(foods[i].position,"Blue");
			}
		}
	}
}





