(function(window){
	window.transformCss = function (node,name,value){
		//创建对象，用来保存属性名与属性值
		if(!node.aaa){
			node.aaa = {};
		};
		
		var result = '';
		//写
		if(arguments.length > 2){
			node.aaa[name] = value;
			//枚举对象中的属性
			for (var i in node.aaa) {
				switch (i){
					case 'translateX':
					case 'translateY':
					case 'translateZ':
					case 'translate':
						result += i + '('+ node.aaa[i] +'px) ';
						break;
					case 'scaleX':
					case 'scaleY':
					case 'scale':
						result += i + '('+ node.aaa[i] +') ';
						break;
					case 'rotate':
					case 'skewX':
					case 'skewY':
					case 'skew':
						result += i + '('+ node.aaa[i] +'deg) ';
						break;													
				};
			};
			
			node.style.transform = result;
			
		}else{
			//读				
			if(typeof node.aaa[name] == 'undefined'){
				//默认情况 （读）
				if(name == 'scale' || name == 'scaleX' || name == 'scaleY'){
					value = 1;
				}else{
					value = 0;
				};
			}else{
				//正常情况   （写 --- 读）
					value = node.aaa[name];
				}
				
				return value;
			};
			
		};

	
	
})(window);

