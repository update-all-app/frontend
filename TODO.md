# TODO / Discussion Points

- Discuss Authorized/UnAuthorized app
    - WithAuth and WithoutAuth
        - allows easy redirects on a page-by-page basis
        - less chance of "weird" behavior
        - is it significantly slower?
    - Switch between Authorized/Unauthorized apps
        - faster loading
        - possible duplication
        - possibly easier to manage
        - need to catch certain routes like /login and redirect to /
    - Best idea:
        - make a new branch that has 2 apps, compare experience between that branch and "development" or "main" branches
        - (do this once there are enough routes to make a difference)

- CSS/Styles
    - Breakpoints for small screens
    - About / Pricing screens --- need to look better. Font change?

- Malicious Users Check
    - Limit number of requests (per second and total over a few hours)

- Login/Signup
    - LOADING modal is a little abrupt, consider making login button a loader
    - Or wait a little before displaying it
    - Should we allow manual changes to address details?

- Logged In Navbar 
    - Dropdown:
        - Make new business
        - Edit profile
        - Password Reset