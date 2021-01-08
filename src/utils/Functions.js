
export const Functions = {
	getBaseParam(){
		let jsonParam = localStorage.getItem("baseParam");//json字符串
		let baseParam = jsonParam ? JSON.parse(jsonParam) : {};
		console.log(typeof baseParam);
		return baseParam
	},
	updateBaseParam(key, value){
		let jsonParam = localStorage.getItem("baseParam")
		let baseParam = jsonParam ? JSON.parse(jsonParam) : {};
		baseParam[key] = value
		localStorage.setItem('baseParam', JSON.stringify(baseParam));
	},
	setBaseParam(object){//json的对象
		if(typeof object != "object"){
			object = JSON.parse(object)
		}
		localStorage.setItem('baseParam', JSON.stringify(object));
	},
	//加密
	//判断数据是否在数组中
	isInArray(target, array, strict=false){
		for(let key in array) {
			if (strict === true) {
				if (target === array[key]) {
					return true;
				}
			}else{
				if (target == array[key]) {
					return true;
				}
			}
		}
		return false
	}
}