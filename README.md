
To run project first run `npm install` both in the root folder of the project and in back-end folder.
Then, back in root folder run `npm run dev`,
It will run back-end and front-end same time. Make sure concurrently is installed.

Admins/Companies can't buy tickets.   


We have built an online ticket-selling platform using Angular, Redux and Node.js as back-end. 
The platform has three types of users:

    Admins - managing the platform
    Event organizers - event organizing company representatives, selling event tickets on the platform
    Customers - users buying event tickets

Admin users manage event organizer companies registered on the platform via the companies management page. On the management page list of currently registered companies is displayed. Admin users can temporarily block the company and later reactivate it if required. Events placed by blocked companies are not visible to customers. All newly registered companies require initial approval by the admin, which is also done on this page.

A company employee can register his company on the platform using the company registration form. The registration form for the company contains the following fields: company name, employee email, employee name, and password. After registering on the platform, the company employee can add, remove, or edit the company's events using the event management page. Users can not delete an event if at least one ticket is already sold.

The following information is required for adding a new event: name, date, category (predefined list, dropdown), detailed description, and event poster image. (event poster image can be a URL from a third-party image hosting platform). Each event has a list of ticket tiers specified at event creation time. Each tier has the following properties: name, number of tickets available, and price. At least one tier is required for any event. Company employees can temporarily suspend event ticket sales and resume later if required.

The event management page lists the company's placed events. It is possible to search events by date (range) and name.

Customers (buyers) can register on the platform to buy tickets for different events. During registration, the user should fill in the following fields: name, last name, and email. Customers can search for events using the event search page. They can search events by name (partial match), category (exact match), and date (range). Items in the search results have a link to the event details page. The event details page displays the following information: name, description, date, poster, and list of available ticket tiers. Each row in the tier list contains the name, ticket count, price, and purchase button. When the user clicks the purchase button, a popup opens, where the user should specify desired ticket count and press confirm button to finalize the purchase process.

General notes:
The landing page contains registration and sign-in page links for all types of users.
The website header should display a name with greeting text and a signout button for an authenticated user.
After signing in, the user is navigated to the home page, which has a dashboard with useful links and information.
All lists containing potentially more than ten items use paging.
