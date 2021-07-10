let messageCroupierElement = document.getElementById("messageCroupier")
let moneyElement = document.getElementById("money")
let scoreElement = document.getElementById("score")
let scoreCroupierElement = document.getElementById("scoreCroupier")

let money = 700
let pot = 100
let score = 0

let playerPlaying = false
let croupierPlaying = false

let messageCroupierWelcome= "Welcome"
let messageCroupierHit= "Draw Another Card ?"
let messageCroupierOut= "OUT ! Sorry."
let messageCroupierBJ= "BlackJack!"
let messageCroupierDraw= "Draw !"

moneyElement.textContent = money+' G'
messageCroupierElement.textContent = messageCroupierWelcome
scoreElement.textContent = score + ' pts \n'+ pot +' G'
scoreCroupierElement.textContent = ''

let cards = [ ]
let croupierCards = [ ]
let croupierScore = 0

function startGame(){
    resetCards()
    pot = 100
    playerPlaying = true
    croupierPlaying = false
    let card1 = 11
    let card2 = 10
    let card3 = getRandomCard()
    cards = [card1, card2]
    score = card1 + card2
    reAssignAceValue()
    croupierCards = [card3,69]
    croupierScore = card3
    scoreCroupierElement.textContent=croupierScore
    renderCardsAndScore()
    renderCroupierCards()
    renderCroupierMessage()
}

//retourne 10 pour chacune des 'tetes' et 11 pour l'AS.
function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}
function renderCardsAndScore(){
    for (let i = 0; i < 11; i++) {
        if(cards[i] === 10 && (document.getElementById("carte"+i).getAttribute("src")==="images/empty.png")){
            let randomFace = Math.floor(Math.random()*4)+10
            document.getElementById("carte"+i).setAttribute("src","images/carte"+randomFace+".png")
        } else if (cards[i] === 11 || cards[i] === 1)
            document.getElementById("carte"+i).setAttribute("src","images/carte1.png")
        //permet d'afficher en permannance un objet vide si la carte n'est pas définie afin d'éviter des soucis de css
        else if (cards[i] === undefined)
            document.getElementById("carte"+i).setAttribute("src","images/empty.png")
        else if (cards[i] != 10)
            document.getElementById("carte"+i).setAttribute("src","images/carte"+cards[i]+".png")
    }
    //refresh des textContent
    scoreElement.textContent = score + ' pts \n'+ pot +' G'
    moneyElement.textContent = money+' G'
}
//fonction permettant de remmetre les cartes dans le deck
function resetCards(){
    cards=[]
    croupierCards=[]
    scoreCroupierElement.textContent=''
    for (let i = 0; i < 7; i++) {
        document.getElementById("carte"+i).setAttribute("src","images/empty.png")
        document.getElementById("carteC"+i).setAttribute("src","images/empty.png")
    }
}
//modifie le message du croupier en fonction de l'action en cours.
function renderCroupierMessage() {
    if (playerPlaying) {
        if (score < 21)
            messageCroupierElement.textContent = messageCroupierHit
        else if (score === 21)
            messageCroupierElement.textContent = messageCroupierBJ
        else{
            messageCroupierElement.textContent = messageCroupierOut
            money-=pot
        }
    } else {
        if (croupierScore > 21 || croupierScore<score){
            messageCroupierElement.textContent = "You won "+(pot*2)+" G!"
            money += pot*2
        } else if (croupierScore===score){
            messageCroupierElement.textContent = messageCroupierDraw
        } else{
            messageCroupierElement.textContent= "You lost "+pot+" G!"
            money-= pot
        }
    }
    moneyElement.textContent = money+' G'
}

function hit() {
    if (playerPlaying){
        card = getRandomCard()
        cards.push(card)
        score += card
        renderCardsAndScore()
        if (score >= 21) {
            if (reAssignAceValue()===false) {
                renderCroupierMessage()
                playerPlaying=false
            }
        }
    }
}

function double(){
    pot *= 2
    hit()
}

function stand(){
    if(playerPlaying){
        playerPlaying = false
        croupierPlaying = true
        croupierPlay()
    }
}

//lorsque le joueur bust, la veleur d'un AS passe a 1.
function reAssignAceValue(){
    if (score != 21) {
        for (let i = 0; i < cards.length; i++) {
            if (cards[i] === 11) {
                cards[i] = 1
                score -= 10
                renderCardsAndScore()
                return true
            }
        }
    }
    return false
}

function croupierPlay(){
    if (croupierPlaying){
        if (croupierScore<=score && croupierScore<17) {
            croupierHIT()
        }
        scoreCroupierElement.textContent=croupierScore
        renderCroupierCards()
        messageCroupierElement.textContent = "playing..."
        if (croupierScore>17 || croupierScore>score){
            renderCroupierMessage()
            croupierPlaying = false
        }
    }
}

function croupierHIT(){
    //remove la carte face cachée
    if(croupierCards[1]===69)
        croupierCards.pop()
    //tire une carte
    card = getRandomCard()
    croupierCards.push(card)
    croupierScore+=card
}

function renderCroupierCards(){
    for (let i = 0; i < croupierCards.length ; i++) {
        //la carte face cachée a pour ID 69. (assigné au début)
        if(croupierCards[i]===69)
            document.getElementById("carteC"+i).setAttribute("src","images/back.png")
        else
            document.getElementById("carteC"+i).setAttribute("src","images/carte"+croupierCards[i]+".png")
    }
}