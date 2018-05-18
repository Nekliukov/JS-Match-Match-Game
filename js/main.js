var cards_array = ['A','B','C','D','E','F','G','H'];
var cards_values = [];
var cards_tile_ids = [];
var tiles_flipped = 0;

Array.prototype.shuffle_cards = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

Array.prototype.resize = function(newSize, defaultValue) {
	var i = 0;
    while(newSize > this.length){
		this.push(defaultValue[i]);
		i++;
	}
    this.length = newSize;
}

function set_diff(){
	var rates = document.getElementsByName('dif');
	var rate_value;
	for(var i = 0; i < rates.length; i++){
    	if(rates[i].checked){
        	return rates[i].value;
    	}
	}
}

function start(){
	new_board(set_diff());
}



function new_board(cards_num){
    tiles_flipped = 0;
	var output = '';
	cards_array.resize(cards_num, cards_array)
	cards_array = cards_array.concat(cards_array);
	cards_array.shuffle_cards();
    for(var i = 0; i < cards_array.length; i++){
        output += '<div id="tile_'+i+'" onclick="cards_flip_tile(this,\''+cards_array[i]+'\', \''+cards_num+'\')"></div>';
    }
    document.getElementById('cards_board').innerHTML = output;
}

function cards_flip_tile(tile,val, cards_num){
	if(tile.innerHTML == "" && cards_values.length < 2){
	tile.style.background = '#FFF';
	tile.innerHTML = val;
	if(cards_values.length == 0){
		cards_values.push(val);
		cards_tile_ids.push(tile.id);
	} else if(cards_values.length == 1){
		cards_values.push(val);
		cards_tile_ids.push(tile.id);
		if(cards_values[0] == cards_values[1]){
			tiles_flipped += 2;
			// Clear both arrays
			cards_values = [];
            cards_tile_ids = [];
			// Check to see if the whole board is cleared
			if(tiles_flipped == cards_array.length){
				alert("Board cleared... generating new board");
				document.getElementById('cards_board').innerHTML = "";
				new_board(cards_num);
			}
		} else {
			function flip2Back(){
				// Flip the 2 tiles back over
				var tile_1 = document.getElementById(cards_tile_ids[0]);
				var tile_2 = document.getElementById(cards_tile_ids[1]);
				tile_1.style.background = 'url(assets/img/back2.png) no-repeat';
                tile_1.style.backgroundSize = 'cover';
                tile_1.style.backgroundPosition = 'center';
            	tile_1.innerHTML = "";
				tile_2.style.background = 'url(assets/img/back2.png) no-repeat';
            	tile_2.innerHTML = "";
                tile_2.style.backgroundSize = 'cover';
                tile_2.style.backgroundPosition = 'center';
				// Clear both arrays
				cards_values = [];
            	cards_tile_ids = [];
			}
		    setTimeout(flip2Back, 700);
		}
	}
    }
}