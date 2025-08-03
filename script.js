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
      showCenteredAlert("🌈 You found the secret! You are now officially a Digital Alchemist apprentice!")
    }, 2000)
  }
})

// Modal Functions
function openContactModal() {
  const modal = document.getElementById("contactModal")
  modal.classList.add("show")
  document.body.style.overflow = "hidden" // Prevent background scrolling
}

function closeContactModal() {
  const modal = document.getElementById("contactModal")
  modal.classList.remove("show")
  document.body.style.overflow = "auto" // Restore scrolling
}

// Close modal when clicking outside
document.getElementById("contactModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeContactModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeContactModal()
  }
})

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Create mailto link
  const mailtoLink = `mailto:ellyodhiambo6896@gmail.com?subject=${encodeURIComponent(subject + " - From " + name)}&body=${encodeURIComponent(
    `Hello Elly!\n\nName: ${name}\nEmail: ${email}\nProject Type: ${subject}\n\nMessage:\n${message}\n\nSent from your magical portfolio website! ✨`,
  )}`

  // Open email client
  window.location.href = mailtoLink

  // Show success message
  showCenteredAlert(
    "🎉 Your message is ready to send! Your email client should open shortly. If it doesn't, please copy the details and send manually to ellyodhiambo6896@gmail.com",
  )

  // Close modal after a delay
  setTimeout(() => {
    closeContactModal()
    this.reset() // Reset form
  }, 2000)
})

// Centered Alert Function
function showCenteredAlert(message) {
  // Create modal-like alert
  const alertModal = document.createElement("div")
  alertModal.className = "modal show"
  alertModal.style.zIndex = "3000"

  alertModal.innerHTML = `
    <div class="modal-content" style="max-width: 500px; text-align: center;">
      <div class="modal-header">
        <h2>🎉 Magic Moment!</h2>
        <span class="close-btn" onclick="this.closest('.modal').remove(); document.body.style.overflow = 'auto'">&times;</span>
      </div>
      <div class="modal-body">
        <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">${message}</p>
        <button onclick="this.closest('.modal').remove(); document.body.style.overflow = 'auto'" class="submit-btn dancing-btn">
          ✨ Awesome!
        </button>
      </div>
    </div>
  `

  document.body.appendChild(alertModal)
  document.body.style.overflow = "hidden"

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (alertModal.parentNode) {
      alertModal.remove()
      document.body.style.overflow = "auto"
    }
  }, 5000)
}

// Replace default alert with centered version
window.alert = showCenteredAlert
