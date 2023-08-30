$(function () {
    let game = $("#game")
    let bird = $("#bird")
    let pipes = $(".pipe")
    let downPipe = $('.pipe.down')
    let upPipe = $('.pipe.up')
    let gameOver = $(".gameOver")
    let score = $(".scoreNum")
    let scoreNum = parseInt(score.text())
    let canScore = false
    let retryBtn = $('.retry')

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    let birdFlyInterval = setInterval(birdFlying, 10)

    function birdFlying() {
        let birdPosition = bird.position()
        if (birdPosition.top < (game.height() - 50)) {
            bird.css('top', birdPosition.top + 4)
            let verticalUp = birdPosition.top < upPipe.position().top + upPipe.height()
            let verticalDown = birdPosition.top + bird.height() > downPipe.position().top
            let horizontal = birdPosition.left + bird.width() >= pipes.position().left
            if ((verticalUp || verticalDown) && horizontal) {
                stopGame()
            } else {
                canScore = true
            }
        } else {
            stopGame()
        }
    }

    function birdJump(e) {
        let interval = setInterval(fun, 10)

        function fun() {
            let birdPosition = bird.position()
            if (birdPosition.top >= 10) {
                bird.css('top', birdPosition.top - 7)
            }
        }

        function clear() {
            clearInterval(interval)
        }

        setTimeout(clear, 200)
    }

    $(document).on('keypress', function (e) {
        e.preventDefault()
        if (e.which === 32) {
            birdJump()
        }
    })

    $('.pipe').on('animationiteration', function () {
        let randPos = randomInt(-150, -550)
        upPipe.css('top', randPos)
        downPipe.css('top', randPos + 750)
        if (canScore) {
            scoreNum = scoreNum + 1
            score.text(scoreNum / 2)
        }
    })

    function stopGame() {
        clearInterval(birdFlyInterval)
        bird.fadeOut()
        pipes.fadeOut()
        gameOver.fadeIn()
    }

    retryBtn.click(function () {
        location.reload()
    })
})