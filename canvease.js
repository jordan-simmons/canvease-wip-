//Canvease.js 

//ANIMATION TRIGGER
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || 
    window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
     window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var ctx, width, height;
function getCanvas(ID){
	canvas = document.getElementById(ID);
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
}

var frameCount = 0;
var STROKE_ = true;
var FILL_ = false;
var FILL = 'fill';
var STROKE = 'stroke';
var BOTH = 'both';
var font = 'Arial';
var drawMethod = FILL;

function noStroke(){STROKE_ = false;}
function noFill(){FILL_ = false;}

function setDrawMethod(type){
	if(type === BOTH || type === STROKE || type === FILL){
		drawMethod = type;
	}else{
		drawMethod = FILL;
	}
}

function print(ID, str){
	var temp = document.getElementById(ID).innerHTML = str;
}

function fill(a, b, c, alpha){
	ctx.fillStyle ='rgba(' + a + ', ' + b + ', ' + c + ', ' + alpha + ')';
}

function stroke(a, b, c, alpha){
	ctx.strokeStyle ='rgba(' + a + ', ' + b + ', ' + c + ', ' + alpha + ')';
}

function strokeWeight(a){
	ctx.lineWidth = a;
}

function cFont(str){
	font = str;
}

function text(str, size, x, y){
	ctx.font = size + "px " + font;

	if(drawMethod === FILL){
		ctx.fillText(str, x, y);
	}else if (drawMethod === STROKE) {
		ctx.strokeText(str, x, y);
	} else if (drawMethod === BOTH) {
		ctx.fillText(str, x, y);
		ctx.strokeText(str, x, y);
	} else {
		ctx.strokeText(str, x, y);
	}
}

function background(a, b, c, alpha){
	var B = b || a;
	var C = c || a;
	var ALPHA = alpha || 1;
	ctx.fillStyle = 'rgba(' + a + ', ' + B + ', ' + C + ', ' + ALPHA + ')';
	ctx.fillRect(0, 0, width, height);
}

function point(a, b){
	ctx.beginPath(); 
	ctx.moveTo(a,b); 
	ctx.lineTo(a+1,b+1); 
	ctx.stroke();
}

function line(a,b,c,d){
	ctx.moveTo(a, b);
	ctx.lineTo(c, d);
	ctx.stroke();
}

function arc(x, y, s, s1, m){
	ctx.beginPath();
	ctx.arc(x, y, s, s1, m);
	ctx.stroke();
}

function ellipse(a, b, c){
	ctx.beginPath();
	ctx.arc(a, b, c,0,2*Math.PI);

	if(drawMethod === STROKE){
		ctx.stroke();
	}else if(drawMethod === FILL){
		ctx.fill();
	}else if(drawMethod === BOTH){
		ctx.stroke();
		ctx.fill();
	}else{
		ctx.stroke();
	}
	
}

function rect(x, y, w, h){
	if(drawMethod === STROKE){
		ctx.strokeRect(x,y,w,h);
	}else if(drawMethod === FILL){
		ctx.fillRect(x,y,w,h);
	}else if(drawMethod === BOTH){
		ctx.strokeRect(x,y,w,h);
		ctx.fillRect(x,y,w,h);
	}else{
		ctx.strokeRect(x,y,w,h);
	}
	
}

function randomBool(a){
	if(random() < a){
		return true;
	}else {
		return false;
	}
}

function drawImg(ID, x, y){
	var img = document.getElementById(ID);
	ctx.drawImage(img,x, y);
}







/*BEGIN MATH*/

var  PI = Math.PI, e = Math.E, 
ln2 = Math.LN2, ln10 = Math.LN10,
log2e = Math.LOG2E, log10e = Math.LOG10E,
sqrt1_2 = Math.SQRT1_2, sqrt2 = Math.SQRT2;

function abs(x){return Math.abs(x);}
function cos(x){return Math.cos(x);}
function acos(x){return Math.acos(x);}
function sin(x){return Math.sin(x);}
function asin(x){return Math.asin(x);}
function tan(x){return Math.tan(x);}
function atan(x){return Math.atan(x);}
function atan2(x, y){return Math.atan2(x, y);}
function ceil(x){return Math.ceil(x);}
function floor(x){return Math.floor(x);}
function exp(x){return Math.exp(x);}
function sqrt(x){return Math.sqrt(x);}
function pow(x, a){return Math.pow(x, a);}
function random(){return Math.random();}

function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randomFloat(min,max){
    return Math.random()*(max-min+1)+min;
}

function trueRdm(){
	return randomFloat(-2, 1);
}

function randomChar(len){
	var rdmString = "";
    for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
    return  rdmString.substr(0, len);
}

function lerp(t, a, b) {
        return a + t * (b - a);
};

/*END MATH*/
/*BEGIN VECTOR EXPERIMENTAL*/



function Vector(x, y){
	this.x = x || 0;
	this.y = y || 0;
	this.r;
	this.t;
	this.tail = {
		x: this.x,
		y: this.y
	};
}

Vector.prototype.add = function(a, b) {
	this.tail.x = this.x;
	this.tail.y = this.y;

	if(typeof a === 'object'){
		this.x += a.x;
		this.y += a.y;
	}else{
		this.x += a;
		this.y += b;
	}

	

};

Vector.prototype.sub = function(a, b) {
	this.tail.x = this.x;
	this.tail.y = this.y;
	this.x -= a;
	this.y -= b;
};

Vector.prototype.magn = function() {
	return sqrt(pow(this.x-this.tail.x, 2) + pow(this.y-this.tail.y, 2));
};

Vector.prototype.mult = function(a) {
	this.r = this.magn() * a;
	this.t = atan(this.x / this.y);
	this.x += this.r * cos(this.t);
	this.y += this.r * sin(this.t);
};

Vector.prototype.edgeCheck = function(minX, maxX, minY, maxY) {
	this.minX = minX || 0;
	this.maxX = maxX || width;
	this.minY = minY || 0;
	this.maxY= maxY || height;
	
	if(this.x < this.minX){
		this.x = this.maxX;
	}
	if(this.x > this.maxX){
		this.x = this.minX;
	}
	if(this.y < this.minY){
		this.y = this.maxY;
	}
	if(this.y > this.maxY){
		this.y = this.minY;
	}
};

Vector.prototype.random2D = function() {
	this.tail.x = this.x;
	this.tail.y = this.y;
	this.x += cos(trueRdm()*2);
	this.y += sin(trueRdm()*2);
};


/*END VECTOR EXPERIMENTAL					*/



/*BEGIN PHYSICS								*/

function PVector(x, y){
	this.x = x;
	this.y = y;
	this.grav = 0.3;
}

PVector.prototype.setGrav = function(g) {
	this.grav = g;
};

/*END PHYSICS								*/




/*BEGIN DEVELOPMENTAL NOISE*/

/*BEGIN DEVELOPMENTAL NOISE*/

//LOOP CODE
window.addEventListener("load",function(){
    run();
});