# js-Simple-Tree
A simple tree for java script include Append, Edit, Delete, Drag&amp;Drop, Rename and their events, ...

# Get start

## Required scripts and css file
####    This tree uses jquery library, tree.js and tree.css: 
     <script src="jquery.min.js" ></script>
     <script src="tree.js" ></script>
     <link rel="stylesheet" type="text/css" href="tree.css" />

## Build tree
### To build tree you should use this two method:
        var myTree = new Tree("myTree", treeData, $("#myTree"));
        myTree.buildTree();
You need to create a `Tree` object which takes Tree_name, Tree_Data and Tree_target. Then call buildTree method of it. This two statements are enough to make tree. 

## Tree data
Data source for tree use a list of object that has 4 fields named `id`, `name`, `parentId`, `extraData`. There's no need to create a nested child object.
example: 

    var TreeClass = function(id, name, parentId, extraData){
        this.id= id;
        this.name = name;
        this.parentId = parentId;
        this.extraData = extraData;
    }
    var treeData = [];
    treeData.push(new TreeClass(1, 'item 1', null, 1))
    treeData.push(new TreeClass(2, 'item 2', null,2 ))
    treeData.push(new TreeClass(3, 'item 3', null, 3))
    treeData.push(new TreeClass(4, 'item 4', 1, 1))
    treeData.push(new TreeClass(5, 'item 5', 1, 2))
    treeData.push(new TreeClass(6, 'item 6', 5,3 ))
    treeData.push(new TreeClass(7, 'item 7', 2, 2 ))
    treeData.push(new TreeClass(8, 'item 8', 2, 1))
    treeData.push(new TreeClass(9, 'item 9', 3, 1))
    treeData.push(new TreeClass(10, 'item 10', 3, 2))
    treeData.push(new TreeClass(11, 'item 11', 10, 1))
    treeData.push(new TreeClass(12, 'item 12', 11, 1))
    treeData.push(new TreeClass(13, 'item 13', 11, 2))
    
In this model, extraDate is somethng like category or type that can use for setting image to nodes. This field will have key and value that key is category and value is an image source(contain path or base64 image). example: 

    myTree.extraData = [{"1": base64Image1},
        {"2": base64Image2},
        {"default": "images/defaultItem.png"}];

## Tree common methods
There are some common method to work with tree that are listed:
### append
To append new item to tree you can use this method with this syntax:

     myTree.append(Id, Name, ParentId, extraData)
     
### remove
To remove an item from tree use this method with this syntax:
    myTree.remove(id)

### getCheckedValues
This method return an array of checked values with this syntax: 
    myTree.getCheckedValues()
