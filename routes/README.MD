The routes part difined how we response to browser request with given URI. 
We applied Express package of nodejs to implement this functionality.

The wordflow is:
1. the route get request from browser
2. the route communicate with our data(model) part to process and get data from database.
3. the route forward the data to template
4. we inject data into template and return to the browser.
