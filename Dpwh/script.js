document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    let currentSlide = 0;
    let interval;
  
    function showSlide(index) {
      // Update slide position
      const carouselSlides = document.querySelector('.carousel-slides');
      const offset = -index * 100;
      carouselSlides.style.transform = `translateX(${offset}%)`;
  
      // Update indicators
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    }
  
    function showNextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  
    function showPrevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  
    function startAutoSlide() {
      interval = setInterval(showNextSlide, 5000);
    }
  
    function stopAutoSlide() {
      clearInterval(interval);
    }
  
    // Add event listeners
    nextBtn.addEventListener('click', () => {
      showNextSlide();
      resetTimer();
    });
  
    prevBtn.addEventListener('click', () => {
      showPrevSlide();
      resetTimer();
    });
  
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetTimer();
      });
    });
  
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
  
    function resetTimer() {
      stopAutoSlide();
      startAutoSlide();
    }
  
    // Initial load
    showSlide(currentSlide);
    startAutoSlide();
  });
  


  // Calendar JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const calendarGrid = document.getElementById('calendar-grid');
  const currentMonthDisplay = document.getElementById('current-month');
  const prevButton = document.getElementById('prev-month');
  const nextButton = document.getElementById('next-month');
  
  // Start with May 2025
  let currentDate = new Date(2025, 4, 1); // Month is 0-indexed in JavaScript (4 = May)
  
  // Function to generate calendar
  function generateCalendar(date) {
    // Clear previous calendar
    calendarGrid.innerHTML = '';
    
    // Update the month and year display
    const options = { year: 'numeric', month: 'long' };
    currentMonthDisplay.textContent = date.toLocaleDateString('en-US', options);
    
    // Get the first day of the month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    // Get the last day of the month
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Get the total number of days in the month
    const daysInMonth = lastDay.getDate();
    
    // Get the previous month's last date for calculating previous month days
    const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    
    // Calculate days from previous month to display
    for (let i = 0; i < firstDayOfWeek; i++) {
      const day = prevMonthLastDay - firstDayOfWeek + i + 1;
      createDayElement(day, true);
    }
    
    // Create current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = (i === today.getDate() && 
      date.getMonth() === today.getMonth() && 
      date.getFullYear() === today.getFullYear());
      createDayElement(i, false, isToday);
    }
    
    // Calculate days from next month to display
    // We want to make sure we have a total of 42 cells (6 rows × 7 days)
    const totalCellsToFill = 42 - (firstDayOfWeek + daysInMonth);
    for (let i = 1; i <= totalCellsToFill; i++) {
      createDayElement(i, true);
    }
  }
  
  // Helper function to create day element
  function createDayElement(dayNumber, isOtherMonth, isToday = false) {
    const dayElement = document.createElement('div');
    dayElement.textContent = dayNumber;
    dayElement.className = 'calendar-day';
    
    if (isOtherMonth) {
      dayElement.classList.add('other-month');
    }
    
    if (isToday) {
      dayElement.classList.add('today');
    }
    
    // Add event listener for day click
    dayElement.addEventListener('click', () => {
      // Clear any previously selected day
      document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
      });
      
      // Mark this day as selected
      dayElement.classList.add('selected');
      
      // Here you can add logic for scheduling on the selected date
      console.log(`Selected date: ${dayNumber}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`);
    });
    
    calendarGrid.appendChild(dayElement);
  }
  
  // Move to previous month
  prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
  });
  
  // Move to next month
  nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
  });
  
  // Initial calendar generation
  generateCalendar(currentDate);
});


