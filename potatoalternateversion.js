const $choices = document.getElementById('choices');
const $choicesstyle = document.getElementById('choices-main')
const $story = document.getElementById('story');
const $inventory = document.getElementById('inventory');
const $inventoryadd = document.getElementById('inventoryadd')
const $inventoryremove = document.getElementById('inventoryremove')
const $inventorytitle = document.getElementById('inventorytitle')
const $thebody = document.getElementById('thebody')
const $storyascii = document.getElementById('story-ascii')

//features - function to see if a choice is possible, not just if it's happened (like robot hand turning itself off and on, etc)

//cheat codes - activate to skip ahead
//let history = ["55", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "2", "3", "4", "6", "7", "8", "55", "55", "55", "8", "8", "8", "8", "15", "9", "9", "9", "9", "9", "9", "9", "9", "9", "16", "9", "9", "9", "9", "9", "9", "9", "16", "18", "10", "13", "13", "13", "13", "13", "13", "13", "13", "13", "13", "13", "17", "14", "19", "19", "19", "19", "19", "19", "11", "11", "11", "12", "19", "11", "11", "20", "20", "21", "22", "23", "24", "25", "26", "28"] //, "28", "29", "30", "31", "31", "31", "31", "31", "32", "32", "32", "32", "32", "32", "32", "33", "34"]
//let inventory = ["Etsy business: organic mud masks", "INVESTMENTS", "household-name status", "an everpresent dusting of fatalism", "a silvery feeling of impenetrability around your vital organs", "stories from the city", "stories from the city", "stories from the city", "stories from the city", "stories from the city", "stories from the city", "translucent green scales", "translucent green scales", "translucent green scales", "stories from the city", "translucent green scales", "translucent green scales", "a tendency to take long salty baths", "a tendency to take long salty baths", "a primal urge"]
//let currentAction = 28


$inventorytitle.innerHTML = "Inventory"


let currentAction = 55 // key to access "action" object, changes onclick. Starts at first state.
let inventory = []
let history = [] //test array - should be blank at start of game 



//HISTORY FUNCTIONS
    function happenedLast (num) { 
        return history[history.length - 1] == num}
    function happenedEver (num) { 
        return history.includes(num)}
    function updateHistory () {
        history.push(currentAction);
        return history}
    function happenedCount (num) {         
    c = 0;
    for (i=0; i<history.length; i++) {
        if (history[i] === num) {
            c++
        }}
    return c
}
    function possibleChoice (num) {
        return allActions[num].gates() 
    }


//INVENTORY FUNCTIONS
    function hasItem (mystring) {                   //Boolean check
        return inventory.includes(mystring)};
    function addItem (mystring) {                   // Updates inventory 
        if (!mystring) {$inventoryadd.innerHTML = ``} 
        else {
            inventory.push(mystring); 
            if (happenedEver("34")) {
                $inventoryadd.innerHTML = ``;
                if (hasItem(mystring)) {return}
            } else {
            $inventoryadd.innerHTML = `A new item has been added to your inventory: <b>${mystring}</b>!`
        }}};
    function thinkThought (mystring) {
        {$inventoryadd.innerHTML = ``};
        if (!mystring || hasItem(mystring)) {return}
        else {inventory.push(mystring)}}

    function removeAllItems (mystring) {                // Updates inventory
        inventory = inventory.filter( (el) => {
            if (!mystring) {
                $inventoryremove.innerHTML = ``;
                return el
            } else {
                if (happenedEver("34")) {
                    $inventoryremove.innerHTML = ``
                } else {
                $inventoryremove.innerHTML = `You have lost any and all of this item: <b>${mystring}</b>`;
                }
                return el != mystring}
            })};
    
    function removeItem (mystring) {
        i = inventory.indexOf(mystring);
        if (i === 0) {
            inventory = inventory.slice(i + 1)
        } else if (i === inventory.length - 1) {
            inventory = inventory.slice(0, i)
        } else {
            inventory = inventory.slice(0, i).concat(inventory.slice(i + 1))
        }
    }

    
    function itemCount (item) {
        c = 0;
        for (i=0; i<inventory.length; i++) {
            if (inventory[i] === item) {
                c++
            }}
        return c
    }


