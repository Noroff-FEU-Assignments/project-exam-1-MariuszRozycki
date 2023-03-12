# Trip Blog project exam 
## Live site [Trip Blog Live Site](https://dynamic-twilight-02d190.netlify.app/)
![trip-blog_wide-screen](https://user-images.githubusercontent.com/55709542/224534794-ed407588-0d07-478a-82a3-a5df73cab23c.jpg) <br>
Trip Blog is a blog project made as a project exam. Blog in stored on web host. It's a headless CMS. 
WordPress is used to set a content. Data fetched from WP REST API.

## Description

Goal of the project was to put into practice the skills learned over first year of studies. <br>
This project is made as a semester first exam. The content for website is stored on a WordPress used as a Headless CMS. 
Trip Blog is using WordPress to provide an API and add content for the blog. 
To build this blog I used pure Java Script, HTML, CSS and I made a call to the WordPress REST API to fetch the data.

### Project contains following pages:
1. Home page -
section with slider where user can see twelve lasts posts and click arrow to view more posts. 
Moving the slider is limited by the first or last post. Slider is implemented for mobile and desktop layout. 
Displaying and limitation is made by using both: Java Script and CSS - grid.

2. About -
here is added picture and "Lorem ipsum" text to fill up space. 
I used CSS - grid to share space between picture and text and of course to make a website responsive.

3. List of blog posts -
blog Page shows first 10 blogs. Under first 10 blogs finds "Show more" button to show rest of blog posts. 
When "Show more" button is clicked, button changes innerText to "Show less". 
After clicking "Show less" user can see again first 10 blogs.

4. Blog post specific pages -
the content of the blog specific page is dynamically build using a query string parameter based on whatever link the user clicked. 
The title of the blog specific is changed based on the blog that has been clicked. 
If any image on the blog post page is clicked, a modal appears that giving the user a bigger view of that image. 
Clicking outside image closes the modal.

5. Contact page -
contact page contains four text boxes:
* name (is more than 5 characters long),
* email address (is a valid email address),
* subject (is more than 15 characters long),
* message content (is more than 25 characters long),
* there is written JavaScript code to form validation.

### Summary:
- website is mobile responsive and looks good on all screen sizes
- the HTML is neat and semantic, the CSS is concise and styles aren't duplicated in media queries
- each page has a unique title, one unique h1, and meta description
- images are below 200kb and have alt text
- the site looks good and there's a class in the navigation telling the user which page they're on
- text lines are kept short
- the colors have good contrast, the text is easy to read and the site is easy for user's to navigate

## Built with
To built this project I used:
- HTML, CSS, JS,
- WordPress REST API,
- one.com web host
- worked with Visual Studio Code

### Preparing to project
- as a first step I created work board on Trello, to plan whole proces of Trip Blog creation,
- I choose theme,

### Design 
- I made a sketches of project on sheets of paper,
- gave a sketches to test,
- I made a low-fidelity prototypes in AdobeXD,
- choose fonts, colors,
- tested low-fidelity prototypes,
- choose pictures to project and adjusted them to requirements,
- I made a high fidelity prototypes,

### Technical
- I started to write code in html, css,
- tested coded design,
- I started to write Java Script code

### Installing
Clone repo to check a code:<br>
```
git clone https://github.com/Noroff-FEU-Assignments/project-exam-1-MariuszRozycki.git
```

## Live site <br>
[Trip Blog Live Site](https://dynamic-twilight-02d190.netlify.app/)

### Contact
Mariusz Rozycki: <br>
Portfolio: https://mariuszrozycki.info/portfolio <br>
Portfolio-contact: https://mariuszrozycki.info/portfolio/layout/contact.html <br>
Linkedin: https://www.linkedin.com/in/mariusz-rozycki <br>
e-mail: <marius.front@gmail.com>


