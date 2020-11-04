(function (window) {
	'use strict';
	//里面的变量就是局部变量，除非绑定在window上
	//书写本地存储的存取方法
	// [
	// 	{
	// 		title:'任务名称',
	// 		completed:true,
	// 		id:'时间戳'
	// 	}
	// ]
	window.storage = {
		getStorage(){
			// 获取本地存储,并转换成json对象
			return JSON.parse(window.localStorage.getItem('todos')||'[]');
		},
		setStorage(json){
			// 把传入的json对象转成json字符串,存入本地存储
			window.localStorage.setItem('todos',JSON.stringify(json));
		}
	}

	//创建一个Vue实例
		window.app =new Vue({
			el:'.todoapp',
			data:{
				newTask:"",
				tasks:window.storage.getStorage(),
				isEditing:-1,
				status:true,
				count:0,
				flag:""//
			},
			methods:{
				show(i){
					if(this.flag===""){
						return true
					}else if(this.flag.completed===i){
						return true
					}
				},
				deleteWan(){
					this.tasks =this.tasks.filter(task=>{
						return task.completed!=true
					})
					//同步到本地存储中
					window.storage.setStorage(this.tasks);
				},
				toggleAll(){
					this.tasks.forEach((task)=>{
						task.completed=this.status
					})
					this.status=!this.status
					//同步到本地存储中
					window.storage.setStorage(this.tasks);
				},
				remove(id){
					this.tasks =this.tasks.filter(task=>{
						return task.id!=id
					})
					//同步到本地存储中
					window.storage.setStorage(this.tasks);
				},
				add(){
					var task ={
						title:this.newTask,
						completed:false,
						id:Date.now()
					}
					this.tasks.push(task);
					this.newTask=""
					//同步到本地存储中
					window.storage.setStorage(this.tasks);
				}
			},
			computed:{
				activeNum(){
					this.count=0
					this.tasks.forEach((task)=>{
						if(!task.completed){
							this.count++
						}	
					})
					return this.count
				},
				isShow(){
					for(var i =0;i<this.tasks.length;i++){
						if(this.tasks[i].completed){
							return true
						}
					}
					return false
				}

			}
		})
		//监控路由
		window.onhashchange =function(){
			console.log(location.hash)
			if(location.hash=="#/active"){
				window.app.flag={completed:false}
				console.log(11)
				return;
			}else if(location.hash=="#/completed"){
				window.app.flag={completed:true}
				return;
			}else{
				window.app.flag="";
				return;
			}
		}




































})(window);
