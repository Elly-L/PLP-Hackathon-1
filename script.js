// Smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  })
})

// Add some interactive magic
document.addEventListener("mousemove", (e) => {
  const particles = document.querySelectorAll(".particle")
  particles.forEach((particle, index) => {
    const speed = (index + 1) * 0.01
    const x = e.clientX * speed
    const y = e.clientY * speed
    particle.style.transform = `translate(${x}px, ${y}px)`
  })
})

// Konami code easter egg
const konamiCode = []
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.keyCode)
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    document.body.style.animation = "rainbow 2s infinite"
    setTimeout(() => {
      document.body.style.animation = ""
      alert("🌈 You found the secret! You are now officially a Digital Alchemist apprentice!")
    }, 2000)
  }
})
