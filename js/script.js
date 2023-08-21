"use strict";

const getData = () => {
    const colors = ["rgba(111, 207, 151, 1)", "rgba(235, 87, 87, 1)", "rgba(242, 153, 74, 1)", "rgba(111, 207, 151, 1)", "rgba(155, 81, 224, 1)", "rgb(205 66 70)", "rgba(86, 204, 242, 1)", "rgba(33, 150, 83, 1)" ]
    var i = 0
    let arr = [];
    while( i < 100 )
    {
        const n = Math.floor(Math.random() *  (Math.random() < .85 ? 45 : 95 )) + 5
        i += n 
        if
            (i < 100) arr.push( n )
        else 
        {
            arr.push( 100 - i + n )
        }   
            
    }  
    return arr.map( ( value, i ) => [ value, Math.random()* 70 + 20, colors[i] ] ) 
    const data = [ 
        [ 10,   Math.random()* 70 + 20,   ],  
        [ 20,   Math.random()* 70 + 20,   ],
        [ 10,   Math.random()* 70 + 20,   ],
        [ 10,   Math.random()* 70 + 20,   ],  
        [ 5,    Math.random()* 70 + 20,   ],
        [ 6,    Math.random()* 70 + 20,   ],
        [ 29,   Math.random()* 70 + 20,   ],
        [ 10,   Math.random()* 70 + 20,   ], 
    ] 
    return data
}

const sectionRadius = ( value ) => {
    return value * 3.6
}
const sectionCoords = ( value, radius ) => { 
    return {   
        x:  (100 - ( Math.cos( value * Math.PI / 180 ) * radius )).toFixed(2),
        y:  (100 - ( Math.sin( value * Math.PI / 180 ) * radius )).toFixed(2)
    }
}

const click = () => {   
    document.body.innerHTML=""
    const cont      = document.createElement('div')
    const svg       = document.createElementNS("http://www.w3.org/2000/svg",'svg')
    svg.setAttribute( "viewBox", "0 0 200 200")
    svg.setAttribute( "width", "300")
    svg.setAttribute( "height", "300")
    let start = { x: 1, y: 0 }  
    let degs = 0
    getData().forEach((element, i) => {
        console.log(element, i)
        const radius = element[ 1 ]
        const newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");  
        const str = sectionCoords( sectionRadius( degs), radius  )
        const fnsh = sectionCoords( sectionRadius( degs + element[ 0 ] ), radius ) 
        const distination =  element[ 0 ] < 50 ? 0 : 1;
        const path = `M100,100 L${ str.x },${ str.y } A${radius},${radius} 0 ${distination},1 ${ fnsh.x },${ fnsh.y } Z`  
        newpath.setAttributeNS( null, "d", path);         
        newpath.setAttributeNS( null, "id", `pathIdD${ i }` );
        newpath.setAttributeNS( null, "stroke", "none" );
        newpath.setAttributeNS( null, "stroke-width", 1 );
        newpath.setAttributeNS( null, "opacity", .5 );
        newpath.setAttributeNS( null, "fill", element[ 2 ] );
        svg.appendChild(newpath);
        start = element[ 0 ]
        degs += element[ 0 ]
    });
    cont.id         = "container"
    cont.className += "container"

    cont.appendChild(svg)
    document.body.appendChild(cont)
};

window.onload = () => {
    document.addEventListener("click", click)
}