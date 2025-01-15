# Stack
## Client
Displays the content of the page.
**Stack**:
* *React*: A larger framework or react framework will no be used as it would likely just add unnecessary complexity. React does client side rendering which is supremely important for the functionality of the app.
* *Tailwind*: It's just good and the documentation is easier to deal with than Bootstrap.
* *Jquery*: Necessary for interactions between the server.
	* Might not need to worry about this, I just like Jquery though. Its like an old lover.
	* Yeah I can just use React Fetch for any calls I need to make :(
* *Jest*: Testing makes my skin crawl, use Jest.
* *Chart.js or D3.js*: need a charting library to visualize option price data. Chart.js is simple and easy, D3 looks FUCKING INSANE.
	* Bro D3 is so cool, you could visualize data in so many ways. You could compare all of the options in live races, it would be SO COOL.
## Server (CMS?)
Handles the authentication and provides routes for the client to interact with the worker.
**Stack**:
* *Keystone*: This is a big maybe. I know how keystone works, mostly, and it would make handling the database much easier than the alternatives, but it really might be overkill. I am also worried that Keystone might not be well suited for the kind of app. ==Requires Additional Research==
	* Literally no one is even talking about Keystone. Which is concerning.
	* Maybe look into Strapi, its open source (has a paid version?) and seems to be much more popular.
	* One issue with pretty much all CMSs is that they pretty much all require like 13 layers of complexity which you have to fully understand. If I go with Keystone I will have to deal with GraphQL and Apollo and other terrible things that comes bundled with Keystone. The same is probably true to Strapi and all other headless CMSs.
* *Express (?)*: Just build it from scratch. I don't really doubt my ability to do this, but doing it well is another thing. I can make it do exactly what I want it to do but by using some other service I can make sure that the things that it *should* do are also covered.
* *MySQL*: If I use keystone I might have to use Postgres since that's the only one that it supports, but I'd prefer to use MySQL since that's the DBMS that I know and love.
* *Jest*: Testing makes my skin crawl, use Jest.
## Worker
Processes requests and handles most database manipulation. The client and the worker never directly interact.
**Stack**:
* *Go*: I am going to need to look into this a lot more, but it seems like Go is the way to go (get it?).
	* Go is super fast, which is good since the worker will be doing a lot of very small database manipulations.
	* I still need to look into how Go libraries work so there will likely be a bunch more in here once I figure that out. Luckily the worker is one of the last things I need to get together during the prototyping stage.

## Additional Things
**Exterior Stack**:
Stuff that is not *necessarily* required to build and make the whole thing function
* *Docker, Compose*: Pretty much entirely necessary if I ever want to move it from my computer to a server.
	* I'll have to look more into Compose if I want to have three different containers for each of the parts of the app.
* *Dev Container*: Technically just Docker again but now we are building everything inside a container.
	* I have no idea how any of this shit works so I'll have to really look into it.
	* Make sure to look into this and get it set up before even starting on the app.
* *Blob Storage*: If you want to allow users to upload images or files you are going to need some kind of blob storage. I don't foresee this being an issue, the only thing that this might be an issue is if I want to allow users to upload their own profile pictures or maybe have a blog thing later. But that's all speculation and I can just decide to not do it if it ends up being too stupid.
	* Alternatively, I could just have them use image links instead of uploading the images themselves. Let some other shmuck handle the file storage.
* *GitHub*: For git stuff. Make sure to actually follow some good conventions this time.
# Stages
## Epic 1: Prototyping
Get something working together. This has already "technically" been done with v0.1 and v0.2 but since this is my first time using this very well defined stack, it will likely need some time for trial and error.

**Goals**:
* *Make it work, and good*: it doesn't need to be perfect, it just needs to work.
* *Make something that could be used later*: The issue with the previous prototypes is that I couldn't really build off of them, hence why I am making a new prototype. I want to be able to use this as a launching pad, not a testing ground.
* *Learn and understand the tech stack*: There are a lot of things in the stack that I don't fully understand yet, this will be my chance to learn so that when I start *really* building I will have a solid foundational learning to make the process easier and so I can avoid making some mistake and then needing to fall back like 15 commits.

**Milestones**:
1. Finalize stack, you will shoot yourself in the foot if you try and start without a plan of what tools you are going to use. You can change your mind later but you need to have a foundation or else you won't make anything that will last.
2. Set up local and GitHub repo and make initial commit.
3. Set up dev container, do this before even thinking about doing any coding.
4. Decide on database schema. I know it sucks but you need to write EVERYTHING out.
6. Run startup code for whatever CMS (if you decide to go with a CMS) you will use and make sure it is running.
	* I think in most cases a headless CMS has some kind of admin panel, so long as you can access that then you are pretty much set.
7. Run the startup code for the client.
	* Just create some kind of hello world code, we just need a boilerplate right now.
8. Create the main process loop for the worker.
9. Create a seeding script that fills the database based on the schema provided.
	* Fill the database with enough sample data so that it could be adequately tested down the line.
10. Create basic api routes/create simple api requests in the client and server.
11. Create user login system. Don't worry about authentication yet.
	* This will mostly be client side with a simple request to the server and then logging in on the client side when it gets some kind of response.
12. Add authentication for users signing in.
	* Users should not be able to to see any other user data or manipulate any data without being logged in. They should still be able to see option data without being logged in.
	* This step is a larger on because it also implies the creation of a user login system. Wait actually, I'm just going to add that as its own step.
By this point the code base should be logically working with no errors. The client and the server should have some basic communication and worker is just kinda spinning in a circle in its corner, but that's fine.

## Epic 2: Proof of Concept
Get something that is a basic version of the final product. Essentially create a working stock market simulator. The worker should be really running now and generating stock flux with a good amount of entropy. Users should be able to sign in, allowing them to buy and sell stocks with tokens that are tied to their accounts. Those bought and sold stocks should effect the total stock price. Along with other basic features.

**Goals**:
* *All users are able to view stock graphs*: All uses, regardless of their logged in status, should be able to access and view the current and historical data of all stocks currently on the market.
* *Logged in users have access to special options*: Users can do the following:
	* The ability to sign in and out.
	* Buy and sell stocks.
	* Hold stock options that are tied to their accounts with proper logic to maintain the price that they had bought them for.
	* Visual information about what stocks they have bought and how much they had changed in value.
* *The worker handles all basic database modulation functions*: The worker is constantly spinning, checking for jobs from the client and constantly adding entropy to all stocks in the database.
	* There will likely need to be multiple workers running simultaneously so that user requests can be handled at the same time as database entropy generation. Though keep in mind the data lifecycle and make sure that the workers aren't tripping over each other.

**Milestones**:
1. Get the entropy worker up and running generating entropy for all stocks.
2. Create routes on the server side to allow for anyone to be able to GET option data.
3. Create client command to pull up specific, or all options.
	* The option prices should be displayed numerically and as a graph. A graphing library will need to be decided upon. Probably use Chart.js

# Random Notes
Shifted Cartesian coordinates:
$$
(x+xmin⁡)^2+(y+ymin⁡)^2=a^2θ
$$
where:
$$
\theta = \tan^{-1}\left(\frac{y + y_{\min}}{x + x_{\min}}\right)
$$
Set min to 0 and you get a cool spiral that only has points that have points that have positive x and y.