class Action {
    constructor (number, choice, objectGive, objectRemove, gates) {
        this.number = number;
        this.choice = choice;
        this.objectGive = objectGive;
        this.objectRemove = objectRemove; 
        this.gates = gates || (() => true)
    }
}

    function choiceButton (options) {                       
        let possiblebuttons = '';
        for (const obj of options) {
            possiblebuttons += `<button onclick="incrementAction(${obj.number})">${obj.choice}</button>` + ' '
        }; 
        $choices.innerHTML = possiblebuttons;
        }

    

    function incrementAction (num) {                        // TODO - MAKE THIS, ADD TO LINE 54, figure out text vs nums
        currentAction = num;
        return gamePlay(num)
    }


    function validOptions () {                          // TODO: MAKE THIS WORK 
        options = [];
        //for (i=0; i<allActions.length; i++) {
        for(const act in allActions) {
            if (allActions[act].gates()) {
                console.log(allActions[act])
                options.push(allActions[act])}};
        return options
    }


sellMud = [
    "You are branding a new region. You are building it bigger. You are widening the corridors and adding more lanes.", 
    "You wake at dawn and contemplate the free market. That's America!",
    "There's a cold, sharp smell in the air - is it autumn? Oh, no - it's money!",
    "Another shipment sent off. They love that stuff.",
    "You walk by the mirror and see a shadowy shape in the background.",
    "I drink your milkshake!",
    "It's her. It's... it's Gwyneth. <br><br> She's proud of you. She wants you to know how proud she is. She comes towards you, smiling.<br><br>  You wake up with tears in your eyes.",
    "You hire an intern, an intern for the intern, and an international innovator."
]

cityStories = [
    "You wake up to the sound of someone on the TV arguing that the only good alligator is a grilled alligator.",
    "It's 3AM. Do you know where your keys are?",
    "You are part of the current, the anonymous eddy of people and life, you are heading downtown, you are following the lights. <br><br> No thoughts, just wandering. <br><br> You feel as though you are floating through the air - as though everyone is - as though you are all being pulled together. <br><br> You have a tingling feeling in your chest. ",
    "You are working out in a gym at 5am, sweating profusely. Might be the workout; might be the tequila.",
    "You are scrolling through Facebook and decide to try to look up everyone you had a crush on in high school. <br><br> The next morning you wake up and realize you entered their names as statuses, over and over, instead of into the search bar. The post is viral. ",
    "You are having a suit tailor-made, drinking champagne, and trying to not think about the texts you know are coming in right now.",
    "You realize you've been staring into the cheese section at Dean and Deluca for... a while, but you're not hungry.",
    "Someone is shaking you awake. You're in a cab. Is it... early, or late?", 
    "You are feeling much better about yourself these days. <br><br> Or maybe you're feeling fewer feelings in general?<br><br> It's hard to tell!",
]

seaStories = [
    "You wake up and realize your eyes were already open.",
    "Fish! FISH! FISH!!!!!!!",
    "Time is flowing forwards and backwards.",
    "You dance with the water.<br><br> It dances back.",
    "You are thinking less these days. <br><br>That little area right in the center of your forehead, right behind your eyes, that used to feel so tired... <br><br> It never, ever feels tired anymore.",
    "You acknowledge a whale.", 
    "Symmetry.*.^.+.^.*.yrtemmyS",  
    "Fish! FISH! FISH!!!!!!!",
    "Boats cast shadows. <br><br>Some move slowly.<br><br> Some move quickly.<br><br> They all make a racket.",
    "Fish! FISH! FISH!!!!!!!",
    "Mirror, mirror, in the air. There are mirrors everywhere.<br><br>That's right - bubbles. They're called bubbles.",
    "Time is flowing forwards and backwards.",
    "What is that sound?",
    "(what is that sound)",
    "(what is that shape?)",
    "((w.at i. t.at sha.e))",
    "((w.at is hap.eni.g?))",
    "((((()) )w. t .s h p.e .i.g(()(())()(",
    "((( ((( (( ( ()))( h  t )  (s)( a p  n i ng ( (()))) ))) ) ))",
    "(((()()()(((())()(((( ((( (( ( ()))( *(*()) *(*(*())) (*(*(*(*(( (()))) )))(())(((()))(()())())) ))",
]


