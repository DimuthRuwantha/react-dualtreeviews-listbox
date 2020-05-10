import React from 'react';
import { Row, Col, Button, Card } from 'reactstrap';
import  DynamicTree from 'react-dynamic-animated-tree';
import DynamicDataTree from './DynamicDataTree'

var found = false // once you move a node make sure to set this to false again

const styles={
    margin: {
        "margin": "5px"
    },
    fixedcard: {
        "min-height": "400px",
        "max-height": "400px",
        "padding": "10px",
        "overflow-y": "auto"
    },
    buttonWidth: {
        "width": "50px",
        "margin": "5px"
    },
    nopadding: {
        "padding-left": "0px",
    }
}
class DualListBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.CloneObject(overview), 
            selected: null,
            selectedLeft: null,
            selectedRight: null,
            selectedList: []
         }
        this.handleLeftNodeClick = this.handleLeftNodeClick.bind(this)
        this.handleRightNodeClick = this.handleRightNodeClick.bind(this)

        this.moveToSelected = this.moveToSelected.bind(this)
        this.moveToNotSelected = this.moveToNotSelected.bind(this)

        this.moveAllToRight = this.moveAllToRight.bind(this);
        this.movedAllToLeft = this.movedAllToLeft.bind(this);
    }
//#region node click events
    handleLeftNodeClick = e => {
        console.log("left node is seleced");
            
        if(e.id !== "root")
        {
            
            this.setState({ 
                selected: e, 
                selectedLeft: e,
                selectedRight: null
            })
        }
    }

    handleRightNodeClick = e => {
        if(e.id !== "root")
        {
            this.setState({ 
                selected: e,
                selectedRight: e,
                selectedLeft: null
            })
        }
    }
//#endregion

//#region node operations
    CloneObject(object){
        var cloned = JSON.parse(JSON.stringify(object))
        return cloned
    }

    removeNode(array, node){
        var id = node.id
        
        array.forEach(element => {
          if(element.id === id){
              found = true
          }
          if(!found){
            var removedArray = this.removeNode(element.childNodes, node)
            element.childNodes = removedArray
        }
        });
        array = array.filter( n => n.id !== id)

        return array
    }

    findParent(array, node){
        var id = node.parentNode
        var foundNode = this.findNode(array, id)
        return foundNode;
    }

    findNode(array, id){
        let node;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element.id === id){
                node = element
                break
            }
            else{
                node = this.findNode(element.childNodes, id)
                if(node){
                    break
                }
            }
        }
        return node;
    }

    findPath(array, node){
        var path = []
        path.push(node.id)
        //console.log(path)
        this.pushParent(array, node, path)
        path.reverse()
        console.log("finally", path)
        return path
    }

    pushParent(array, node, path){
        
        var parent = this.findParent(array, node)
        if(parent){
            path.push(parent.id)
            //console.log(path)
            this.pushParent(array, parent, path)
        }
    }
//#endregion

