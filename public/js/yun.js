window.onload = function() {
	//花的5个花瓣
	var flower = document.querySelector('.flower');
	var flo = document.querySelector('.flo');
		for(var j=0;j<4;j++){
			var clone = flower.cloneNode(true);
			flo.appendChild(clone);
			clone.style.transformOrigin = '46px 60px';
			clone.style.transform = 'rotate('+(j+1)*72+'deg)'
		}
	//背景
	var cirInner = document.querySelector('.cir-inner');
	var bgimgin = cirInner.cloneNode(true);
	var bgimg = document.querySelector('.bgimg');
	//bgimg.style.transform = 'scale(2) translate(280px,90px)';
	bgimgin.style.transform = 'scale(2.5) translate(115px,40px)';
	bgimg.style.webkitFilter = 'blur(10px)';
	bgimg.style.opacity = '0.25';
	bgimg.appendChild(bgimgin);
	//-webkit-filter: blur(40px);	
		
	var play = document.querySelector('#play');
	//点击播放按钮的逻辑
	var timer;
	var timerLine;
	var timerText;
	var timerScroll;
	play.onclick = function() {
		
		rota();//唱片转
		lineAuto ();//进度条走
		textAuto();//文字走
		scrollAuto();//滚动条走
	};
	
	
	//音量按钮
	var yin = document.querySelector('.footer3-2-2');
	var yinInner = document.querySelector('.footer3-2-3');
	yin.onmousedown = function(event) {
		var left = yin.offsetLeft;
		var mouseS = event.clientX;
 		document.onmousemove = function(event) {
			var mouseEndLeft = event.clientX;
			var disX = mouseEndLeft-mouseS;
			var eleft = disX + left;
			var foot1 = document.querySelector('.footer13');
			var foot2 = document.querySelector('.footer14');
			if(eleft < -2){
				eleft = -2;
			}else if(eleft > 98){
				eleft = 98;
			}
			if(eleft > -2){
				foot1.className = 'footer13 footer3-1-3';
				foot2.className = 'footer14 footer3-1-4';
			}else if(eleft <= -2){
				foot1.className = 'footer13 footer3-1-5';
				foot2.className = 'footer14 footer3-1-6';
			}
			yin.style.left = eleft  +'px';
			yinInner.style.width = (eleft+2)  +'px';
		}
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
		}
		return false;
	};
	
	//进度条可拖动
	var lineDiv = document.querySelector('.line>.footer2-1');
	var lineIn = document.querySelector('.line>.footer2-2');
	var line = document.querySelector('.line');
	lineDiv.onmousedown = function(event) {
		var left = lineDiv.offsetLeft;
		var mouseS = event.clientX;
		
		document.onmousemove = function(event) {
			var mouseEndLeft = event.clientX;
			var disX = mouseEndLeft-mouseS;
			var eleft = disX + left;
			
			if(eleft < -3){
				eleft = -3;
			}else if(eleft > line.offsetWidth-10){
				eleft = line.offsetWidth-10;
			}
			
			lineDiv.style.left = eleft  +'px';
			lineIn.style.width = eleft+4  +'px';
		}
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
		}
		return false;
	};
	//进度条自动
	var flag2 = false;
	var leftLine = 0;
	var timeLine = 40000;
	var itemTime = 50;
	
	function lineAuto () {
		var dis = line.offsetWidth;
		var itemDis = dis/(timeLine/itemTime);
		if(flag2){
			clearInterval(timerLine);
		}else{
			timerLine = setInterval(function() {
			leftLine += itemDis;
			if(leftLine>=dis){
				    clearInterval(timerLine);
					clearInterval(timer);
					leftLine=0;
					cLeftTop.style.transition = '0.5s';
					cLeftTop.style.transform = 'rotate(0deg)';
					play.className = 'play';
					cLeftCenter.style.transform = 'rotate(0deg)';
					flag1 = !flag1;
					flag2 = !flag2;
				}
					lineDiv.style.left = leftLine-8  +'px';
					lineIn.style.width = leftLine+4  +'px';
			},itemTime)
		
		}
		flag2 = !flag2;
	};
	//text 随进度条和唱片 动
	var text = document.querySelector('.text');
	//var textTop = text.offsetTop;
	var textTop = 0;
	var flag3 = false;
	function textAuto() {
		var disText = text.offsetHeight-300;
		var itemDisT = disText/(timeLine/2000);
		if(flag3){
			clearInterval(timerText);
		}else{
				timerText = setInterval(function() {
				textTop += itemDisT;
				if(textTop>=disText){
					textTop=0;
					clearInterval(timerText);
					flag3 = !flag3;
				}
				text.style.transition = '0.5s';
				text.style.transform = 'translateY('+-textTop+'px)';
				//text.style.top = -textTop +'px';
			},2000)
		};
		flag3 = !flag3;
	};
	
	
	//滚动条
	var scroll = document.querySelector('.scroll');
	var scrollin = document.querySelector('.scrollin');
	
	var scale1 = 300/text.offsetHeight;
	scrollin.style.height = scale1*300 +'px';
	scrollin.onmousedown = function(event){
		var eleTop = scrollin.offsetTop;
		var mouseS = event.clientY;
		document.onmousemove = function(event){
			var mouseE = event.clientY;
			var disM = mouseE - mouseS;
			var top = disM + eleTop;
			if(top<0){
				top = 0;
			}else if(top>scroll.offsetHeight-scrollin.offsetHeight){
				top=scroll.offsetHeight-scrollin.offsetHeight
			}
			scrollin.style.transition = 'none';
			scrollin.style.top = top + 'px';
			
			//text动
			var textH = top/(scroll.offsetHeight-scrollin.offsetHeight)*(text.offsetHeight-300);
			text.style.transition = 'none';
			text.style.top = -textH + 'px';
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
		return false;
	};
	//滚动条随唱片和进度条 动
	var scrollinTop = 0;
	var flag4 = false;
	function scrollAuto(){
		var disScroll = 300-scale1*300;
		var itemDisS = disScroll/(timeLine/2000);
		if(flag4){
			clearInterval(timerScroll);
		}else{
				timerScroll = setInterval(function() {
				scrollinTop += itemDisS;
				if(scrollinTop>=disScroll){
					scrollinTop=0;
					clearInterval(timerScroll);
					flag4 = !flag4;
				}
				scrollin.style.transition = '0.5s';
				scrollin.style.transform = 'translateY('+scrollinTop+'px)';
			},2000)
		};
			flag4 = !flag4;
	};
	
	//滚轮text动
	text.onmousewheel = wheelText;
	text.addEventListener('DOMMouseScroll',wheelText);
	function wheelText (event) {
		event = event || window.event;
		var flag = '';
		var add = 0;
		if(event.wheelDelta){
			if(event.wheelDelta>0){
				flag = 'up';
				add = -9;
			}else{
				flag = 'down';
				add = 9;
			}
			
		}else if(event.detail){
			if(event.detail<0){
				flag = 'up';
				add = -9;
			}else{
				flag = 'down';
				add = 9;
			}
		}
		var scrollinTop = scrollin.offsetTop + add;
		
		if(scrollinTop<0){
			scrollinTop=0;
		}else if(scrollinTop>300-scrollin.offsetHeight){
			scrollinTop=300-scrollin.offsetHeight;
		};
		
		switch(flag){
			case 'up':
			scrollin.style.top = scrollinTop +'px';
			text.style.top = -scrollinTop/scale1 +'px';
			break;
			
			case 'down':
			scrollin.style.top = scrollinTop +'px';
			text.style.top = -scrollinTop/scale1 +'px';
			break;
		}
		
	}
	//点击play 后的执行  唱片转
	var flag1 = false;
	var cLeftCenter = document.querySelector('#cLeftCenter');
	var cLeftTop = document.querySelector('.cLeftTop');
	function rota(){
			if(flag1){
			
			//cLeftCenter.className = 'cLeftCenter';//添加动画 暂停时有问题

			clearInterval(timer);

			cLeftTop.style.transition = '0.5s';
			cLeftTop.style.transform = 'rotate(0deg)';
			play.className = 'play';
			
		}else{
			cLeftC();
			cLeftTop.style.transition = '0.5s';
			cLeftTop.style.transform = 'rotate(30deg)';
			play.className = 'playon';
			
		}
		flag1 = !flag1;
		
	}
	var i = 0;
	function cLeftC() {
		//唱片转
		if(cLeftCenter.style.transform == 'rotate(0deg)'){
			i = 0;
		}
		timer = setInterval(function() {
				i+=0.8;
				cLeftCenter.style.transform = 'rotate('+i+'deg)';
			},60)
	};
	//点击弹出登录框
	var loginBtn = document.querySelectorAll('.headRight2>:nth-child(n)');
	var bigD = document.querySelector('.bigD');
	for(var i=0;i<loginBtn.length;i++){
    loginBtn[i].onclick = function() {
      bigD.style.display = 'block';
    };
	}
	//点击X关闭登录框
	var bigD1_x = document.querySelector('.bigD1_x');
  bigD1_x.onclick = function () {
    bigD.style.display = 'none';
  }



	
	//点击换皮肤
	var flag = false;
	var huan_wrap = document.querySelector('.huan_wrap');//衣服
	var skin = document.querySelector('.skin');//皮肤选项
	var skinList = document.querySelectorAll('.skinList li');//颜色li
	huan_wrap.onclick = function() {
		if(!flag){
			skin.style.display = 'block';
			
		}else{
			skin.style.display = 'none';
		}
		flag = !flag;
		
	};
	
		document.addEventListener('click',function(){
		skin.style.display = 'none';
		flag = false;//点击任何位置 隐藏换肤卡
		});
	huan_wrap.addEventListener('click',function(event) {
		event.stopPropagation();//取消冒泡
	});
	skin.addEventListener('click',function(event) {
		event.stopPropagation();//取消冒泡
	});
	
	
	var header = document.getElementsByTagName('header')[0];
	var yiTop = document.querySelector('.huan .huana');
	var footer323 = document.querySelector('.footer3-2-3');
	var sraech = document.querySelector(".sraech");
	var sraechI = document.querySelector(".sraech input");
	var footerPrev = document.querySelector(".footerPrev");
	var footerNext = document.querySelector(".footerNext");
	var play = document.querySelector(".play");
	//var lineDiv = document.querySelector(".line>div");
	var footer322 = document.querySelector(".footer3-2-2");

	
	for (var i=0;i<skinList.length;i++) {
		skinList[0].onclick = function(){
			header.style.background = '#C62F2F';
			yiTop.style.background = '#C62F2F';
			footer323.style.background = '#C62F2F';
			sraech.style.background = '#A82828';
			sraechI.style.background = '#A82828';
			lineIn.style.background = '#C62F2F';
			footerPrev.style.background = '#C62F2F';
			footerNext.style.background = '#C62F2F';
			play.style.background = '#C62F2F';
			minWrap.style.background = '#C62F2F';
			minWrap.style.border = '1px solid #A82828';
			lineDiv.style.background = 'radial-gradient(#C62F2F 0%,#C62F2F 25%,#eee 25%)';
			footer322.style.background = 'radial-gradient(#C62F2F 0%,#C62F2F 25%,#eee 25%)';
			play.onmouseover = function() {
				play.style.background = '#A82828';
				play.onmouseout = function(){
					play.style.background = '#C62F2F';
				}
			};
			footerPrev.onmouseover = function() {
				footerPrev.style.background = '#A82828';
				footerPrev.onmouseout = function(){
					footerPrev.style.background = '#C62F2F';
				}
			};
			footerNext.onmouseover = function() {
				footerNext.style.background = '#A82828';
				footerNext.onmouseout = function(){
					footerNext.style.background = '#C62F2F';
				}
			};
		};
		skinList[1].onclick = function(){
			header.style.background = '#6cf';
			yiTop.style.background = '#6cf';
			footer323.style.background = '#6cf';
			sraech.style.background = '#1297ff';
			sraechI.style.background = '#1297ff';
			lineIn.style.background = '#6cf';
			footerPrev.style.background = '#6cf';
			footerNext.style.background = '#6cf';
			play.style.background = '#6cf';
			minWrap.style.background = '#6cf';
			minWrap.style.border = '1px solid #1297ff';
			lineDiv.style.background = 'radial-gradient(#6cf 0%,#6cf 25%,#eee 25%)';
			footer322.style.background = 'radial-gradient(#6cf 0%,#6cf 25%,#eee 25%)';
			play.onmouseover = function() {
				play.style.background = '#1297ff';
				play.onmouseout = function(){
					play.style.background = '#6cf';
				}
			};
			footerPrev.onmouseover = function() {
				footerPrev.style.background = '#1297ff';
				footerPrev.onmouseout = function(){
					footerPrev.style.background = '#6cf';
				}
			};
			footerNext.onmouseover = function() {
				footerNext.style.background = '#1297ff';
				footerNext.onmouseout = function(){
					footerNext.style.background = '#6cf';
				}
			};
		};
		skinList[2].onclick = function(){
			header.style.background = '#f9c';
			yiTop.style.background = '#f9c';
			footer323.style.background = '#f9c';
			sraech.style.background = '#DE4B95';
			sraechI.style.background = '#DE4B95';
			lineIn.style.background = '#f9c';
			footerPrev.style.background = '#f9c';
			footerNext.style.background = '#f9c';
			play.style.background = '#f9c';
			minWrap.style.background = '#f9c';
			minWrap.style.border = '1px solid #DE4B95';
			lineDiv.style.background = 'radial-gradient(#f9c 0%,#f9c 25%,#eee 25%)';
			footer322.style.background = 'radial-gradient(#f9c 0%,#f9c 25%,#eee 25%)';
			play.onmouseover = function() {
				play.style.background = '#DE4B95';
				play.onmouseout = function(){
					play.style.background = '#f9c';
				}
			};
			footerPrev.onmouseover = function() {
				footerPrev.style.background = '#DE4B95';
				footerPrev.onmouseout = function(){
					footerPrev.style.background = '#f9c';
				}
			};
			footerNext.onmouseover = function() {
				footerNext.style.background = '#DE4B95';
				footerNext.onmouseout = function(){
					footerNext.style.background = '#f9c';
				}
			};
		};
		skinList[3].onclick = function(){
			header.style.background = '#3b2e7e';
			yiTop.style.background = '#3b2e7e';
			footer323.style.background = '#3b2e7e';
			sraech.style.background = '#0F035F';
			sraechI.style.background = '#0F035F';
			lineIn.style.background = '#3b2e7e';
			footerPrev.style.background = '#3b2e7e';
			footerNext.style.background = '#3b2e7e';
			play.style.background = '#3b2e7e';
			minWrap.style.background = '#3b2e7e';
			minWrap.style.border = '1px solid #0F035F';
			lineDiv.style.background = 'radial-gradient(#3b2e7e 0%,#3b2e7e 25%,#eee 25%)';
			footer322.style.background = 'radial-gradient(#3b2e7e 0%,#3b2e7e 25%,#eee 25%)';
			play.onmouseover = function() {
				play.style.background = '#0F035F';
				play.onmouseout = function(){
					play.style.background = '#3b2e7e';
				}
			};
			footerPrev.onmouseover = function() {
				footerPrev.style.background = '#0F035F';
				footerPrev.onmouseout = function(){
					footerPrev.style.background = '#3b2e7e';
				}
			};
			footerNext.onmouseover = function() {
				footerNext.style.background = '#0F035F';
				footerNext.onmouseout = function(){
					footerNext.style.background = '#3b2e7e';
				}
			};
		
		};
		skinList[4].onclick = function(){
			header.style.background = '#fc0';
			yiTop.style.background = '#fc0';
			footer323.style.background = '#fc0';
			sraech.style.background = '#937405';
			sraechI.style.background = '#937405';
			lineIn.style.background = '#fc0';
			footerPrev.style.background = '#fc0';
			footerNext.style.background = '#fc0';
			play.style.background = '#fc0';
			minWrap.style.background = '#fc0';
			minWrap.style.border = '1px solid #937405';
			lineDiv.style.background = 'radial-gradient(#fc0 0%,#fc0 25%,#eee 25%)';
			footer322.style.background = 'radial-gradient(#fc0 0%,#fc0 25%,#eee 25%)';
			play.onmouseover = function() {
				play.style.background = '#937405';
				play.onmouseout = function(){
					play.style.background = '#fc0';
				}
			};
			footerPrev.onmouseover = function() {
				footerPrev.style.background = '#937405';
				footerPrev.onmouseout = function(){
					footerPrev.style.background = '#fc0';
				}
			};
			footerNext.onmouseover = function() {
				footerNext.style.background = '#937405';
				footerNext.onmouseout = function(){
					footerNext.style.background = '#fc0';
				}
			};
		};
		skinList[5].onclick = function(){
			header.style.background = '#3f0';
			yiTop.style.background = '#3f0';
			footer323.style.background = '#3f0';
			sraech.style.background = '#219005';
			sraechI.style.background = '#219005';
			lineIn.style.background = '#3f0';
			footerPrev.style.background = '#3f0';
			footerNext.style.background = '#3f0';
			play.style.background = '#3f0';
			minWrap.style.background = '#3f0';
			minWrap.style.border = '1px solid #219005';
			lineDiv.style.background = 'radial-gradient(#3f0 0%,#3f0 25%,#eee 25%)';
			footer322.style.background = 'radial-gradient(#3f0 0%,#3f0 25%,#eee 25%)';
			play.onmouseover = function() {
				play.style.background = '#219005';
				play.onmouseout = function(){
					play.style.background = '#3f0';
				}
			};
			footerPrev.onmouseover = function() {
				footerPrev.style.background = '#219005';
				footerPrev.onmouseout = function(){
					footerPrev.style.background = '#3f0';
				}
			};
			footerNext.onmouseover = function() {
				footerNext.style.background = '#219005';
				footerNext.onmouseout = function(){
					footerNext.style.background = '#3f0';
				}
			};
		};
	};
	

	//最小化按钮  关闭按钮
	var min = document.querySelector('.min');
	var close = document.querySelector('.close');
	var wrap = document.querySelector('.wrap');
	var minWrap = document.querySelector('.minWrap');
	min.onclick = function function_name () {
		wrap.style.transition = '0.01s';
		wrap.style.width = '0px';
		wrap.style.height = '0px';
		minWrap.style.display = 'block';
	};
	close.onclick = function function_name () {
		wrap.style.transition = '0s';
		wrap.style.display = 'none';
		minWrap.style.display = 'none';
	};
	//最大化按钮
	var max = document.querySelector('.max');
	var span = document.querySelector('.max span');
	//var falg6 = false;
	max.onclick = function () {
		/*if(falg6){
			span.style.width ='0px';
			span.style.height ='0px';
			span.style.transition = '3s';
			span.style.transform = 'rotate(0deg)';
		}else{}*/
			span.style.width ='150px';
			span.style.height ='30px';
			span.style.transition = 'transform 3s';
			span.style.transform = 'rotate(720deg)';
			setTimeout(function(){
				span.style.width ='0px';
				span.style.height ='0px';
				span.style.transform = 'rotate(0deg)';
				
			},5000)
		//falg6 = !falg6;
	}
	
	
	//小界面 
	//one mini 图片
	var minC = cirInner.cloneNode(true);
	var min_one = document.querySelector('.min_one');
	var cirInner = document.querySelector('.cir-inner');
	cirInner.style.borderRadius = '0px';
	minC.style.position = 'absolute';
	minC.style.top = '-87px';
	minC.style.left = '-88px';
	minC.style.transform = 'scale(0.25)';
	minC.style.borderRadius = '0px';
	min_one.appendChild(minC);
	
	//two  迷你播放按钮 没有实际功能
	
	var footer1 = document.querySelector('.footer1');
	var miniFooter1 = footer1.cloneNode(true);
	var min_two = document.querySelector('.min_two');
	miniFooter1.style.width = '180px';
	var miniplay = miniFooter1.querySelector('.play');
	var miniprev = miniFooter1.querySelector('.footerPrev');
	var mininext = miniFooter1.querySelector('.footerNext');
	miniplay.style.border = '2px solid #fff';
	miniplay.style.background = 'rgba(255,255,255,0)';
	miniprev.style.background = 'rgba(255,255,255,0)';
	mininext.style.background = 'rgba(255,255,255,0)';
	
	miniFooter1.style.transform = 'scale(0.8) translate(-18px)';
	min_two.appendChild(miniFooter1);
	
	//mini 的关闭按钮
	var miniClose = document.querySelector('.min_four .x');
	miniClose.onclick = function() {
		minWrap.style.display = 'none';
	};
	//mini 的放大按钮
	var miniBig = document.querySelector('.min_four .min_max');
	miniBig.onclick = function () {
		wrap.style.width = '800px';
		wrap.style.height = '500px';
		wrap.style.display = 'block';
		minWrap.style.display = 'none';
		flag = !flag;
	}
	
	//min  的下拉列表
	var btnList = document.querySelector('.min_three>a');
	var list = document.querySelector('.min_two>.list');
	var flag5 = false;
	btnList.onclick = function() {
		if(flag5){
			list.style.height = '0px';
		}else{
			list.style.height = '120px';
		}
		flag5 = !flag5;
	};
	var lis = document.querySelectorAll('.min_two>.list>li');
	for(var i=0;i<lis.length;i++){
		lis[i].onmouseover = function () {
			this.className = 'onli';
			//console.log(111)
		};
	};
	for(var i=0;i<lis.length;i++){
		lis[i].onmouseout = function () {
			this.className = '';
		};
	};
	
	//min 界面拖动
	minWrap.onmousedown = function(event) {
		var miTop = minWrap.offsetTop;
		var miLeft = minWrap.offsetLeft;
		var mouseX = event.clientX;
		var mouseY = event.clientY;
		document.onmousemove = function (event) {
			var endX = event.clientX;
			var endY = event.clientY;
			var disX = endX - mouseX;
			var disY = endY - mouseY;
			var leftE = disX + miLeft;
			var topE = disY +miTop;
			if(leftE < 10){
				leftE = 0;
			}else if(leftE > document.body.clientWidth-minWrap.offsetWidth-10){
				leftE = document.body.clientWidth-minWrap.offsetWidth;
			};
			if(topE < 10){
				topE = 0;
			}else if(topE > document.body.clientHeight-minWrap.offsetHeight-10){
				topE = document.body.clientHeight-minWrap.offsetHeight;
			};

			minWrap.style.left = leftE + 'px';
			minWrap.style.top = topE + 'px';
		};
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	}
	//关闭注册界面的按钮
	var zhuceBtn = document.querySelector('.zhuce_x');
  var zhuce = document.querySelector('.zhuce');
  zhuceBtn.onclick = function () {
    zhuce.style.display = 'none';
  };
  //关闭登录界面的按钮
  var loginBtn = document.querySelector('.login_x');
  var login = document.querySelector('.login');
  loginBtn.onclick = function () {
    login.style.display = 'none';
  };
  //点击注册按钮 注册对话框出现
	var bigD2zc = document.querySelector('.bigD2zc');
  bigD2zc.onclick = function () {
    zhuce.style.display = 'block';
    bigD.style.display = 'none';
  };
  //点击手机号登录按钮 登录对话框出现
  var bigD2dl = document.querySelector('.bigD2dl');
  bigD2dl.onclick = function () {
    login.style.display = 'block';
    bigD.style.display = 'none';
  };






	
};