digPotato = ["You dig in the ground.",
    "You narrowly avoid an encounter with a gopher. Or is it a gofer? He is carrying coffee and dry-cleaning, and seems extremely stressed out.",
    "You wipe the rugged sweat off your rugged brow. Earthen pursuits! Swarthy labor! Your visage is as the mountain.",
    "You contemplate the mysteries of the ground. <br><br>Ah, a potato!<br><br> Not that mysterious then.",
    "Two potatoes at once! Oh, wait, one of them is a rock.",
    "Would Hemingway be proud of you? Yes, Hemingway would almost certainly be proud of you.",
    "Do bears make friends with people? A bear would probably want to be your friend. You could go berry-picking together. Beary picking.",
    "One potato, two potato, three wait a minute who wrote that song? <br><br> Is that a song? Now it's stuck in your head...",
    "You contemplate the molecular composition of starch.<br><br> Ah, yes - the same starch you behold in the loam beneath you! <br><br>Good ol (2R,3S,4S,5R,6R)-2-(hydroxymethyl)-6-[(2R,3S,4R,5R,6S)-4,5,6-trihydroxy-2-(hydroxymethyl)oxan-3-yl]oxy-oxane-3,4,5-triol...",
    "Is there a face in this potato? Doesn't it kind of look like Neil Gaiman?",
    ]

function randomChoice (array) {
    let num = Math.floor(Math.random() * array.length);
    let selection = array[num]
    return selection
}

function orderedChoice (array) {
    for (num = 0; num < array.length; num++) {
        return array[num]
    }
}


sleepStories = [
    "you baehrte the air.",
    "you feel the wind tciiklng you.",
    "you see sehimnotg taht is the cloor red. <br>the cloor red maeks you have a big feeilng in your cehst.<br><br> waht do you do. ",
]

