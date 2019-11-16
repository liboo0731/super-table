// 定义模块
var myAppModule = angular.module('myApp', ['ngTable','ngTableDemos']);

// 定义组件
myAppModule.component('superTable',{
	templateUrl:'template.html',
	controller:['NgTableParams','ngTableSimpleList','$scope','$element',function(NgTableParams,ngTableSimpleList,$scope,$element){
		var self = this;
		
		// 列定义
	    self.cols = [
	    	{ field: "name", title: "Name", show: true },
	    	{ field: "age", title: "Age", show: true },
	    	{ field: "money", title: "Money", show: true }
	    ];
	    // 表格加载
	    self.tableParams = new NgTableParams({},{
	    	dataset:ngTableSimpleList
	    });
	    // 列移动
	    self.move = function(column,currentIdx,value){
	      var newPosition = currentIdx + value;
	      if (newPosition >= self.cols.length || newPosition < 0) {
	        return;
	      };
	      self.cols[currentIdx] = self.cols[newPosition];
	      self.cols[newPosition] = column;
	    };
	}]
});

