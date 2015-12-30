var Tree = function (name, data, target) {
        
        this.rtl = false;
        this.allowCheck = false;
        this.allowMultiSelect = false;
        this.allowEditName = false;
        this.allowMove = false;
        
        var multiSelect = false;
        var allowEdit = false;
        var allowMoveItem = false;
        
        var treeData = data;
        var mainStack = new Array();
        var indexStack = new Array();
        var treeNameAttr = "data-name='" + name + "'";
        var triggers = {};
        triggers.select = null;
        triggers.unSelect = null;
        triggers.append = null;
        triggers.remove = null;
        triggers.move = null;
        triggers.edit = null;
        triggers.rename = null;
           
        var imgLeft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuklEQVQ4T2NkIAKkWu0yYGT4s5/xP+OHf4zMgbOPuV2AaWMkpB+umYFRAKz2P8ODmcc9FYkyAEMzSP///w9nHfdSIGgAds0MH/8zMjsQ9AKxmkGuwAgDUjRjGECqZgwD0iy3f2BkZOCHBdD//5h                        +Ro81FC9gGMDw/8N/BhZH5EDDawDYC///HkBxBQFDsAciCYZgTYmkuARnUibWELx5AZshJOUFUIijG0J0XkCOLpghDKAYYWQJQI5WANOWmxGYmk9OAAAAAElFTkSuQmCC";
        
        var imgDown = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4T62S0Q2AIAxEe+6ia7iCTqBGx9LIBq7gHLqLGEg0qKWQIJ9wfbS9AyUeJNbTP4CxWBQ0rf1eq5iOpnxpNVAOW9XBFBPQmEIcugtBbHGG2X6kSeFxEYBwWruDGIhPcy9RgkhvDxc4oR31mpkZ8WPjG+K6wi2ZzQEH8TnkDZILkewVk2ggZgQpG/9EOSa+Pk1yByeQeGzzroKohAAAAABJRU5ErkJggg==";
        
        var imgRight = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsUlEQVQ4T5WTwRHCIBBF31YgHagd2IHxzEUrDZecTTqwhNiBVoCTODqbAAE4MTD/zd/dv4I6zbU7eWjBG0EuvbMP/R+7i34837oR2M9v3r9KIGlAIWQBmEsQemD3d5ZxsgBMolpIAKiFRAE1kCQgDWEcnD3+epQH4O+IGDXu59DaQxbwDVUgfoun0QFLN7FAPLmIj7FQHABKbev4b0cZgprXC7UFyIrjJQgOMOtup9b6A+EWghEMlSOKAAAAAElFTkSuQmCC"
        
        var imgLi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACpElEQVR42oXTX0hTURwH8O/dVq5VMGq40Vx/yEGMQbKmWEKh1EtgoA89pJT1EP2jhkQMn8bU7CGlh8SItEgfMoMKhTKDkMQErQgtN6XNyrUbbW672+7+3T/dO+fNP1AHDudwzvl9OD9+5xAQmlwulymVyk0ymQz/axVG5ZbGXcWDGX/Y7QoE6ojcujYciZAsy0JGECAEiBBHYUMckZtzbALM5xPo6fBgz0sKbDzeLwHBhYVFIBe8GgJ4ZFzn0ft8HM0PaJy1+Dl6jHgiAaFwWAKWB8tyN0h7rmNkeBC2tiDKTT4cLeXGapxMlQREKGoNkB2FnvE/gvtDH047vCjU/ECrTY/ikzPloSjeSQAVjZIcx0nAUipsaASk6yFq7VNQEd/RXr8OtKED+w5UmYQ4lwTEYrG/QK5zcTcoTyfqGt4jHJjDHVsM0fwmaHYehslkKuB53icB8XicFBakYD7lR2r+Hi44xvBl+is6LgeR1FzEem0lzGYz1Gq1Tjj/SwJoml4E5HIQTASM7y4abo5i6K0bt84FkaerBKU6DqvVCq1WC4VCsRJIJBIkL9adZ8F+a0Zb50d0P5uF81QIOwotmEnVoqSkBEajMXvDNUAymSTFCR3xY/RFE2xNw7h0jMKhUj3ezNegqMgi5g2xUhyIzPYCvV4Afq8BfroH4Zt5Ctf0J1TsTWDAU4fdRjMMBgMCwQVsVKn4lhstVwb6+28LGC8BqVSKZBgGrc4zOGjZgM3bjkCts0KTr4NQIUxOTqGsbD/sdruzq+u+Q0hZzBgrAK/Xg4nxCVRXVyNPqcy+AxH1eL0g/ST/uK+3sae7x0FRFL/0uSQgnU5nU1j6kUTuFYrArGcuY792tf710Kv2RCIpBS8HFELf+o9fzArlDXJCzqs3/gBmNE0GKC9HDAAAAABJRU5ErkJggg==";
        this.extraData = [{default: imgLi}];       
        
        
              
        var treeHtml = '';
        
        this.on = function(treeEvent, treeCallBack){
            if(triggers[treeEvent] == null)
                triggers[treeEvent] = treeCallBack;
        }
        
        this.append = function appendNewNode(newId, newName, newParentId, newExtraData){
            var currentNode = $("div[" + treeNameAttr +"] li[data-id" + newParentId + "]");            
            if(currentNode.children("ul")){
                    var nodeHtml = "<li data-id" +  newId + 
                        " data-value='"+ newId + "' >"    
                    nodeHtml += "<span data-space></span>";            
                    nodeHtml += addCheckBox(newId, this.allowCheck);
                    nodeHtml += "<span data-text class='" + addImage(newExtraData, this.extraData) + "'>";
                    nodeHtml += newName;
                    nodeHtml += "</span>"
                    currentNode.children("ul").append(nodeHtml);
            }
            else{
                    currentNode.append("<ul>" + nodeHtml + "</ul>");
            }
            
            if(triggers["append"] != null)
                triggers["append"](newId);
        }
        
        this.edit = function editNode(id, name, extraDataValue){
            var currentNode = $("div[" + treeNameAttr +"] li[data-id" + id + "]");
            currentNode.find("span[data-text]").text(name);
            currentNode.find("span[data-text]").removeClass().addClass(addImage(extraDataValue, this.extraData));       
            
            if(triggers["edi"] != null)
                triggers["edit"](id);
        }
        
        this.remove = function(id){
            var currentNode = $("div[" + treeNameAttr +"] li[data-id" + id + "]");
            if(currentNode.find("li").length > 0)
                throw "Has sub tree!"
            if(currentNode.parent("ul").find("li").length < 1)
                currentNode.parent("ul").remove();
            else
                currentNode.remove();
            if(triggers["remove"] != null)
                triggers["remove"](id);
        }
        
        this.getCheckedValues = function(){
                var checkboxValues = [];
                $("body div[" + treeNameAttr +"] input[type='checkbox']:checked").map(function() {
                    checkboxValues.push($(this).val());
            });
             return checkboxValues
        };
        
        this.getSelectedValues = function(){
                var selectedValues = [];
                $("body div[" + treeNameAttr +"] li span.active").map(function() {
                    selectedValues.push($(this).parent("li").attr("data-value"));
            });
             return selectedValues
        };
        
        this.select = function(idsArray){
            $("div[" + treeNameAttr +"] li span[data-text]").removeClass("active");
            $("div[" + treeNameAttr +"] li").removeClass("open");
            var f = idsArray.map(function(value){
                 $("div[" + treeNameAttr +"] li[data-value='"+value+"'] > span[data-text]").addClass("active");                 
            });
            
            $.each($("div[" + treeNameAttr +"] li ul").parent().find("img[data-status]"), function(){
                openAllNode($(this), (this.rtl == true) ? imgLeft : imgRight);
            });
        }
        
        this.buildTree = function() {           
         var rtlClass = (this.rtl == true) ? "rtl" : "ltr"
         var rtlStatusImage  =  (this.rtl == true) ? imgLeft : imgRight;
         
         multiSelect = this.allowMultiSelect;
         allowEdit = this.allowEditName;
         allowMoveItem = this.allowMove;
         
            Array.prototype.push.apply(mainStack, treeData.filter(function(value){
                    return (!value.parentId)
                })
            ); 
            
            indexStack.push({id: mainStack[mainStack.length - 1].id, index: mainStack.length - 1});
                
            treeHtml += "<div data-tree " + treeNameAttr + " class='" + rtlClass + "'>";
            treeHtml += "<style></style>";
            treeHtml += "<ul>";
            // treeHtml += "<div data-dragable></div>"
            
            while (indexStack.length > 0) { 
                var tempStack = getLastChild();
                var isRoot = false;
                
                
                treeHtml += "<li data-id" +  mainStack[mainStack.length - 1].id + 
                    " data-value='"+ mainStack[mainStack.length - 1].id+"' >"
                if(tempStack.length > 0)
                    treeHtml += "<img data-status src='" + rtlStatusImage + "'>";
                else    
                    treeHtml += "<span data-space></span>";
                treeHtml += addCheckBox(mainStack[mainStack.length - 1].id, this.allowCheck)
                // treeHtml += addImage(mainStack[mainStack.length - 1].extraData, this.extraData);
                treeHtml += "<span data-text class='" + addImage(mainStack[mainStack.length - 1].extraData, this.extraData) + "'>"
                treeHtml += mainStack[mainStack.length - 1].name ;
                treeHtml += "</span>"
                
                    while(tempStack.length > 0){
                        
                        Array.prototype.push.apply(mainStack, tempStack);
                        tempStack = getLastChild();
                        treeHtml += "<ul><li data-id" +  mainStack[mainStack.length - 1].id +
                             " data-value='"+ mainStack[mainStack.length - 1].id+"' >";
                        if(tempStack.length > 0)
                            treeHtml += "<img data-status src='" + rtlStatusImage + "'>";
                        else    
                            treeHtml += "<span data-space></span>";
                        treeHtml += addCheckBox(mainStack[mainStack.length - 1].id, this.allowCheck)   
                        // treeHtml += addImage(mainStack[mainStack.length - 1].extraData, this.extraData);
                        treeHtml += "<span data-text  class='" + addImage(mainStack[mainStack.length - 1].extraData, this.extraData) + "'>"                     
                        treeHtml += mainStack[mainStack.length - 1].name ;   
                        treeHtml += "</span>"         
                        
                        indexStack.push({id: mainStack[mainStack.length - 1].id, index: mainStack.length - 1});
                        isRoot = true;
                    }               
                    
                    // if(mainStack.length > 0)
                    //     treeHtml += "<li data-id" +  mainStack[mainStack.length - 1].id + " >" + mainStack[mainStack.length - 1].name + "</li>" ;
                        indexStack.pop();
                        mainStack.pop();
                
                    while(indexStack.length > 0 && mainStack[mainStack.length - 1].id == indexStack[indexStack.length - 1].id){
                        indexStack.pop();
                        mainStack.pop();                
                        treeHtml += "</li></ul>" ; 
                    }  
                    
                    // if(!isRoot){
                    //     if(mainStack.length > 0)
                    //     treeHtml += "<li data-id" +  mainStack[mainStack.length - 1].id + " >" + mainStack[mainStack.length - 1].name + "</li>" ;
                    //     isRoot = false;
                    // }
                if(mainStack.length > 0)
                        indexStack.push({id: mainStack[mainStack.length - 1].id, index: mainStack.length - 1});
            }
            
            target.html(treeHtml);
            applyImages(this.extraData)
            
            $(function(){
                this.extraData = [{default: imgLi}];
                $("body div[" + treeNameAttr +"] li ul").hide();
            
                $(document).on("click", "div[" + treeNameAttr +"] li img[data-status]", function(event){
                    openNode($(this), rtlStatusImage);
                    // var liParent =  $(this).parent();
                    // var childUlElements = liParent.children("ul");
                    // 
                    // if(childUlElements){
                    //     if(liParent.hasClass("open")){
                    //         liParent.removeClass("open");                
                    //         childUlElements.hide();
                    //         $(this).prop("src", rtlStatusImage)
                    //     }
                    //     else{
                    //         liParent.addClass("open");
                    //         childUlElements.show();
                    //         $(this).prop("src", imgDown)
                    //     }
                    // }
                    event.stopImmediatePropagation()                
                }) 
                
                $(document).on("click", "div[" + treeNameAttr +"] li span[data-text]", function(){
                    if($(this).hasClass("active")){                        
                        $(this).removeClass("active");
                        if(triggers["unSelect"] != null)
                            triggers["unSelect"]($(this).closest("li").attr("data-value"));
                    }
                    else{
                        if(!multiSelect)
                            $("body div[" + treeNameAttr +"] li > span[data-text]").removeClass("active");
                        $(this).addClass("active");
                        if(triggers["select"] != null)
                            triggers["select"]($(this).closest("li").attr("data-value"));
                    }
                    
                    
                }) 
                
                $(document).on("dblclick", "div[" + treeNameAttr +"] li span[data-text]", function(){           
                    if(allowEdit){
                        $(this).removeClass("active");
                        $(this).html("<input type='text' value='" + $(this).text() + 
                            "' data-old-value='" + $(this).text() + "' ><button type='button' data-name='btnConfirm' style=''></button>"); 
                        $(this).find("input[type='text']").select().focus();                       
                    }
                })
                
                $(document).on("click", "div[" + treeNameAttr +"] li button[data-name='btnConfirm']", function(e){
                    e.stopImmediatePropagation();
                    var oldName = $(this).parent().children("input[type='text']").attr("data-old-value");
                    var id = $(this).closest("li").attr("data-value");
                    var newName = $(this).parent().children("input[type='text']").val();
                                                          
                    $(this).parent().html($(this).parent().children("input[type='text']").val());
                    if(triggers["rename"] != null)
                            triggers["rename"](id, newName, oldName);
                })
                
                $(document).on("click", function(){                    
                    $("div[" + treeNameAttr +"] li span[data-text] input[type='text']").parent().
                        html($("div[" + treeNameAttr +"] li span[data-text] input[type='text']").attr("data-old-value"));
                })
                
                $(document).on("click", "li input[type='text']", function(e){
                    e.stopImmediatePropagation();   
                    $(this).select().focus();
                })
                
                if(allowMoveItem){
                    var drag = null;
                    var oldParent = null;
                    var drop = null;  
                    
                    $(document).on("mousedown", "div[" + treeNameAttr +"] li span[data-text]", function(e){
                        $(this).attr("draggable", "true");  
                        drag = drop = null;                 
                    })
                    
                    $(document).on("mouseup", "div[" + treeNameAttr +"] li span[data-text]", function(e){
                        $(this).attr("draggable", "false");
                        // drag = drop = null;                   
                    })
                    
                    $(document).on("dragover", "div[" + treeNameAttr +"] li span[data-text]", function(e){
                        e.preventDefault();
                    });
                    
                    $(document).on("dragstart", "div[" + treeNameAttr +"] li span[data-text]", function(e){
                        if(drag == null){
                            drag = $(this).parent("li");
                            if(drag.parents("li").length > 0)
                                oldParent =drag.parent().closest("li").attr("data-value");
                            else
                                oldParent = null;
                        }
                        e.originalEvent.dataTransfer.setData("Text",e.target.id);
                    });
                    $(document).on("drop", "div[" + treeNameAttr +"] li span", function(e){                    
                        if(drop == null){
                                // var dragParent;
                                // if(drag.parent("ul").find("li").length > 1)
                                //     dragParent = drag.parent("ul");
                            drop = $(this).parent("li");
                            if(drag.find("li[data-value='" + drop.attr("data-value") + "']").length == 0 ){
                                if(drop.children("ul").length > 0){
                                    // drop.children("ul").append(drag);                        
                                    drag.detach().appendTo(drop.find("ul")[0]);
                                    drop.addClass("open");
                                }
                                else{
                                    // drop.detach().append($("<ul>" + drag.html() + "</ul>"));                            
                                    $("<img data-status src='" + imgDown + "'>").prependTo(drop);
                                    $("<ul></ul>").appendTo(drop);
                                    drag.detach().appendTo(drop.find("ul")[0]);
                                }
                                // if(dragParent)
                                //     dragParent.remove(); 
                                $("div[" + treeNameAttr +"] ul:empty").parent("li").find("img[data-status]")
                                    .replaceWith("<span data-space></span>");
                                // $("div[" + treeNameAttr +"] ul:empty").closest("li:not(:has(span[data-space]))");                       
                                $("div[" + treeNameAttr +"] ul:empty").remove();
                                
                                $("div[" + treeNameAttr +"] li img[data-status]").parent("li").children("span[data-space]").remove();
                                
                                if(triggers["move"] != null)
                                    triggers["move"](drag.attr("data-value"), drop.attr("data-value"), oldParent);
                            }
                        }                    
                    });
                }
            })
    }  
    
    function getLastChild(){   
                return treeData.filter(function(value){
                    return (value.parentId == mainStack[mainStack.length - 1].id);
                });
            }
            
    function addImage(extraValue, extraData){
        var defaultIndex = -1;
        if(extraData.length > 0){   
            for(var i = 0; i < extraData.length; i++){
                if(extraData[i]["" + extraValue + ""])
                return "extraData" + Object.keys(extraData[i])[0];
                    // return "<span data-li-img class='extraData" + Object.keys(extraData[i])[0] + "' ></span>";
                    // return  "<img data-li-img src='" + extraData[i]["" + extraValue + ""] + "' />";
                if(extraData[i]["default"])
                    defaultIndex = i;
            }                                                    
                            
            if(defaultIndex > -1)
            return "extraDataDefault";
                // return "<span style='padding-right: 20px; padding-top: 20px; background-size:100% 100%; ' data-li-img class='extraDataDefault' ></span>";
                    // return  "<img data-li-img src='" + extraData[defaultIndex]["default"] + "' />";                            
            return "";
        }
    }
    
    function addCheckBox(id, allowCheckBox){
        if(allowCheckBox)
            return "<input type='checkbox' name='treeCheck' value='" + id + "'  />"
        return "";
    }  
    
    function applyImages(extraData){
        
        $.each(extraData, function(i, v){
            $("div[" + treeNameAttr +"] style").append("div[" + treeNameAttr +"] .extraData" + Object.keys(v)[0] + "{" + "background-image: url(" + v[Object.keys(v)[0]] + ")}");
                // $("li span[data-text].extraData" + Object.keys(v)[0]).css({"background-image": "url(" + v[Object.keys(v)[0]] + ")"});
        })
        //if(Object.keys(extraData[extraData.length - 1] == "default" ) var a = 2;
            //$(".extraDataDefault").css({"background-image" : extraData["default"]});
    }
    
    function openNode(currentNode, rtlStatusImage){
        var liParent =  currentNode.parent();
        var childUlElements = liParent.children("ul");
        
        if(childUlElements){
            if(liParent.hasClass("open")){
                liParent.removeClass("open");                
                childUlElements.hide();
                currentNode.prop("src", rtlStatusImage)
            }
            else{
                liParent.addClass("open");
                childUlElements.show();
                currentNode.prop("src", imgDown)
            }
        }
    }
    
    function openAllNode(currentNode){        
        var liParent = currentNode.parent();
        var childUlElements = liParent.children("ul");
        liParent.addClass("open");
        childUlElements.show();
        currentNode.prop("src", imgDown);
    }
    

}





