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
        "overflowY": "auto",
        "background": "white",
        "color": "White"
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
        if(object){
            var cloned = JSON.parse(JSON.stringify(object))
            return cloned
        }
        return null        
    }

    removeNode(array, node){
        let removeFrom = array
        if(node.parentNode){
            parent = this.findParent(removeFrom, node)
            if(parent){
                let newChildNodes = parent.childNodes.filter( n => {
                    return n.id !== node.id
                })
                console.log(newChildNodes)
                if(newChildNodes.length === 0){
                    //remove parent too
                    removeFrom = this.removeNode(removeFrom, parent)
                }
                else{
                    parent.childNodes.length = 0
                    parent.childNodes.push(...newChildNodes)
                }            
            }
        }
        else{
            //perhaps parent is root
            removeFrom = array.filter( n => {
                return n.id !== node.id
            })
        }
        return removeFrom
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
        // if node in destination array, just skip it
        // Find the parent from the destination array and add it
        // if parent not found, add to root
        let nodeFound = this.findNode(arrayTo, node.id)
        if(nodeFound){
            
        }
        else{
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

            let currentNodeR = this.findNode(alreadyMoved, currentSelected.id)
            if(currentNodeR){
                //if selected node is in rhs, just add all the remoainging childrren
                let currentNodeL = this.findNode(this.state.list, currentSelected.id)
                currentNodeL.childNodes.map( n => {
                    this.addNode(alreadyMoved, n)
                })
            }
            else{
                this.addNode(alreadyMoved, currentSelected)
            }
            let leftArray = this.removeNode(this.state.list, currentSelected)
            this.setState({
                list: leftArray,
                selectedList: alreadyMoved
            })
            this.props.onnodemoved ? this.props.onnodemoved([...alreadyMoved]) : null
        }
    }
 
    moveToNotSelected(){
        if(this.state.selectedRight){
            var leftArray = this.state.list
            var alreadyMoved = this.state.selectedList
            var currentSelected = this.state.selected;
            var pathToNode = this.findPath(alreadyMoved, currentSelected)
            pathToNode.pop()

            pathToNode.map( n => {
                let currentNodeL = this.findNode(this.state.list, n)
                let currentNodeR = this.findNode(alreadyMoved, n)
                if(!currentNodeL){
                    let tempNode = this.CloneObject(currentNodeR)
                    tempNode.childNodes.length = 0
                    this.addNode(leftArray, tempNode)
                }
            })

            let currentNodeL = this.findNode(leftArray, currentSelected.id)
            if(currentNodeL){
                //if selected node is in rhs, just add all the remoainging childrren
                let currentNodeR = this.findNode(alreadyMoved, currentSelected.id)
                currentNodeR.childNodes.map( n => {
                    this.addNode(leftArray, n)
                })
            }
            else{
                this.addNode(leftArray, currentSelected)
            }
            alreadyMoved = this.removeNode(alreadyMoved, currentSelected)
            this.setState({
                list: leftArray,
                selectedList: alreadyMoved
            })
            this.props.onnodemoved ? this.props.onnodemoved([...alreadyMoved]) : null
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
            selectedList: []
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
