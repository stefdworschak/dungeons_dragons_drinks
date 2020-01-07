$(document).ready(function(){

    $('.bottom_panel').click(function(){
        console.log($('.dice_row').css('display') == 'none')
        const margin_top = $('.dice_row').css('display') == 'none' ? '10px' : '0px';
        $('.btn_row').slideToggle("fast");
        $('.dice_row').slideToggle("fast");        
        $('.bottom_panel').css('margin-top', margin_top);
        
    })

    $('#btn_roll').click(function(){
        const svgs = $('.dice_display').find('svg');
        svgs.each(function(index){
            const svg = $(this).parent();
            const cls = index % 2 == 0 ? 'shaking' : 'shaking2';
            console.log(index)
                svg.addClass(cls);
                setTimeout(function(){
                    svg.find('text').text('')
                    svg.removeClass(cls);
                    svg.find('text').text(randNum(1,6))
                },300)
        })
    })

    $('svg').click(function(){

            const svg = $(this).parent();
            //rotateDie($('#dice1'), 23);

            svg.addClass('shaking');
            setTimeout(function(){
                svg.find('text').text('')
                svg.removeClass('shaking');
                svg.find('text').text(randNum(1,6))
            },300)
            
        });
    
    })    

function rotateDie(die, c){
    if (c < 0) {
        die.find('text').text(randNum(1,6))
        return;
    }
   
    setTimeout(function(){
        let angle = changeAngle(die);
        $('#dice1').css('transform',`rotate(${angle}deg)`);
        c--;

        rotateDie(die, c);
    }, 15)
    
}

function changeAngle(el){

        let angle;
        //let el = $('#dice1');
        var st = window.getComputedStyle(el[0], null);
        var tr = st.getPropertyValue("-webkit-transform") ||
            st.getPropertyValue("-moz-transform") ||
            st.getPropertyValue("-ms-transform") ||
            st.getPropertyValue("-o-transform") ||
            st.getPropertyValue("transform");

        // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
        if(tr != 'none') {
            var values = tr.split('(')[1];
                values = values.split(')')[0];
                values = values.split(',');
            var a = values[0];
            var b = values[1];

            var scale = Math.sqrt(a*a + b*b);

            // arc sin, convert from radians to degrees, round
            // DO NOT USE: see update below
            var sin = b/scale;
            angle = Math.round(Math.atan2(b, a) * (180/Math.PI)) + 30;
            console.log(angle)
        } else {
            angle = '30';
        }

        return angle;

}

function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function dragPanel(event){
    event.dataTransfer.setData("yCoord", event.clientY);
}

function drop(event) {
    event.preventDefault();
    const yDifference = event.clientY - event.dataTransfer.getData("yCoord");
    console.log(yDifference)
}

function dragging(event) {
    console.log(event.dataTransfer.getData("yCoord"))
  }
  
  function allowDrop(event) {
    event.preventDefault();
  }