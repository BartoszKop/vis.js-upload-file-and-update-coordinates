// Vis.js config and File Reader (parser)

// Vis.js config

var _nodes = new vis.DataSet();
var _edges = new vis.DataSet();

var container = document.getElementById('mynetwork');

var options = {
  autoResize: true,
  clickToUse: false,
  edges: {
    smooth: false
  },
  physics: false
};
      $(document).ready(function(){
          $("#Storage_Cleaner").on("click", function(){
			  localStorage.clear();
              });
              });
	//Take data from local storage
	var retrievedData = JSON.parse(localStorage.getItem("data_temp"));
	console.log(retrievedData)
	if (retrievedData != null) {
	//Use to load Network from local storage
    var Network = retrievedData;
    _nodes.add(Network.nodes);
    _edges.add(Network.edges);
    var nodes = Network.nodes;
    var edges = Network.edges;
    var new_nodes = Network.nodes;
    var data = {
      nodes: _nodes,
      edges: _edges,
    };
    var network = new vis.Network(container, data, options);
// File Reader (parser)
}
      $(document).ready(function(){
          $("#updater").on("click", function(){
			  if (retrievedData == null) {
			  alert("ERROR No data to save!");
			  }else {
				alert("Network Saved");
			}
                  // track coordinates
            function addId(elem, index) {
                      elem.id = index;
                  }

                  function addContextualInformation(elem, index, array) {
                      addId(elem, index);
                  }

                  function addConnections(elem, index) {
                      // need to replace this with a tree of the network, then get child direct children of the element
                      elem.connections = network.getConnectedNodes(index);
                  }

                    var nodes = objectToArray(network.getPositions());
                    nodes.forEach(addContextualInformation);

                    // pretty print node data
                    var exportValue = JSON.stringify(nodes, undefined, 2);
                    // console.log(exportValue)
    				var updateJson = JSON.stringify(nodes); //convert to JSON string
    				// console.log(updateJson)
    				for (i = 0; i < nodes.length; i++) {
    				var node0updatex = nodes[i].x
    				var node0updatey = nodes[i].y
    				//such programming much skill wow
    				var node0updatex = String(node0updatex)
    				var node0updatey = String(node0updatey)
    				// Replaces Node X and Y
    				var myID = i;
    				$.each(new_nodes, function(i,v) {
    					if ( v.id == myID ) {
    						v.x = node0updatex
    						v.y = node0updatey
    						return false;
    					}
    				});
    				}
    				console.log(new_nodes)
    				// Replace nodes to new_nodes and save json
    					var data = {
    					nodes: new_nodes,
    					edges: edges
    					};
              console.log(data)
              // Use local storage to save Network
			  localStorage.clear();
              localStorage.setItem('data_temp', JSON.stringify(data));
              // Download updated JSON
              var json = JSON.stringify(data);
              // Use blob for big Networks
              var blob = new Blob([json], {type: "application/json"});
              var url  = URL.createObjectURL(blob);

              var a = document.createElement('a');
              a.download    = "Network.json";
              a.href        = url;
              a.textContent = "Download Network.json";
              container.appendChild(a);
  						// replace and append again after update
  						document.getElementById('content').innerHTML = "";
  						document.getElementById('content').appendChild(a);
                function objectToArray(obj) {
                    return Object.keys(obj).map(function (key) { return obj[key]; });
                }
              });
              });
function loadFile(receivedText) {
      //Clear Network to load new one without buttons
  _nodes.clear();
  _edges.clear();


  var input, file, fr;

  if (typeof window.FileReader !== 'function') {
    alert("The file API isn't supported on this browser yet.");
    return;
  }

  input = document.getElementById('fileinput');
  if (!input) {
    alert("Um, couldn't find the fileinput element.");
  }
  else if (!input.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
  }
  else if (!input.files[0]) {
    alert("Please select a file before clicking 'Load'");
  }
  else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }

  function receivedText(e, exportNetwork) {
    lines = e.target.result;
    var Network = JSON.parse(lines);
    _nodes.add(Network.nodes);
    _edges.add(Network.edges);
    var nodes = Network.nodes;
    var edges = Network.edges;
    var data = {
      nodes: _nodes,
      edges: _edges,
    };
    var network = new vis.Network(container, data, options);
    console.log(edges)
    // So this is callback??!
	   					var data = {
    					nodes: nodes,
    					edges: edges
    					};
              console.log(data)
              // Use local storage to save Network
			  localStorage.clear();
              localStorage.setItem('data_temp', JSON.stringify(data));
      // dirty reload hack
	  location.reload();
  }
}
