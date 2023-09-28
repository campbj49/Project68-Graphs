class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let vertex of vertexArray)
      this.nodes.add(vertex);
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let adjacent of vertex.adjacent)
      adjacent.adjacent.delete(vertex);
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    //start by making a set for tracking which nodes have been visited
    let visited = new Set();
    let res = [];
    //recurse through whole graph
    function _depthFirstSearch(node){
      //update the external lists
      res.push(node.value);
      visited.add(node);
      //iterate through all the adjacent nodes
      for(let adjacent of node.adjacent)
        if(!visited.has(adjacent)) _depthFirstSearch(adjacent)
    }
    
    _depthFirstSearch(start);
    return res;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let visited = new Set();
    let res = [];
    //use the same algorithm for bfsing a bst
    function _breadthFirstSearch(ring){
      let newRing = [];
      for(let parent of ring){
        res.push(parent.value);
        for(let adjacent of parent.adjacent)
          if(!visited.has(adjacent)) {
            visited.add(adjacent);
            newRing.push(adjacent);
          }
      }
      if(newRing.length != 0 ) _breadthFirstSearch(newRing);
    }
    visited.add(start);
    _breadthFirstSearch([start])

    return res;

  }
}

module.exports = {Graph, Node}