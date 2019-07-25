/** 
 *   -------- CONTROLS -------
 * [UP][DOWN] -> move forwards/backwards
 * [LEFT][RIGHT] -> rotate view
 * [space] -> change viewing angle
*/



var input=[];
void keyPressed(){input[keyCode] = true;}
void keyReleased(){input[keyCode] = false;}

setup = function() {
    
    size(500,500);
    /********* Global Vars ********/
    /**       CHANGE THESE       **/
    var pSize = 3; // [lower = more lag]
    var pHigh = 30;// [lower = less lag]
    var viewDist = 400;//[dont change this unless you have a good computer]
    var PerWF = 5;//perspective warp factor [1000 for no warp]
    
    
    noStroke();
    background(255,255,255);

    loadPixels();//get the white background
    var px=this.imageData.data,bpx;//pixel array & blank pixel array
    
    var z2 = 0,x2=0;//player cords
    var velo = 0,//movement velocity
        rotVelo = 0,rot = 100;//rotation
    var va = 0,vat = 0;//viewing angle & viewing angle timer
    
   
    this.draw = function() {
        if (!bpx) { bpx=px.slice(0); }//sets the blank array 
        px.set(bpx);//clears pixels data
        
        va = sin(vat/180)*300;//sets viewing angle
        
        // controls    
        if(input[RIGHT]){rotVelo-=1/180;}    
        if(input[LEFT]){rotVelo+=1/180;}
        if(input[UP]){velo-=2;}
        if(input[DOWN]){velo+=2;}
        if(input[32]){vat+=1;}
        
        //moves player
        z2 -=(velo*sin(rot))/300;
        x2 -=(velo*cos(rot))/300;
    
        //slows velocity
        velo = constrain(velo*0.95,-50,50);
        rotVelo = constrain(rotVelo*0.95,-3,3);
        
        rot+=rotVelo;//update rotation
        
        //cos/sin rotation
        var cr=cos(rot),sr=sin(rot);
        
        //set vars outside of loop (saves mem)
        var lb=0,rb=0,l=0,mx=0,my=0,c=0,s=0;
        
        //loop through z
        for(var z=500;z>-viewDist;z-=pSize){
            
            var s2 = map(z,-viewDist,500,pSize+1,pSize*2);//width of the point
            
            //mapped y value (viewing angle adjustments)
            my=map(z,-viewDist,500,va,500);
            
            //adjusted y for the noise function
            var Y = (350-z)/200;
            
            //loop through x    
            for(var x=20;x<480;x+=pSize){
            
            
                //adjusted x for the noise function
                var X = (300-x)/200;
                
                //height of the point
                /* 
                    adjusts the point based on rotation and user cords
                    then gets a noise value for point and adjusts it
                */
                s = map(noise(z2+(X*cr+Y*sr),x2+(Y*cr-X*sr)),-1,1,-500,300);
            
                //mapped x value (Perspective warp)
                mx=map(x,0,500,0-PerWF/10,500+PerWF/10);
                
                //color of the point (based on height)
                c=map(s,0,300,0,255);
            
                var y = ~~(my+s)-40;//y cord of the point
                
                l |= 0;//index
                rb |= 0;//right bound
                lb |= 0;//left bount
                
                //sets bounds
                rb = ~~(mx + s2);
                if (rb > 500) {rb = 500;}
                lb = ~~mx;
                if (lb < 0) {lb = 0;}
      
          
                for (var k = lb; k < rb; k++) {
                    var _y = 0;
                    l = k + y * 500 << 2;//get index of pixel
                    while (_y < pHigh) {//draws a col 20 pixels high
                    
                        // stop drawing col if non white pixel is found
                        if ( px[l + 1] !== 255) {
                            _y = 100;
                        } else {
                            px[l] = c;
                            px[l + 1] = c;
                            px[l + 2] = c;
                        }
                        _y++;
                        l += 2000;//move down 1 pixel
                    }
                }
                
            }
        }
        updatePixels();//update the canvas with the pixel data
        
        fill(255, 0, 0);
    text(~~this.__frameRate, 10, 10);
    };
};
setup();
