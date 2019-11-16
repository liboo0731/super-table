// 定义模块
var myAppModule = angular.module('myApp', ['ngTable','ngTableDemos']);

// 定义控制器
myAppModule.controller('demoNgTableController',['NgTableParams', 'ngTableSimpleList','$scope','$element',function(NgTableParams,ngTableSimpleList,$scope,$element){
	var self = this;
	
	// 表格实例
	self.tableParams = new NgTableParams({
		count:5,
		filter:{name:'a'},
		page:2,
		sorting:{name:'desc'}
	},{
		counts:[5,10,20],
		dataset:ngTableSimpleList,
		filterOptions:{
			filterComparator: false	// 模糊过滤
		},
		interceptors:[{	// 在数据行显示在表中之前对getData函数的调用结果的拦截器集合，集合中后一个拦截器会去拦截前一个的返回值，最终返回最后一个拦截器的处理结果
    		response:function(data,params){
    			console.log(data);
    			return data;	
    		},
    		responseError:function(reason,params){
    			return reason;
    		}
		}]
	});
	
	
	// 分页控制
	self.changePage = function(nextPage){
      self.tableParams.page(nextPage);
    };
    
    self.changePageSize = function(newSize){
      self.tableParams.count(newSize);
    };
    
    
    // 单独排序控制
	self.toggleSortability = function($column){
		if($column.sortable()){
			$column.sortField = $column.sortable();
			$column.sortable.assign(self,false);
		}else{
			$column.sortable.assign(self,$column.sortField);
		};
    };
    // 是否启用排序
	self.isSortable = true;
	
	
	// 全局搜索
	self.applyGlobalSearch = function(){
		var term = self.globalSearchTerm;
		if(self.isInvertedSearch){
			term = "!" + term;
		};
		self.tableParams.filter({$:term});
	};
	// 是否显示过滤
	self.isFiltersVisible = true;
	// 是否启用过滤
    self.isFiltersEnabled = true;
	// 是否启用age 过滤
    self.ageFilter = function(){
    	if(self.isAgeFilterDisabled) {
    		return {age:"filters/disabled.html"}
    	}else{
    		return {age:"number"}
    	};
	};
    
	
	self.checkboxes = {
      checked:false,
      items:{}
    };
    // 监控全选
    $scope.$watch(function() {
      return self.checkboxes.checked;
    }, function(value) {
      angular.forEach(ngTableSimpleList,function(item) {
        self.checkboxes.items[item.id] = value;
      });
    });
    // 监控选中行的数据
    $scope.$watch(function(){
      return self.checkboxes.items;
    }, function(values){
      var checked = 0, unchecked = 0,
          total = ngTableSimpleList.length;
      angular.forEach(ngTableSimpleList,function(item) {
        checked += (self.checkboxes.items[item.id]) || 0;
        unchecked += (!self.checkboxes.items[item.id]) || 0;
      });
      if((unchecked == 0) || (checked == 0)) {
        self.checkboxes.checked = (checked == total);
      }
      // grayed checkbox
      angular.element($element[0].getElementsByClassName("select-all")).prop("indeterminate", (checked != 0 && unchecked != 0));
    },true);
}]);