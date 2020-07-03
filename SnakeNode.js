var SnakeNode = function(name,x,y){
	this.name = name;
	this.x = x;
	this.y = y;
	this.position = this.y + '-' + this.x;
	this.velocity = 1;
	this.next = null;
}
SnakeNode.prototype = {
	swerve:function(direction){
		//若有方向输入，则判断不为后退且是在操作表头
		if(this.direction !== undefined && direction !== undefined){
			if(direction == -this.direction && this.bodyNum > 1){
				//alert("Can't back");
				return false;
			}else{
				this.direction = direction;
			}
		}
	},
	snakeMove:function(){
		//对蛇身体的每一个节点进行移动
		var tmp = this;
		for(var i = 0;i < this.bodyNum;i++){
			//console.log(JSON.stringify(tmp));
			tmp.move(tmp.next.x,tmp.next.y);
			tmp = tmp.next;
		}
		head = tmp;
		switch(this.direction){
			case -1:
				tmp.move(tmp.x-1,tmp.y);
				break;
			case 1:
				tmp.move(tmp.x+1,tmp.y);
				break;
			case -2:
				tmp.move(tmp.x,tmp.y+1);
				break;
			case 2:
				tmp.move(tmp.x,tmp.y-1);
				break;
		}
		getBodyPosition(this,bodyPosition);
	},
	move:function(x,y){
		this.x = x;
		this.y = y;
		this.position = this.y + '-' + this.x;
	},
	eat:function(){
		switch(this.direction){
			case -1:
				x = head.x - 1;
				y = head.y;
				break;
			case 1:
				x = head.x + 1;
				y = head.y;
				break;
			case -2:
				x = head.x;
				y = head.y + 1;
				break;
			case 2:
				x = head.x;
				y = head.y - 1;
				break;
		}
		var newNode = new SnakeNode('body',x,y);
		var node = this.next;
		while(node.next !== null){
			node = node.next;
		}
		node.next = newNode;
		head = node.next;
		this.bodyNum++;
	}
}
//创建一条蛇
var createSnake = function(name){
	var tail = new SnakeNode('tail',11,11);
	tail.next = new SnakeNode('body',11,12);
	head = tail.next;
	tail.direction = -2;
	tail.bodyNum = 1;
	tail.alive = true;
	
	return tail;
}
//画节点
var drawNode = function(position,color){
	var Node = document.getElementById(position);
	Node.style.backgroundColor = color;
}

//画出蛇身
var drawSnake = function(mySnake){
	var tmp = mySnake.next;
	for(var i = 1;i <= mySnake.bodyNum;i++){
		var position = tmp.y + '-' + tmp.x;
		if(i < mySnake.bodyNum){
			drawNode(position,'green');
			tmp = tmp.next;
		}else{
			drawNode(position,'red');
		}
	}
	
}

//清除画布
var clear = function(bodyPosition){
	for(var i = 0;i < bodyPosition.length;i++){
		var position = bodyPosition[i];
		//alert(JSON.stringify(document.getElementById(position)));
		 document.getElementById(position).style.backgroundColor = 'white';
	}
}

//获取当前蛇身位置，并将修改保存在第二个参数的数组中
function getBodyPosition(snake,bodyPosition){
	var tmp = snake.next;
	for(var i = 1;i <= snake.bodyNum;i++){
		var position = tmp.y + '-' + tmp.x;
		bodyPosition[i-1] = position;
		tmp = tmp.next;
	}
}

function checkDie(bodyPosition){
	//alert(JSON.stringify());
	if(head.x ==1 || head.x == 24 || head.y == 1  || head.y == 24 || bodyPosition.slice(0,(bodyPosition.length)-2).includes(head.position)){
		mySnake.alive = false;
		alert('游戏结束，累计得'+ score +'分');
		button1.innerHTML = '重新开始';
		return false;
	}
	return true;
}