allActions = {
    "55": new Action("55", "Do nothing.", null, null, () => !hasItem("an everpresent dusting of fatalism") && !happenedEver("34")),
    "56": new Action("56", "Do nothing.", null, null, () => hasItem("an everpresent dusting of fatalism") && !happenedEver("21") && !happenedEver("33")),
    "66": new Action("66", "Dig in the ground.", null, null, () => happenedEver("8") && !happenedEver("21")),
    "1": new Action("1", "Dig in the ground.", "potato", null, () => !happenedLast("3") && !happenedLast("4") && !happenedLast("5") && !happenedEver("8")), 
    "2": new Action("2", "Behold your potatoes.", null, null, () => itemCount("potato") >= 10 && !happenedLast("2") && !happenedLast("3") && !happenedLast("4") && !happenedLast("5") && !happenedEver("21")), 
    "3": new Action("3", "Go see the Potato Man.", null, null, () => happenedEver("2") && !happenedLast("3") && itemCount("potato") >= 10 && !happenedEver("21")),
    "4": new Action("4", "Trade potatoes for mud.", "one unit of low-quality mud", "potato", () => happenedLast("3") && itemCount("potato") >= 10), 
    "5": new Action("5", "Wish you hadn't traded your potatoes for mud.", null, null, () => happenedLast("4")),
    "6": new Action("6", "Behold your mud.", "an entrepreneurial glint in your eye", null, () =>itemCount("one unit of low-quality mud") && !happenedLast("6") && !happenedEver("21")),
    "7": new Action("7", "Start a cosmetics business selling organic mud facial masks", "Etsy business: organic mud masks", "one unit of low-quality mud", () => happenedLast("6")),
    "8": new Action("8", "Package mud.", "CAPITALISM", null, () => hasItem("Etsy business: organic mud masks") && !hasItem("an everpresent dusting of fatalism")),
    "9": new Action("9", "Invest in the business.", "Instagram likes", null, () => itemCount("INVESTMENTS") >= 1 && !happenedEver("18")),
    "10": new Action("10", "Experience existential ennui.", "an everpresent dusting of fatalism", null, () => hasItem("household-name status") && !happenedEver("10")),
    "11": new Action("11", "Scratch the lizard scales.", "translucent green scales", null, () => itemCount("stories from the city") >=6 && !happenedEver("21")),
    "12": new Action("12", "Apply lotion.", null, null, () => itemCount("translucent green scales")>2 && !happenedEver("21") && !happenedEver("12")),
    "13": new Action("13", "Promote your product on YouTube", "insomnia", null, () => itemCount("Instagram likes") >= 0 && hasItem("an everpresent dusting of fatalism") && !happenedEver("14") ),
    "14": new Action("14", "Lose control of the narrative.", "a silvery feeling of impenetrability around your vital organs", "anxiety", () => hasItem("anxiety") && hasItem("household-name status")),
    "15": new Action("15", "Consolidate your capitalism.", "INVESTMENTS", "CAPITALISM", () => itemCount("CAPITALISM") >= 5 ),
    "16": new Action("16", "Consolidate your likes.", "internet fame", "Instagram likes", () => itemCount("Instagram likes")>= 5),
    "17": new Action("17", "Consolidate your insomnia.", "anxiety", "insomnia", () => itemCount("insomnia") >= 10),
    "18": new Action("18", "Consolidate your fame!!!", "household-name status", "internet fame", () => itemCount("internet fame") >= 2 ),
    "19": new Action("19", "Take advantage of what the city has to offer.", "stories from the city", null, () => happenedEver("14") && !happenedEver("21")),
    "20": new Action("20", "Wash out your gills.", "a tendency to take long salty baths", null, () => itemCount("translucent green scales")>= 5 && !happenedEver("21")),
    "21": new Action("21", "Follow your instincts.", "a primal urge", "an entrepreneurial glint in your eye", () => itemCount("a tendency to take long salty baths") >=2  && !happenedEver("21")),
    "22": new Action("22", "Follow your instincts.", null, null, () => happenedLast("21")),
    "23": new Action("23", "Follow your instincts.", null, null, () =>  happenedLast("22")),
    "24": new Action("24", "Follow your instincts.", null, null, () => happenedLast("23")),
    "25": new Action("25", "Turn around.", null, null, () => happenedLast("24")),
    "26": new Action("26", "Yes.", null, null, () => happenedLast("25")),
    "27": new Action("27", "No.", null, null, () => happenedLast("25")),
    "28": new Action("28", "Swim.", null, null, () => happenedLast("26")), 
    "29": new Action("29", "Let time pass.", "stories from the sea", null, () => happenedEver("28") && !happenedEver("30") && !happenedEver("34")),
    "30": new Action("30", `*(*(*()))  (*(*(*(*((`, null, null, () => happenedCount("29") >= seaStories.length && !happenedEver("30")),
    "31": new Action("31", "????????", null, null, () => happenedEver("30") && !happenedEver("32")),
    "32": new Action("32", "?????????????", null, null, () => happenedCount("31")>=4 && !happenedEver("33")),
    "33": new Action("33", "!", null, null, () => happenedCount("32")>=6 && !happenedEver("33")),
    "34": new Action("34", "!", null, null, () => happenedEver("33") && !happenedEver("34")),
    "35": new Action("35", "kepe giong", null, null, () => happenedCount("35") < sleepStories.length && happenedEver("35")),
    "36": new Action("36", "oepn the red sehimnotg", "laiiimnotts", null, () => possibleChoice("38")),
    "37": new Action("37", "tcouh the red sehimnotg", "laiiimnotts", null, () => possibleChoice("38")),
    "38": new Action("38", "back aawy form the red sehimnotg", "laiiimnotts", null, () => happenedCount("35") == sleepStories.length -1 && !happenedEver("38")),
    "39": new Action("39", "eat the red sehimnotg", "laiiimnotts", null, () => possibleChoice("38") ),
    "40": new Action("40", "look into the bacehnrs of the teers", "ceilmoptxy", null, () => hasItem("laiiimnotts")),
    "41": new Action("41", "tcouh the tghins on the gnorud", "eaciimprl oabeinorstvs", null, () => hasItem("laiiimnotts")),
    "42": new Action("42", "sing a snog to yelorsuf", 'iaiimooprstvn', null, () => hasItem("laiiimnotts")),
    "43": new Action("43", "close your eeys and leistn", "aabcrstt tghhout", null, () => hasItem("laiiimnotts")),
    "44": new Action("44", "habeinrte for the weintr", null, null, () => inventory.length == 5 && happenedEver("35")),

}


