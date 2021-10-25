//pagination plugin
(function (win,doc) {
  var MyPagination = function (obj,fun) {
    this.el          = obj.el;         //pagination 容器
    this.page        = obj.page;       //当前页码数
    this.total       = obj.total;      //页码总数
    this.clas        = obj.clas;       //页码样式
    this.clasInput   = obj.clasInput;  //input 输入框样式
    this.searchText  = obj.searchText; //搜索按钮文字内容
    this.callback    = fun;            //点击回调函数
    this.init();
  };
  MyPagination.prototype = {
    init:function () {
      this.update();
      this.skip();
    },
    showPage:function(page,total){
      var str = '<a class="'+this.clas+' active">'+page+' </a>';
      for (var i = 1;i <=3;i++){
        if(page - i >=1){
          str = '<a class="'+this.clas+'">'+(page - i)+' </a>'+str;
        }
        if(page + i < total ){
          str = str + '<a class="'+this.clas+'">'+(page + i)+' </a>';
        }
      }

      if(page === 5){
        str = '<a class="'+this.clas+'">上一页 </a>'+' '+'<a class="'+this.clas+'">1 </a>'+ str;
      }else if(page -4 > 1){
        str = '<a class="'+this.clas+'">上一页 </a>'+' '+ '<a class="'+this.clas+'">1 </a>'+'... '+ str;
      }

      if(page + 4 < total){
        str = str +'... '+'<a class="'+this.clas+'">'+total +'</a>'+'<a class="'+this.clas+'"> 下一页</a>' +' <input class="'+this.clasInput+'" type="text"/> <a class="'+this.clas+'">'+this.searchText+'</a>';
      }else if(page < total){
        str = str +' '+'<a class="'+this.clas+'">'+total +'</a>'+'<a class="'+this.clas+'"> 下一页</a>'+' <input class="'+this.clasInput+'" type="text"/> <a class="'+this.clas+'">'+this.searchText+'</a>';
      }

      if(page === this.total){
        str = str + ' <input class="'+this.clasInput+'" type="text"/> <a class="'+this.clas+'">'+this.searchText+'</a>';
      }
      return str;
    },
    update:function () {
      document.getElementById(this.el).innerHTML = this.showPage(this.page,this.total);
    },
    skip:function () {
      document.getElementById(this.el).addEventListener('click',function (event) {
        if(event.target.tagName == 'A'){
          var e = event.target.innerHTML;
          var html = parseInt(e);
          if(html%1 ===0){
            this.page = html;
          }
          if(e.indexOf('上') > -1){
            this.page --;
          }
          if(e.indexOf('下') > -1){
            this.page ++;
          }
          if(e.indexOf(this.searchText) > -1){
            var text = event.target.previousElementSibling.value;
            if(/^\d+/.test(text)){
              var n = parseInt(text);
              if(event.target.previousElementSibling.value.replace(/(^\s*)|(\s*$)/g, "").length > 0){
                if(n < 1){
                  alert('请输入大于0的数字页码！');
                }else if(n > this.total){
                  alert('请输入小于总页数的数字页码！');
                }else{
                  this.page = n;
                }
              }
            }else{
              alert('请输入大于0的整数！');
            }
          }
          this.callback.call(event.target,this.page);
          this.update();
        }
      }.bind(this));
    }
  };
  win.Mypagination = MyPagination;
}(window,document));

























