# super-table
Angularjs+NgTable 多功能表格

1. 排序
  使用sortable="$ctrl.isSortable?'id':false" 此方法整体控制是否排序，组件模式下排序图标不显示,但功能正常

2. 分组


3. 过滤
  全局搜索
  是否启用过滤	Enable filter row 
  是否显示过滤	Show filter row 
  禁止某项过滤 	Disable age filter 
  精确/模糊过滤	Strict/Non-strict、Equals/Contains
  以什么开头/结尾	Starts with/Ends with

4. 搜索


5. 编辑


6. 列显隐


7. 列移动


8. 初始化设置
  ngTableDefaults.settings

ngTableDefaults.params

this.tableParams = new NgTableParams({params},{settings})
实例里面的设置可以覆盖默认设置，但是只在默认设置中定义拦截器（interceptors），拦截器执行了两次，第二次拦截数据（data）都为空；
一般不需要更改默认设置，直接在实例设置中进行定义

9. 全选
  目前使用2.2.0 及以下版本在组件模式下可以正常工作，控制器模式无影响