allStories = {
    "55": "You are standing in a potato field. The ground is brimming with possibilities.",
    "56": "You do nothing.",
    "66": "You dig in the ground. What were you looking for, again?",
    "1": randomChoice(digPotato),
    "2": "You stand stalwart in the farmlight, beholding your potatoes. What fine potatoes they are.<br><br> Suddenly it occurs to you: The Potato Man! <br><br>You should take your potatoes to the Potato Man, and gain his wise counsel.",
    "3": "You go to see the Potato Man. He examines your potatoes with a wry twinkle in his eyes. <br><br>Your potatoes are good enough for him.<br><br> Barely.<br><br> Do you want to trade?",
    "4": "You make a trade!",
    "5": "Why did you do that????",
    "6": "You peer deeply into the heart of the mud, beholding it. It is mud. And yet, it is so much more. With your finely honed instincts, you sense an opportunity for pure, raw commerce.",
    "7": "You are selling potato mud in tiny jars at a 1000% markup, mostly to Brooklyn.", 
    "8": randomChoice(sellMud),
    "9": `You are what they call an "influencer". You are "influencing". You are "influential"!`,
    "10": "So... what happens when you are successful? Should you be feeling happier?",
    "11": "Your body seems to be growing scales. Scratching them feels good.",
    "12": "Your scales aren't painful or itchy, but you apply lotion just in case.",
    "13": "On YouTube nobody can see you cry! Because you're so successful - why would you cry?!",
    "14": `A drunken interview you don't remember makes its way onto BuzzFeed's front page. <br><br> Your admirers and detractors go to war over your honor. 
    <br><br>The reputational fallout is immense, but you feel... cold. Poised. Ready to act, or react, as necessary. Like you are seeing clearly now, perhaps for the first time. `,
    "15": "You convert your capitalism into more long-lasting wealth.",
    "16": "You convert your likes into internet notoriety.",
    "17": "You're allowed to mix melatonin and martinis, right?", 
    "18": "Podcasts, guest posts, AMAs on Reddit - it's a whirlwind.",
    "19": randomChoice(cityStories),
    "20": "The sides of your throat feel better when you wash them out with warm salt water. <br><br> Just like you did when you had a sore throat as a kid. <br><br>Well, except your sore throat is on the outside this time.",
    "21": "You are having a dream of seeing shafts of dappled light undulate down towards you through deep water.<br><br> The patterns are neverendingly complex.<br><br> You feel as though you are on the brink of understanding something beautiful and sad. <br><br>You wake and walk out of your apartment towards the river.",
    "22": "The trees are thrashing about as though a giant is running them through his hands. <br><br> You guess that means it's windy.<br><br> Your throat is dry.",
    "23": "You begin to smell the river as you get close. There is a roaring sound. <br><br> You guess that means that it is raining.<br><br>You look down at your hands. They look different.",
    "24": "<i>Dreams... dreams... you have been walking too long in dreams.</i><br><br> Who said that?",
    "25": "You don't see anyone.<br><br><i>Do you want to go deeper?</i><br><br> You can't see anyone. <br><br><i>Do you want to know? To know more?</i>",
    "26": "You walk towards the guardrail. The lights are so beautiful tonight - the boats, the buildings. <br><br>There is a wind blowing toward you - you can feel it now. <br><br>The reflection of the skyscrapers on the other side of the water is being pulled towards you on the waves. <br><br> You soundlessly dive into the river.",
    "27": "<i>I understand. Not everyone is ready right away. <br><br> You will wait here, and dream. <br><br> Perhaps one day you will want to know.</i><br><br>You fall into a deep, endless sleep. You dream of trees talking to other trees with their roots - <br><br> You dream of the sounds of the ocean, rarely heard by humans - <br><br> You dream of being enfolded in a darkness so complete that time is obscured from your mind - <br><br> You dream that you will wake one day and know many things.",
    "28": "Your body moves through the water. Your body? Yes, your body. <br><br>You have become something different - something strange. <br><br> You feel very calm.",
    "29": orderedChoice(seaStories),
    "30": ascii1,
    "31": ascii1,
    "32": ascii2,
    "33": ascii3, 
    "34": "you are siinttg in a feild. tehre are many cloors.",
    "35": orderedChoice(sleepStories),
    "39": `you taste the red sehimnotg. it taests beittr and sadeiwys. you <br>
            do not want to eat sehimnotg taht taests beittr and sadeiwys.<br>you sotp tainstg the red sehimnotg. `,
    "36": `you sartt to oepn the red sehimnotg. it is made of salml seghimnots<br>
            and many oehtr salml seghimnots. tehy are minovg. you feel rdue<br>
             liknoog in a sehimnotg like this. you close the red sehimnotg. `,
    "41": `you tcouh the red sehimnotg. it maeks the sdnous in your bdoy<br>
            paly very ldlouy. the misuc is daegnorus and you do not want <br>
            to dacne to it. `,
    "38": "you back aawy form the red sehimnotg.",
    "42": `you are sgiinng a snog. it fills your cehst with snoud<br>
            nad it sartts wehn it sartts and edns wehn it edns. he <br>
            sgiinng niose gorws up idinse you, sadeinprg out. it is<br>
            ldeour tahn the white gilnorwg fire taht pehsus behind <br>
            your eeys and maeks you aafird.`,
    "40": `you look into the bacehnrs of the teers. the bacehnrs have leins <br>
            taht make saellmr bacehnrs, taht have leins taht make laeevs, <br>
            taht have leins taht make pinots, if you close your eeys you <br>
            can see more leins in the air, more pinots`,
    "41": `you tcouh the tghins on the gnorud - salml tghins <br>
            lmpuy and big rckoy and minovg. you are cennott not to baerk,<br> 
            not to crsuh, to olny know tehm in a salml way. you know <br>
            wehre tehy end and you begin.`,
    "43": `the daeknrss behind your eeys is leiinnstg. you haer <br>
            meemnovt of teers, caeerrtus, gaersss, laeevs. you have no raeosn <br>
            not to haer fehrtur - you haer more up and out - you haer <br>
            at the eged of your haeinrg.  `,    
    "44": `<i>And what are you collecting now?</i>
    <br><br>hwat, hwat is mkanig nioes now? hwat, clotelcnig?
    <br><br><i>Do you want to stay down here? It is so dark.</i>
    <br><br>hwat drak? Not drak. 
    <br><br><i>The longer you stay here, the more likely it is that you may start to experience... what is the word? Turbulence?</i>
    <br><br> Whar else to go?
    <br><br>Hlelo? ...Hello? 
    `,
    "45": "",
    "46": "",



}
let seastory = 0;

let sizey = 1.5

function gamePlay(number) {
    currentAction = allActions[number].number //coercing ints to text
    updateHistory();
    addItem(allActions[number].objectGive);
    removeAllItems(allActions[number].objectRemove);
    $inventory.innerHTML = inventory.join('<br/>')
    $story.innerHTML =  [allStories[number]];
    let realoptions = validOptions();
    choiceButton(realoptions);
    }

gamePlay(currentAction, inventory, history)

// make a way to load a certain game state - a save point - so I don't have to click thru whole game
// mirrors, running into them, saving someone else, going out of the water but you can't breathe?
// 

//happenedCount - count the amt of times something happened
//orderedChoice - move through story elements in order, not randomly 