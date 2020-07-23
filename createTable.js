function table() {
    this.clientW=document.documentElement.clientWidth;
    this.clientH=document.documentElement.clientHeight;
    this._init();
    this._optCard();
    this.tableCss="";
}
table.prototype={
    _init(){//初始化
        this.startBtn=document.createElement("button");
        this.startBtn.style.cssText="width:100%;height:50px;background:red;cursor:pointer;line-height:50px;font-size:30px";
        this.startBtn.innerHTML="开始创建表格";
        document.body.appendChild(this.startBtn);
    },
    _optCard(){
       var that = this;
       this.startBtn.onclick=function () {
            that._pannel();
            that._createTable();
       }
    },
    _pannel(){//获取表格的行和列
        this.pannel=document.createElement("div");
        this.pannel.style.cssText="width:"+this.clientW/3+"px;height:"+this.clientH/2+"px;position:absolute;left:0;top:0;margin:80px 440px;border:1px solid red;";
        var rowInput=document.createElement("input");
        rowInput.placeholder="请输入行";
        var colInput=document.createElement("input");
        colInput.placeholder="请输入列";
        var submit = document.createElement("input");
        submit.type="button";
        submit.value="确定";
        this.submit=submit;
        this.rowInput=rowInput;
        this.colInput=colInput;
        this.pannel.appendChild(rowInput);
        this.pannel.appendChild(colInput);
        this.pannel.appendChild(submit);
        document.body.appendChild(this.pannel);
    },
    _setTableCss(){//设置表格样式
        var css=`
        table{
            width:80%;
            height:auto;
            border；1px solid black;
            margin:20px auto;
            border-collapse:collapse;
        }
        td{
            border:1px solid black;
        }
        `;
        var finalcss=this.tableCss?this.tableCss:css;
        var style=document.createElement("style");
        style.innerHTML=finalcss;
        document.body.append(style);
    },
    _createTable(){//创建表格
        var that=this;
        this.submit.onclick=function () {
            var rows=that.rowInput.value;
            var cols=that.colInput.value;
            that.rows=rows;
            that.cols=cols;
            console.log(rows,cols);
            that.pannel.style.display="none";
            that._setTableCss();
            that.table=document.createElement("table");
            for(var i=0;i<rows;i++){
                var tr=document.createElement("tr");
                for(var j=0;j<cols;j++){
                    var td=document.createElement("td");
                    td.innerHTML="&nbsp";
                    tr.appendChild(td);
                }
                that.table.appendChild(tr);
            }
            document.body.appendChild(that.table);
            that._createAddBtn();
            that._editTable();
            that._addTable();
            that._delTable();
            that._createAddBtn1();
            that._addTable1();
        }
    },
    _delTable(){//删除某一列
        var that=this;
        that._createMenu();
        document.oncontextmenu=function (ev) {
            var target=ev.target;
            var cx=ev.clientX;
            var cy=ev.clientY;
            that.menu.style.left=cx+"px";
            that.menu.style.top=cy+"px";
            that.menu.style.display="block";
            ev.preventDefault();
            that.delMenu.onclick=function () {
                that.table.removeChild(target.parentNode);
            }
        }
        document.onclick=function () {
            that.menu.style.display="none";
        }
    },
    _editTable(){//使选中的表格可编辑
        var that=this;
        that.table.ondblclick=function (ev) {
            var target=ev.target;
            target.setAttribute("contenteditable",true);
            target.focus();
            target.onblur=function () {
                target.removeAttribute("contenteditable");
            }
        }
    },
    _createAddBtn(){//创建添加表格按钮
        this.addBtn=document.createElement("button");
        this.addBtn.innerHTML="添加一行";
        this.addBtn.style.cssText="float:left;width:200px;height:40px;border:1px solid #fff;margin:0 475px;cursor:pointer;font-size:20px;line-height:20px;color:red";
        document.body.appendChild(this.addBtn);
    },
    _createAddBtn1(){
        this.addBtn1=document.createElement("button");
        this.addBtn1.innerHTML="添加一列";
        this.addBtn1.style.cssText="float:left;width:200px;height:40px;border:1px solid #fff;margin:-40px 675px;cursor:pointer;font-size:20px;line-height:20px;color:red";
        document.body.appendChild(this.addBtn1);
    },
    _addTable(){//添加一行
        var that=this;
        this.addBtn.onclick=function () {
            var td=document.querySelectorAll("tr:first-child td");
            //console.log(td);
            var tr=that.table.insertRow();
            for(var i=0;i<td.length;i++){
                tr.insertCell().innerHTML="&nbsp";
            }
        }
    },

    _addTable1(){//添加一列
        var that=this;
        this.addBtn1.onclick=function () {
            var tr1=document.querySelectorAll("tr");
            for(var i=0;i<tr1.length;i++){
                tr1[i].insertCell().innerHTML="&nbsp";
            }
        }
    },


    _createMenu(){
        this.menu=document.createElement("ul");
        this.delMenu=document.createElement("li");
        this.delMenu.innerHTML="删除";
        this.selectMenu=document.createElement("li");
        this.selectMenu.innerHTML="查询";
        this.menu.appendChild(this.delMenu);
        this.menu.appendChild(this.selectMenu);
        this.menu.style.cssText="width:100px;height:100px;background:blue;border:1px double red;box-shadow:0 0 10px red;position:absolute;padding:5px;line-height:20px;cursor:pointer;";
        document.body.appendChild(this.menu);
    }
}