$(function () {
    $leftWheel = $(".slot-wheel-left");
	preloadSongs();
    buildSlotWheels($leftWheel);
});

const title = "🎉🎊 Mega Sena Lucky Numbers 🎊🎉";
const participants = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60"
];

var songPiaoStorm = new Audio();

var spinParametersList = [
    [10000, "easeOutQuad", 0, songPiaoStorm]
]

let itemsListCount = 0;
let lastSpinNumber = 0;
let lastColor = '#FEFFBF';
let itemsArray = [];

function preloadSongs(){
    songPiaoStorm.src = "piao-storm.mp3";
    songPiaoStorm.preload = "auto";
    songPiaoStorm.load();
}

function buildSlotWheels($container) {

    itemsArray.push(title);
    const amount = 2800;

    for (let i = 0; i < amount; i++) {
        for (let participant of participants) {
            itemsArray.push(participant);
        }
    }

    itemsListCount = itemsArray.length;
    $items = itemsArray.map(buildSlotItem);
    $container.append($items);
}

function buildSlotItem(imgURL) {
    return $(
        '<li class="item" style="background-color: ' +
        randomColor() +
        '"><div style="padding-top: 245px; font-size: 100px">' +
        imgURL +
        "</div></li>"
    );
}

function randomColor(){
	return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (45 + 60 * Math.random()) + '%)'
}

function rodaRoda() {
    spinStart();
    spin(10000, "easeOutQuad", 0, songPiaoStorm);
}

function spinStart() {
    togglePride();
    document.getElementById("btnRodaRoda").innerText = "Rodando, rodando...";
}

function spin(spinDuration, easing, cooldown, song) {
	song.play();
	
	leftWheelIndex = randomItemIndex(itemsListCount);
	var sortedPlayer = itemsArray[leftWheelIndex];

    console.log(sortedPlayer, leftWheelIndex);

    $leftWheel.animate(
        {
            top: -leftWheelIndex * 600,
        },
        spinDuration,
        easing,
        () => spinEnd(cooldown)
    );
	
	if (randomItemIndex(4) == 3){
		console.log('easter egg madness');
		var waitTime = Math.floor(spinDuration * 70 / 100);
		
		setTimeout(function () {
			document.getElementById("imgRootDev").style.display = "block";
		}, waitTime);
		setTimeout(function () {
			document.getElementById("imgRootDev").style.display = "none";
		}, waitTime + 300);
	}
}

function spinEnd(cooldownTime = 0) {
    party.screen();
    togglePride();
    setTimeout(() => {
        document.getElementById("btnRodaRoda").innerText = "Sortear";
    }, cooldownTime);
}

function togglePride() {
    document.getElementById('pride').classList.toggle("pride");
    document.getElementById('btnRodaRoda').classList.toggle("pride");
}

function randomItemIndex(max) {
    if (window.crypto && window.crypto.getRandomValues) {
        var randomBuffer = new Uint32Array(1);
        window.crypto.getRandomValues(randomBuffer);
        let num = randomBuffer[0] % max;
		return num;
    } else {
        alert('navegador not compatible');
		return 0;
    }
}