function city (x, y,name)
{
    //var xCoordinate;
    //var yCoordinate;
    //var color;
    this.name = name; 
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.parent;
    
    this.displayCity = function() {
        noStroke();
        fill(0);
        ellipse(this.xCoordinate,this.yCoordinate,10,10);
        fill(255,0,0);
        textAlign(CENTER,CENTER);
        textStyle(BOLD)
        text(this.name, this.xCoordinate, this.yCoordinate);
    }
    this.displayCityWithColor = function(color) {
        noStroke();
        fill(color);
        ellipse(this.xCoordinate,this.yCoordinate,10,10);
        fill(255,0,0);
        textAlign(CENTER,CENTER);
        textStyle(BOLD)
        text(this.name, this.xCoordinate, this.yCoordinate);
    }

    this.equals = function(other) {
        if(this.xCoordinate == other.xCoordinate && this.yCoordinate == other.yCoordinate)
            return true;
        else
            return false;
        
    }
    
    this.distance = function(other) {
        tempDistance = floor(dist(this.xCoordinate,this.yCoordinate,other.xCoordinate,other.yCoordinate));
        return tempDistance;
    }
}