<template>
  <div class="main">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const canvas = document.querySelector('#canvas')
    let ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let meteors = []
    let allstar = 50 // 数量

    const init = () => {
      for (let i = 0; i < allstar; i++) {
        newmeteor()
      }
    }

    const newmeteor = () => {
      meteors.push({
        lines: [
          {
            x: parseInt(Math.random() * canvas.width),
            y: parseInt(Math.random() * canvas.height * 0.7)
          }
        ],

        life: parseInt(Math.random() * 100) + 100,
        age: 0
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < meteors.length; i++) {
        let meteor = meteors[i]
        let lines = meteor.lines
        for (let j = 0; j < lines.length; j++) {
          // 每个点的透明度不一样 越接近尾部越透明
          ctx.fillStyle = `rgba(255,255,255,${j / lines.length})`
          ctx.fillRect(lines[j].x, lines[j].y, 1, 1)
        }
        ctx.fillStyle = 'yellow'
        let s_head = lines[lines.length - 1]
        ctx.fillRect(s_head.x, s_head.y, 2, 2)

        if (meteor.age <= meteor.life / 2) {
          lines.push({
            x: s_head.x + 1,
            y: s_head.y + 0.3
          })
        } else {
          // 生命过半
          lines.shift()
        }
        meteor.age++

        if (meteor.age >= meteor.life) {
          meteors.splice(i, 1)
          newmeteor()
        }
      }
    }

    init()
    setInterval(draw, 20)
  }
}
</script>

<style>
body {
  /* background-color: black; */
  overflow: hidden;
}

.main {
  width: 100%;
  height: 100vh;
  position: fixed;
  background: url('./222.jpg');
  background-size: cover;
  background-position: center bottom;
}

#canvas {
  filter: drop-shadow(0 0 1px rgb(241, 241, 241));
  width: 100%;
  height: 100%;
}
</style>
