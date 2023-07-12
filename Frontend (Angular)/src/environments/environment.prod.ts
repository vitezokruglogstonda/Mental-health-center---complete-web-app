export const environment = {
  production: true,
  app_title: 'MentalHealthCenter',
  footer_text: "© 2023, Elfak",
  server_url: "http://100.121.81.251:81/",
  server_picture_path: "assets/Images/ProfilePictures/",
  toolbar_center_text: "Your Mental Health",
  toolbar_menu_button_tooltip_text: "Menu",
  toolbar_menu_button_tooltip_show_delay: 500,
  account_icon_basic_URL: "assets/Icons/account_icon.png",
  account_icon_tooltip_text: "Account",
  toolbar_manu_tooltip_text: "Menu",
  login_card_example_email: "name@example.com",
  login_card_fieldError: "This field is required!",
  email_pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
  email_errorMessage_Invalid: "Your mail is not valid.",
  email_errorMessage_Taken: "This email adress is already taken. Try different one.",
  password_errorMessage: "Password field is required. Enter it please.",
  password_hint: "Your password is too short. Try longer password.",
  password_rep_errorMessage: "Repeated password doesn't match password above.",
  registrationError_FormIssue: "Something is missing. Check your input again.",
  registrationError_RequestIssue: "Registration failed.",
  gender_list: ["Male", "Female"],
  dialog_UploadPhoto_Settings: {
    openAnimationDuration: "500ms",
    width: "60%",
    height: "40%",
    errorMessage_fileType: "Wrong file type. Try something else.",
    errorMessage_numberOfFiles: "You can upload just 1 file.",
  },
  dialog_ChangePassword_Settings: {
    openAnimationDuration: "500ms",
    width: "40%",
    height: "35%",
  },
  dragAndDropSettings:{
    onDropClassName: "highlight",
    eventList_preventDefaults: ['dragenter', 'dragover', 'dragleave', 'drop'],
    eventList_highlight: ['dragenter', 'dragover'],
    eventList_unhighlight: ['dragleave', 'drop'],
  },
  home_page: {
    video_url_homePage: "assets/Videos/homepagevideo.mp4",
    video_title_homePage: "Welcome to the place where we solve problems together",
    intro_main_text: "We nurture mental health",
    intro_subtext: "Build a better version of yourself with the help of our professionals"
  },
  seek_help: {
    guest_name_error_text: "Enter your name please",
    phone_number_length: 10,
    guest_phone_number_error_text_empty: "You must provide your phone number if you wish of us to help you.",
    guest_phone_number_error_text_incomplete: "It looks like your number is not long enough. Try again.",
    guest_phone_number_error_text_exists: "It appears that you have already requested a phone call. Wait for our experts to call you.",
    text: "If you need to talk to someone, enter your name and phone number here, and our experts will call you right away.",
    snackbar_text: "You're request for call has been sent. Our experts will contact you as soon as possible.",
    snackbar_button_text: "OK",
    snackbar_horisontal_position: "start",
    snackbar_vertical_position: 'bottom',
  },
  operator_dashboard: {
    request_list_animation_duration: 1
  },
  day_schadule: ["10 - 11 :", "11 - 12 :", "13 - 14 :", "14 - 15 :", "16 - 17 :", "17 - 18 :", "19 - 20 :"],
  upcomingLabelText: "Upcoming: ",
  patient_page:{
    page_title_chose_therapist: "Choose your therapist",
    page_title_schedule: "Your therapy schedule",
  },
  admin_page: {
    title: "Admin page",
    snackbar: {
      change_password: "'s password successfully changed.",
      add_user: "successfully added."
    }
  }
};
