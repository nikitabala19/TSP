function edge(vertex1, vertex2, color){
    this.name = str(vertex1.name)+str(vertex2.name);
    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
    this.show = true;
    this.color = color;
    
    this.displayEdge = function(){
        smooth();
        if(this.show == true){ 
            stroke(this.color);
            strokeWeight(2);
            line(this.vertex1.xCoordinate,this.vertex1.yCoordinate,this.vertex2.xCoordinate,this.vertex2.yCoordinate);
            
            noStroke();
            fill(255);
            ellipse(this.vertex1.xCoordinate,this.vertex1.yCoordinate,16,16);
            ellipse(this.vertex2.xCoordinate,this.vertex2.yCoordinate,16,16);
            fill(255,0,0);
            textAlign(CENTER,CENTER);
            textStyle(BOLD)
            text(this.vertex1.name, this.vertex1.xCoordinate, this.vertex1.yCoordinate);
            fill(255,0,0);
            textAlign(CENTER,CENTER);
            textStyle(BOLD)
            text(this.vertex2.name, this.vertex2.xCoordinate, this.vertex2.yCoordinate);
            
            /*noStroke();
            textSize(20);
            fill(50, 55, 100);
            text(this.vertex1.name,this.vertex1.xCoordinate-10,this.vertex1.yCoordinate-10);
            text(this.vertex2.name,this.vertex2.xCoordinate-10,this.vertex2.yCoordinate-10);*/
        }
    }
    
    this.isEqualNode = function(other){
        
    }
}