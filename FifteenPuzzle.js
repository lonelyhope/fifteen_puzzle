	pic = new Array();
	var play = false;
	var difficuty = true;
	var get_difficuty = true;
	for (var i = 0; i < 16; i++) {
		pic[i] = new F_pic();
		pic[i].setX(Math.floor(i / 4));
		pic[i].setY(i % 4);
		pic[i].setK(i);
	}
	for (var j = 0; j < 16; j++) {
		(function() {
			var currentK = j;
			document.getElementById("p"+currentK).onclick = function() {
				if (pic[currentK].can_move() != -1 && play) {document.getElementById("s").value++;}
				pic[currentK].move(pic[currentK].can_move());
				if (win() && play) {
					document.getElementById("winBlock").textContent = "you win with "
					+ document.getElementById("s").value + " steps";
					if (!get_difficuty) {document.getElementById("winBlock").textContent += " in easy";}
						else {document.getElementById("winBlock").textContent += " in ordinary"}
					play = false;
				}
			}
		})();
	}

document.getElementById("bd1").onclick = function() {
	difficuty = false;
	document.getElementById("bd1").textContent = "easy!";
	document.getElementById("bd2").textContent = "ordinary";
}

document.getElementById("bd2").onclick = function() {
	difficuty = true;
	document.getElementById("bd1").textContent = "easy";
	document.getElementById("bd2").textContent = "ordinary!";
}

function reset2() {
	for (var i = 0; i < 16; i++) {
		pic[i].setX(Math.floor(i / 4));
        pic[i].setY(i % 4);
        pic[i].setK(i);
        document.getElementById("p" + i).className = "cp" + i;
	}
}

function reset(di) {
	document.getElementById("winBlock").textContent = "";
	play = true;
	document.getElementById("replay").textContent = "replay";
	document.getElementById("s").value = "0";
	var n = Math.floor(Math.random()*di);
	while (n--) {
		for (var i = 0; i < 16; i++) {
			pic[i].move(pic[i].can_move());
		}
    }
    var text, k;
    text = document.getElementById("p"+15);
    k = parseInt(text.className.substring(2, text.length));
    while (k < 15) {
    	var l = k + 1;
    	if (l % 4 == 0) l += 3;
    	l = findPicFromBlock(Math.floor(l / 4), l % 4);
    	pic[l].move(pic[l].can_move());
    	k = parseInt(text.className.substring(2, text.length));
    }
}

document.getElementById("Button").onclick = function() {
	if (!difficuty) {
		get_difficuty = false;
		reset2(); 
		reset(10);
		if (win()) {
			pic[11].move(pic[11].can_move());
			pic[10].move(pic[10].can_move());
			pic[14].move(pic[14].can_move());
			pic[11].move(pic[11].can_move());
		}
	}
	else {get_difficuty = true;reset(1000);}
}

function win() {
	for (var i = 0; i < 16; i++) {
		if (pic[i].getK() != pic[i].getX() * 4 + pic[i].getY()) return false;
	}
	return true;
}

function F_pic() {
	var that = this;
	var temp = 0;
	this.x = this.y = this.k = temp;

	this.setX = function(a) {this.x = a;}
	this.getX = function() {return this.x;}
	this.setY = function(a) {this.y = a;}
	this.getY = function() {return this.y;}
	this.setK = function(a) {this.k = a;}
	this.getK = function() {return this.k;}
	this.isEmptyBlock = function() {return this.k == 15;}

	this.can_move = function() {
		//0 top, 1 right, 2 bottom, 3 left, -1 can't move
		if (that.k == 15) return -1;
		if (that.x != 0 && pic[findPicFromBlock(that.x - 1, that.y)].isEmptyBlock())
			return 0;
		if (that.y != 3 && pic[findPicFromBlock(that.x, that.y + 1)].isEmptyBlock())
			return 1;
		if (that.x != 3 && pic[findPicFromBlock(that.x + 1, that.y)].isEmptyBlock())
			return 2;
		if (that.y != 0 && pic[findPicFromBlock(that.x, that.y - 1)].isEmptyBlock())
			return 3;
		return -1;

	}
	this.move = function(direction) {
		if (direction == -1) return;
		pic[15].setX(that.x);
		pic[15].setY(that.y);
		var text1, text2;
		text1 = document.getElementById("p"+15).className;
		text2 = document.getElementById("p"+that.k).className;
		document.getElementById("p"+15).className = "cp" + text2.substring(2, text2.length);
		document.getElementById("p"+that.k).className = "cp" + text1.substring(2, text1.length);
		if (direction == 0) {
			that.x--;//up
		}
		if (direction == 1) {
			that.y++;//right
		}
		if (direction == 2) {
			that.x++;//down
		}
		if (direction == 3) {
			that.y--;//left
		}
	}
}

function findPicFromBlock(x_, y_) {
	for (var i = 0; i < 16; i++) {
		if (pic[i].getX() == x_ && pic[i].getY() == y_) {
			return i;
		}
	}
}