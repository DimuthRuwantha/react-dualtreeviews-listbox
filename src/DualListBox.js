import React from 'react';
import { Row, Col, Button, Card } from 'reactstrap';
import  DynamicTree from 'react-dynamic-animated-tree';

var found = false // once you move a node make sure to set this to false again

const styles={
    margin: {
        "margin": "5px"
    },
    fixedcard: {
        "minHeight": "400px",
        "maxHeight": "400px",
        "padding": "10px",
        "overflowY": "auto"
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
            list: props.tree ? this.CloneObject(props.tree) : [], 
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
                console.log("node found", id);
                
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
        this.pushParent(array, node, path)
        path.reverse()
        return path
    }

    pushParent(array, node, path){
        
        var parent = this.findParent(array, node)
        if(parent){
            path.push(parent.id)
            this.pushParent(array, parent, path)
        }
    }

    addNode(arrayTo, node){
        // Find the parent from the destination array and add it
        // if parent not found, add to root
        let parent = this.findParent(arrayTo, node)
        if(parent){
            let existNode = parent.childNodes.find(function(element){
                return element.id === node.id
            })
            console.log(existNode)
            if(!existNode){
                console.log("node to be added", parent)              
                parent.childNodes.push(this.CloneObject(node))
            }
        }
        else{
            console.log("node not here so adding")
            arrayTo.push(this.CloneObject(node))
        }
    }
//#endregion

//#region button click events
moveToSelected = e => {
    if(this.state.selectedLeft){

       var alreadyMoved = this.state.selectedList
        var currentSelected = this.state.selected;
        var pathToNode = this.findPath(this.state.list, currentSelected)
        console.log("path", pathToNode);
        pathToNode.pop()

        pathToNode.map( n => {
            let currentNodeL = this.findNode(this.state.list, n)
            let currentNodeR = this.findNode(alreadyMoved, n)
            if(!currentNodeR){
                let tempNode = this.CloneObject(currentNodeL)
                tempNode.childNodes.length = 0
                this.addNode(alreadyMoved, tempNode)
            }
        })

        this.addNode(alreadyMoved, currentSelected)
        this.setState({
            selectedList: alreadyMoved
        })
        

       /*  var parent = this.findParent(alreadyMoved, currentSelected)
        if(parent){
            parent.childNodes.push(currentSelected)
        }
        else{
            let node = this.findNode(alreadyMoved, currentSelected.id)
            if(node){
                let originalNode = this.findNode(this.props.tree, currentSelected.id)
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
        } */
        
    }
}
   /*  moveToSelected = e => {
        if(this.state.selectedLeft){

            this.addNode(this.state.selectedList, this.state.selected)

           var alreadyMoved = this.state.selectedList
            var currentSelected = this.state.selected;
            var pathToNode = this.findPath(this.state.list, currentSelected)
            console.log("path", pathToNode);
            
            pathToNode.pop()

            //Add missing parent nodes to right
            var tempArray = alreadyMoved
            pathToNode.map( n => {
                var rNode = tempArray.find(function(element){
                    return element.id === n
                })
                if(!rNode){
                    //tempArray doesnt have the node so get it from left and add it
                    let lNode = this.findNode(this.state.list, n)
                    let cloned = this.CloneObject(lNode)
                    cloned.childNodes = []
                    tempArray.push(cloned)
                }
                else{
                    //already have so no need to add
                }
                 //goto the pushed node and find next node in childNodes
                 tempArray = tempArray.find(function(element){
                     return element.id === n
                 }).childNodes
                 return alreadyMoved
            })

            var parent = this.findParent(alreadyMoved, currentSelected)
            if(parent){
                parent.childNodes.push(currentSelected)
            }
            else{
                let node = this.findNode(alreadyMoved, currentSelected.id)
                if(node){
                    let originalNode = this.findNode(this.props.tree, currentSelected.id)
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
            this.props.onnodemoved ? this.props.onnodemoved([...alreadyMoved]) : null
        }
    }
 */
    moveToNotSelected = e => {
        if(this.state.selectedRight){
            var unmovedList = this.state.list
            var currentSelected = this.state.selected;

            var pathToNode = this.findPath(this.state.selectedList, currentSelected)
            pathToNode.pop()

            //Add missing parent nodes to right
            var tempArray = unmovedList
            pathToNode.map( n => {
                var rNode = tempArray.find(function(element){
                    return element.id === n
                })

                console.log("rNode", rNode)
                if(!rNode){
                    //tempArray doesnt have the node so get it from left and add it
                    let lNode = this.findNode(this.state.selectedList, n)
                    let cloned = this.CloneObject(lNode)
                    cloned.childNodes = []
                    tempArray.push(cloned)
                }
                else{
                    //already have so no need to add
                }
                 //goto the pushed node and find next node in childNodes
                 tempArray = tempArray.find(function(element){
                     return element.id === n
                 }).childNodes
                 return unmovedList
            })

            var parent = this.findParent(unmovedList, currentSelected)
            if(parent){
                parent.childNodes.push(currentSelected)
            }
            else{
                let node = this.findNode(unmovedList, currentSelected.id)
                if(node){
                    let originalNode = this.findNode(this.props.tree, currentSelected.id)
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
            this.props.onnodemoved ? this.props.onnodemoved([...removed]) : null
        }       
    }

    moveAllToRight = e => {
        this.setState({
          selectedList: JSON.parse(JSON.stringify(this.props.tree)),
          list: []
        });
      };
    
    movedAllToLeft = e => {
        this.setState({
            list: JSON.parse(JSON.stringify(this.props.tree)),
            selectedList: null
        });
    };
//#endregion  

//#region lifecycle methods

//#endregion
    render() {
        
        return ( 
            <div className="container">
                <Row className="margin">
                <Col md={5} > 
                    <Card style={styles.fixedcard}>
                    <DynamicTree key="root" id="root" data={this.state.list} title="Orgazations" open
                            onClick={this.handleLeftNodeClick} />                 
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
