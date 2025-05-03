window.addEventListener('load', function() 
{
  setTimeout(function() 
  {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => 
    {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1500);
});
AOS.init(
{
  duration: 800,
  easing: 'ease-in-out',
  once: true
});
function toggleDarkMode() 
{
  document.body.classList.toggle("dark-mode");
  const darkModeToggle = document.querySelector('.dark-toggle');
  if (document.body.classList.contains("dark-mode")) 
  {
    darkModeToggle.textContent = '🌞';
    localStorage.setItem('darkMode', 'enabled');
  } 
  else 
  {
    darkModeToggle.textContent = '🌓';
    localStorage.setItem('darkMode', 'disabled');
  }
}
if (localStorage.getItem('darkMode') === 'enabled') 
{
  document.body.classList.add("dark-mode");
  document.querySelector('.dark-toggle').textContent = '🌞';
}
function toggleMenu() 
{
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}
document.querySelectorAll('.nav-links a').forEach(link => 
{
  ink.addEventListener('click', () => 
  {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.remove("active");
  });
});
function filterProjects(category) 
{
  const projectCards = document.querySelectorAll(".project-card");
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  filterButtons.forEach(button => 
  {
    button.classList.remove("active");
    if (button.textContent.toLowerCase() === category || (category === 'all' && button.textContent.toLowerCase() === 'all')) 
    {
      button.classList.add("active");
    }
  });
  projectCards.forEach(card => 
  {
    if (category === 'all' || card.getAttribute("data-category") === category) 
    {
      card.style.display = 'block';
    } 
    else 
    {
      card.style.display = 'none';
    }
  });
}
document.getElementById('contactForm').addEventListener('submit', async function(e) 
{
  e.preventDefault();
  const formMessage = document.getElementById('formMessage');
  const submitButton = this.querySelector('input[type="submit"]');
  formMessage.textContent = 'Sending message...';
  formMessage.style.display = 'block';
  formMessage.className = 'form-message';
  submitButton.disabled = true;
  try 
  {
    const formData = new FormData(this);
    const response = await fetch('https://formspree.io/f/mrbqpkdo', 
    {
      method: 'POST',
      body: formData,
      headers: 
      {
        'Accept': 'application/json'
      }
    });
    if (response.ok) 
    {
      formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
      formMessage.classList.add('success');
      this.reset();
    } 
    else 
    {
      const errorData = await response.json();
      if (errorData.errors) 
      {
        throw new Error(errorData.errors.map(err => err.message).join(', '));
      } 
      else 
      {
        throw new Error('Form submission failed with status: ' + response.status);
      }
    }
  } 
  catch (error) 
  {
    console.error('Error:', error);
    formMessage.textContent = error.message || 'There was a problem sending your message. Please try again later or email me directly at jharohan2005@gmail.com';
    formMessage.classList.add('error');
  } 
  finally 
  {
    submitButton.disabled = false;
    setTimeout(() => 
    {
      formMessage.style.display = 'none';
    }, 5000);
  }
});
if (!localStorage.getItem('visits')) 
{
  localStorage.setItem('visits', '0');
}
let visits = parseInt(localStorage.getItem('visits'));
visits++;
localStorage.setItem('visits', visits.toString());
document.getElementById('counter').textContent = visits;
function animateSkills() 
{
  const skillBars = document.querySelectorAll('.progress-bar');
  skillBars.forEach(bar => 
  {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => 
    {
      bar.style.width = width;
    }, 100);
  });
}
const skillsSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => 
{
  entries.forEach(entry => 
  {
    if (entry.isIntersecting) 
    {
      animateSkills();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
if (skillsSection) 
{
  observer.observe(skillsSection);
}