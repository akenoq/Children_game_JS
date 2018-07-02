window.onload = function () 
{
let pauseBtn = document.getElementById("pauseBtn");
let scoreLabel = document.getElementById("scoreLabel");
let canvas = document.getElementById("pov"), ris = canvas.getContext('2d');
			canvas.height = 480;
			canvas.width  = 640;
			ris.strokeRect(1, 1, 639, 479);
			
canvas.onclick = Point;

function drawFon() {
    ris.clearRect(0, 0, 800, 600);
    ris.fillStyle = '#2F4F4F';
    ris.fillRect(0, 0, 800, 600);
}

let obj = [];

class touch 
{
	constructor(x=0,y=0)
	{
		this.x=x;
		this.y=y;
		this.size=1;
	}
	
	grow ()
	{	
		this.size+=1;
		if (this.size>25) 
			return true;
			else return false;
	}
	
	draw ()
	{
		ris.beginPath();
		ris.arc(this.x,this.y, this.size, 0, 2* Math.PI, true);
		ris.closePath();
		ris.stroke();
	}
}

class ball
{
	constructor(x=200, y=200)
	{
		this.x=x;
		this.y=y;
		this.size=25;
		this.vecX=0;
		this.vecY=0;
	}
	
	draw ()
	{
		ris.beginPath();
		ris.arc(this.x,this.y, this.size, 0, 2* Math.PI, true);
		ris.closePath();
		ris.fillStyle = '#FFFFFF';
		ris.fill();
	}
	
	move ()
	{
		this.x+=this.vecX*2;
		this.y+=this.vecY*2;
	}
	
	punch ()
	{
		let t = obj.length;
/*				
				ris.fillStyle = '#000000';
				ris.font = "50px Arial";
				ris.fillText(this.vecX,50,100);
				ris.fillText(this.vecY,50,200);
*/
		for (let i=0; i<t; i++){
			let dx=this.x-obj[i].x, dy=this.y-obj[i].y, dc=Math.sqrt(dx*dx+dy*dy);
			if (dc<=(obj[i].size+this.size)) {
				let p = 2*(((this.vecX*dx)/dc)+((this.vecY*dy)/dc));
				let nX=this.vecX - p*(dx/dc), nY=this.vecY - p*(dy/dc);
				this.vecX=nX+(dx/dc)*obj[i].size/25;
				this.vecY=nY+(dy/dc)*obj[i].size/25;
				obj.splice(i,1);
				i--;
				t--;				
			} 
		}
	}
}

let bal= new ball();

let score = 0;
scoreLabel.innerHTML = "Очки: " + score;

function Point(e)
{
	let xx = e.pageX - canvas.offsetLeft;
	let yy = e.pageY - canvas.offsetTop;
	let t = obj.length;
	obj[t] = new touch(xx,yy);
	score++;
    scoreLabel.innerHTML = "Очки: " + score;
}

let pause = false;

pauseBtn.onclick = function() {
    pause = !pause;
    if(pause === true) {
        canvas.style.opacity = 0.5;
    }
    if(pause === false) {
        canvas.style.opacity = 1.0;
    }
}
	
function Redraw()
{
  if (pause === false){
	drawFon();
	let t = obj.length;
	for (let i=0; i<t; i++){
		if (obj[i].grow()) {
			obj.shift();
			i--;
			t--;
		} else 
			obj[i].draw();
	}
	bal.draw();
	bal.punch();
	bal.move();
	if ((bal.x<0)||(bal.y<0)||(bal.x>640)||(bal.y>480)){			
		clearInterval(timer);
        alert("Результат игры: " + score);

	}
  }
}

let timer = setInterval(Redraw, 50);
}




	
	