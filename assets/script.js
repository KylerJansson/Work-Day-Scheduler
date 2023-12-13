$(function () {
  const currentHour = dayjs().get('hour')

  console.log('current hour:', currentHour);
  // function to display current time/date
  function updateCurrentTime() {
    const date = dayjs().format('dddd, MMMM DD');
    const currentTime = dayjs().format('hh:mm:ss A');
    $('#currentDay').html(date + '<br>' + currentTime);
  }
  // converts hour id number into integer and change the class of each time block depending on past/present/future.
  function updateHour() {
    $('.time-block').each(function () {
      const workHour = parseInt($(this).attr('id').split('-')[1]);
      console.log('work hour:', workHour);
      if (workHour < currentHour) {
        console.log('Setting class to past');
        $(this).removeClass('present future').addClass('past');
      } else if (workHour === currentHour) {
        console.log('Setting class to present');
        $(this).removeClass('past future').addClass('present');
      } else {
        console.log('Setting class to future');
        $(this).removeClass('past present').addClass('future');
      }
    })
  }
  // loads the saved tasks/hours from local storage
  function loadSavedTasks() {
    $('.time-block').each(function () {
      const savedHour = $(this).attr('id');
      const savedTask = localStorage.getItem(savedHour);

      if (savedTask) {
        $(this).find('.description').val(savedTask);
      }
    })
  }
  // calling the functions
  updateCurrentTime();
  updateHour();
  loadSavedTasks();
  // intervals for second and hour
  setInterval(updateCurrentTime, 1000);
  setInterval(updateHour, 3600000);
  // adds input and hour to local storage when save button is clicked
  $('.saveBtn').on('click', function () {
    const savedTask = $(this).siblings('.description').val().trim();
    const savedHour = $(this).parent().attr('id');

    localStorage.setItem(savedHour, savedTask)
  })
});