//#region button click events
    moveToSelected = e => {
        if(this.state.selectedLeft){
            var alreadyMoved = this.state.selectedList
            var currentSelected = this.state.selected;
            var pathToNode = this.findPath(this.state.list, currentSelected)
            pathToNode.pop()

            //Add missing parent nodes to right
            var tempArray = alreadyMoved
            console.log("init tempArray", tempArray)
            pathToNode.map( n => {
                var rNode = tempArray.find(function(element){
                    return element.id === n
                })

                console.log("rNode", rNode)
                if(!rNode){
                    //tempArray doesnt have the node so get it from left and add it
                    let lNode = this.findNode(this.state.list, n)
                    console.log("node from right", lNode)
                    let cloned = this.CloneObject(lNode)
                    cloned.childNodes = []
                    console.log("clonde", cloned.childNodes)
                    tempArray.push(cloned)
                    console.log("new tempArray", tempArray)
                   
                }
                else{
                    //already have so no need to add
                }
                 //goto the pushed node and find next node in childNodes
                 tempArray = tempArray.find(function(element){
                     return element.id === n
                 }).childNodes
                 console.log("updated tempArray", tempArray)
                 return alreadyMoved
            })

            var parent = this.findParent(alreadyMoved, currentSelected)
            if(parent){
                console.log("parent", parent)
                parent.childNodes.push(currentSelected)
                console.log("child", parent.childNodes)
            }
            else{
                let node = this.findNode(alreadyMoved, currentSelected.id)
                if(node){
                    let originalNode = this.findNode(overview, currentSelected.id)
                    let clone = this.CloneObject(originalNode)
                    node.childNodes = clone.childNodes
                }
                else{
                    alreadyMoved.push(currentSelected)
                }              
            }

            var removed = this.removeNode(this.state.list, currentSelected)
            found = false

            // if parent is empty clean up
            var selectedParent = this.findParent(this.state.list,currentSelected)

            if( selectedParent && selectedParent.childNodes.length === 0){
                removed = this.removeNode(this.state.list, selectedParent)
                found = false
                let root = this.findParent(this.state.list, selectedParent)
                if(root && root.childNodes.length === 0){
                    removed = this.removeNode(this.state.list, root)
                    found = false
                }
            }
            
            this.setState({
                selected: null,
                list: removed
            })
        }
    }

    moveToNotSelected = e => {
        if(this.state.selectedRight){
            var unmovedList = this.state.list
            var currentSelected = this.state.selected;

            var pathToNode = this.findPath(this.state.selectedList, currentSelected)
            pathToNode.pop()

            //Add missing parent nodes to right
            var tempArray = unmovedList
            console.log("init tempArray", tempArray)
            pathToNode.map( n => {
                var rNode = tempArray.find(function(element){
                    return element.id === n
                })

                console.log("rNode", rNode)
                if(!rNode){
                    //tempArray doesnt have the node so get it from left and add it
                    let lNode = this.findNode(this.state.selectedList, n)
                    console.log("node from right", lNode)
                    let cloned = this.CloneObject(lNode)
                    cloned.childNodes = []
                    console.log("clonde", cloned.childNodes)
                    tempArray.push(cloned)
                    console.log("new tempArray", tempArray)
                   
                }
                else{
                    //already have so no need to add
                }
                 //goto the pushed node and find next node in childNodes
                 tempArray = tempArray.find(function(element){
                     return element.id === n
                 }).childNodes
                 console.log("updated tempArray", tempArray)
                 return unmovedList
            })

            var parent = this.findParent(unmovedList, currentSelected)
            if(parent){
                console.log("parent", parent)
                parent.childNodes.push(currentSelected)
                console.log("child", parent.childNodes)
            }
            else{
                let node = this.findNode(unmovedList, currentSelected.id)
                if(node){
                    let originalNode = this.findNode(overview, currentSelected.id)
                    let clone = this.CloneObject(originalNode)
                    node.childNodes = clone.childNodes
                }
                else{
                    unmovedList.push(currentSelected)
                }
            }

            var removed = this.removeNode(this.state.selectedList, currentSelected)
            found = false
            // if parent is empty clean up
            var selectedParent = this.findParent(removed,currentSelected)
            if( selectedParent && selectedParent.childNodes.length === 0){
                removed = this.removeNode(removed, selectedParent)
                found = false
                let root = this.findParent(this.state.selectedList, selectedParent)
                if(root && root.childNodes.length === 0){
                    removed = this.removeNode(this.state.selectedList, root)
                    found = false
                }
            }

            this.setState({
                selected: null,
                selectedList: removed
            })
        }       
    }

    moveAllToRight = e => {
        console.log(overview);
        this.setState({
          selectedList: JSON.parse(JSON.stringify(overview)),
          list: []
        });
      };
    
    movedAllToLeft = e => {
        console.log(this.state.selectedList)
    this.setState({
        list: JSON.parse(JSON.stringify(overview)),
        selectedList: []
    });
    };
//#endregion  

    render() {
        return ( 
            <div className="container">
                <Row className="margin">
                <Col md={5} > 
                    <Card style={styles.fixedcard}>
                    <DynamicTree key="root" id="root" data={this.state.list} title="Orgazations" open
                            onClick={this.handleLeftNodeClick} isActive={this.state.selectedLeft} />                 
                    </Card>
                  
                </Col>
                <Col md={1} className="align-self-center nopadding">
                        <div className="text-center">
                        <Button style={styles.buttonWidth} onClick={this.moveToSelected} > &gt; </Button>
                        <Button style={styles.buttonWidth} onClick={this.moveAllToRight} > &gt;&gt; </Button>
                        <Button style={styles.buttonWidth} onClick={this.moveToNotSelected}> &lt;</Button>
                        <Button style={styles.buttonWidth} onClick={this.movedAllToLeft}> &lt;&lt; </Button>
                        </div>
                        
                </Col>
                <Col md={5}>
                    <Card style={styles.fixedcard}>
                    <DynamicTree id="root" key="root" data={this.state.selectedList} title="Selected nodes"
                        onClick={this.handleRightNodeClick} />
                    </Card>                    
                </Col>

                </Row>
            </div>
            
         );
    }
}
 
export default DualListBox;


var overview = [{
    "parentNode": null,
    "title": "Department One",
    "id": "25",
    "childNodes": [{
        "parentNode": "25",
        "title": "Section 1",
        "id": "251",
        "childNodes": [{
            "parentNode": "251",
            "title": "Ward 1",
            "id": "2511",
            "childNodes": [],
        }]       
    },
    {
        "parentNode": "25",
        "title": "Section 2",
        "id": "252",
        "childNodes": [{
            "parentNode": "252",
            "childNodes": [],
            "title": "Ward 1",
            "id": "2521"
        }],
    },{
        "parentNode": "25",
        "title": "Section 3",
        "id": "253",
        "childNodes": [{
            "parentNode": "253",
            "childNodes": [],
            "title": "Ward 1",
            "id": "2531"
        }],
    }],
}, {
    "parentNode": null,
    "title": "Department Two",
    "id": "26",
    "childNodes": [{
        "parentNode": "26",
        "title": "Section 3",
        "id": "261",
        "childNodes": [{
            "title": "Ward 1",
            "id": "2612",
            "parentNode": "261",
            "childNodes": [],          
        }],
    },
    {
        "parentNode": "26",
        "title": "OPD 2",
        "id": "262",
        "childNodes": [],
    }],
},
{
    "parentNode": null,
    "title": "OPD 1",
    "id": "27",
    "childNodes": [],
}]