// Calendar JavaScript with Form Integration
document.addEventListener('DOMContentLoaded', function() {
  const calendarGrid = document.getElementById('calendar-grid');
  const currentMonthDisplay = document.getElementById('current-month');
  const prevButton = document.getElementById('prev-month');
  const nextButton = document.getElementById('next-month');
  const selectedDateInput = document.getElementById('selected-date');
  
  // Start with May 2025
  let currentDate = new Date(2025, 4, 1); // Month is 0-indexed in JavaScript (4 = May)
  
  // Function to generate calendar
  function generateCalendar(date) {
    // Clear previous calendar
    calendarGrid.innerHTML = '';
    
    // Update the month and year display
    const options = { year: 'numeric', month: 'long' };
    currentMonthDisplay.textContent = date.toLocaleDateString('en-US', options);
    
    // Get the first & last day of the month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    //total num of days in the month
    const daysInMonth = lastDay.getDate();
    
    // Get the previous month's last date for calculating previous month days
    const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    
    // Add empty spaces instead of previous month days
    for (let i = 0; i < firstDayOfWeek; i++) {
      // Create empty div with same dimensions as day elements but without content
      const emptyElement = document.createElement('div');
      emptyElement.className = 'calendar-day empty';
      calendarGrid.appendChild(emptyElement);
    }
    
    // Create current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = (i === today.getDate() && 
    date.getMonth() === today.getMonth() && 
    date.getFullYear() === today.getFullYear());
      createDayElement(i, false, isToday);
    }
    
    // Calculate days from next month to display
    // We'll fill up to complete rows (multiples of 7)
    const totalDaysDisplayed = firstDayOfWeek + daysInMonth;
    const rowsNeeded = Math.ceil(totalDaysDisplayed / 7);
    const totalCellsNeeded = rowsNeeded * 7;
    const nextMonthDays = totalCellsNeeded - totalDaysDisplayed;
    
    for (let i = 1; i <= nextMonthDays; i++) {
      // Create empty div instead of showing next month days
      const emptyElement = document.createElement('div');
      emptyElement.className = 'calendar-day empty';
      calendarGrid.appendChild(emptyElement);
    }
  }
  
  // Helper function to create day element
  function createDayElement(dayNumber, isOtherMonth, isToday = false) {
    const dayElement = document.createElement('div');
    dayElement.textContent = dayNumber;
    dayElement.className = 'calendar-day';
    
    if (isOtherMonth) {
      dayElement.classList.add('other-month');
    }
    
    if (isToday) {
      dayElement.classList.add('today');
    }
    
    // Check if this day is in the past
    const selectedDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset time part for proper comparison
    
    // Make past dates and other month dates not clickable
    if ((selectedDay < now && !isOtherMonth) || isOtherMonth) {
      dayElement.classList.add('disabled');
    } else {
      // Add event listener for day click (only for current and future dates)
      dayElement.addEventListener('click', () => {
        // Clear any previously selected day
        document.querySelectorAll('.calendar-day.selected').forEach(el => {
          el.classList.remove('selected');
        });
        
        // Mark this day as selected
        dayElement.classList.add('selected');
        
        // Create a new date object for the selected date to avoid timezone issues
        // Use UTC to ensure the date is the same regardless of timezone
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = dayNumber;
        
        // Format the date for readable display (not for calculation)
        const dateObj = new Date(year, month, day);
        const readableDate = dateObj.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        // Update the form's date input with the readable date
        selectedDateInput.value = readableDate;
      });
    }
    
    calendarGrid.appendChild(dayElement);
  }
  
  // Move to previous month
  prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
  });
  
  // Move to next month
  nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
  });
  
  // Handle form submission
  const appointmentForm = document.getElementById('appointment-form');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const service = document.getElementById('service').value;
      const date = document.getElementById('selected-date').value;
      const time = document.getElementById('time').value;
      
      if (!name || !email || !phone || !service || !date || !time) {
        alert('Please fill out all required fields');
        return;
      }
      
      // Here you would normally send this data to your server
      // For demo purposes, we'll just show an alert
      alert(`Appointment scheduled successfully for ${date} at ${time}. We'll send a confirmation to ${email}.`);
      
      // Reset the form
      appointmentForm.reset();
      document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
      });
    });
  }
  
  // Initial calendar generation
  generateCalendar(currentDate);
});