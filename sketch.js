var cities = [];
var edges = [];
var distanceMatrix = [];

var myTimerSoltuion;

function setup() {
    h1 = createElement("h1","Visualization of TSP with Dynamic programming");
    h1.style('text-align:center');
    
    var p1 = createP("Please enter the number of seeds in below provided box. This seeds are generated randomly.");
    
    createP("");
    
    input1 = createInput();
    
    buttonGo = createButton("Plot Random Cities");
    
    createP("");
    
    createCanvas(600,500);

    createP("");
    
    buttonStart = createButton("Start");
    createP("");
    //buttonNext = createButton("Next");

    buttonGo.mousePressed(buttonPlotRandomSeeds);
   // buttonNext.mousePressed(buttonNextTSP);
    buttonStart.mousePressed(buttonStartTSP);
    frameRate(200);
}

function draw() {
    
    background(200);
    
    for(var i=0; i < edges.length;i++){
        edges[i].displayEdge();
    }
    console.log("Hi");
    noLoop();
}

function buttonPlotRandomSeeds() {
    seeds = input1.value();
    cities = [];
    edges = [];
    distanceMatrix = [];
    
    for(var i=0; i<seeds; i++){
        cities[i] = new city(floor(random(0,width-20)),floor(random(0,height-20)),i+1);
    }
    
    for(var i=0; i<cities.length;i++){
        distanceMatrix[i] = [];
        for(var j=0;j<cities.length;j++){
            if(i!=j){
                distanceMatrix[i][j] = cities[i].distance(cities[j]);
                edges.push(new edge(cities[i],cities[j],'#f00'));
            }
            else{
                distanceMatrix[i][j] = 0;
            }
        }
    }
    console.log(distanceMatrix);
    loop();
}


function buttonStartTSP() {
    
    var startCity = cities[0];
    var setOfCities = [];
    
    for(var i=1 ; i<cities.length; i++){
        setOfCities[i-1] = cities[i];
    }
    
    for(var i=0; i<edges.length; i++){
        edges[i].show = false;
    }
    redraw();
    
    var finalSolution = TSP(startCity, setOfCities, cities);
    var finalpath = finalSolution.path;

    for(var i=0; i<edges.length; i++){
        edges[i].show = false;
    }
    redraw();
    
    for(var a=0; a<finalpath.length; a++){
        var city1,city2;
        if( (a+1) < finalpath.length){
            city1 = cities[finalpath[a]-1];
            city2 = cities[finalpath[a+1]-1];
            var ans = findEdgeIndex(city1,city2);
            for(var index=0;index<ans.length; index++){
                edges[ans[index]].show = true;
                edges[ans[index]].color = '#0f0';
            }               
        }
        else{
            city1 = cities[finalpath[a]-1];
            city2 = cities[finalpath[0]-1];
            var ans = findEdgeIndex(city1,city2);
            for(var index=0;index<ans.length; index++){
                edges[ans[index]].show = true;
                edges[ans[index]].color = '#0f0';
            }
        }
    }
    console.log(finalSolution.minDistance);
    console.log(finalpath);
    console.log(cities);
    loop();
}

function TSP(startCity, setOfCities, cities ){
    if(setOfCities.length == 1){
        var subProblemSolutionToRoot;
        var pathToRoot;
        var temp1 = startCity.distance(setOfCities[0]);
        var temp2 = setOfCities[0].distance(cities[0]);
        pathToRoot = new Array(startCity.name,setOfCities[0].name,cities[0].name);
        subProblemSolutionToRoot = new SubProblemSolution(temp1+temp2,pathToRoot);
        return (subProblemSolutionToRoot);
    }
    else{
        var subProblemSolution;
        var currentDistances = [];
        var currentMin = 500000;
        var path =  [];
        for(var i=0; i<setOfCities.length; i++){
            var newStartCity = setOfCities[i];
            var newSetOfCities = [];
            for(var j=0;j<setOfCities.length; j++){
                if(i!=j){
                    append(newSetOfCities,setOfCities[j]);
                }
            }
            var temp3 = TSP(newStartCity,newSetOfCities,cities);
            var temp4 = startCity.distance(newStartCity);
            var tempDistance = temp3.minDistance+temp4;
            if(currentMin > tempDistance){
                path = [];
                currentMin = tempDistance;
                path.push(startCity.name);
                path.push(newStartCity.name);
                for (var k=1;k< temp3.path.length;k++){
                    path.push(temp3.path[k]);
                }
            }
            append(currentDistances,temp3.minDistance+temp4);
            //console.log("Current MIN "+ currentMin+" While I = "+i);
        }
        currentDistances = sort(currentDistances);
        subProblemSolution = new SubProblemSolution(currentDistances[0],path);
        var subPath = subProblemSolution.path;
        for(var a=0; a<subPath.length; a++){   
            var city1,city2;
            if( (a+1) < subPath.length){
                city1 = cities[subPath[a]-1];
                city2 = cities[subPath[a+1]-1];
                var ans = findEdgeIndex(city1,city2);
                for(var index=0;index<ans.length; index++){
                    edges[ans[index]].show = true;
                    edges[ans[index]].color = '#ff0';
                    edges[ans[index]].displayEdge();
                }
                //redraw();
            }
            else{
                city1 = cities[subPath[a]-1];
                city2 = cities[subPath[0]-1];
                var ans = findEdgeIndex(city1,city2);
                for(var index=0;index<ans.length; index++){
                    edges[ans[index]].show = true;
                    edges[ans[index]].color = '#ff0';
                    edges[ans[index]].displayEdge();
                }
                //redraw();
            }
        }
        return subProblemSolution;
    }
}

function findEdgeIndex(city1,city2){
    var ans = [];
    var edgeName1 = str(city1.name) + str(city2.name);
    var edgeName2 = str(city2.name) + str(city1.name);
    for(var i=0; i<edges.length; i++){
        if(edges[i].name == edgeName1 || edges[i].name == edgeName2 ){
            ans.push(i);
        }
    }
    return ans;
}

/*function buttonNextTSP() {
    NextClicked = true;
}*/