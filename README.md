# VRDataVizStop-Frisk

Virtual Reality and its Applications
Arya Boudaie and Akash Valsangkar
Final Project: Data Visualization
Virtual View of New York Stop and Frisk Data


## Introduction
Throughout this course, we have been looking at various aspects and implementations of of virtual reality, to try to get a scope of the entire field. We started at the basics of virtual reality, while working on making our own apps to demonstrate some use of it. We then went on to make an augmented reality application for the CSA Open day, to present data in an exciting way, while still having the participants interacting with the real world. Our final project, which is the subject of the report, is to build a system of data visualization using virtual reality, not as a utility, but to tell a story. This project builds upon the major theme of the course, which asks the question “How is virtual reality more useful than other technologies?”, and data visualization is an obvious foray into creating useful virtual reality visualizations. 
Stop and Frisk
The data that we used is data collected from the Stop-and-frisk program in New York City, where NYC police officers are allowed to stop any pedestrian they find suspicious, question them, and then frisk them for any contraband they might have. After this, they fill out a form, which is where we get our data from. All though this seems good in theory, in reality this system comes with lots of problems. For one, this system leads in very small percentage of arrests (18% in 2014), meaning lots of citizens are being needlessly harassed for no reason. In addition, because of internal racial biases, police officers are more likely to find people of color (e.g. African Americans) at fault, leading to many more minorities stopped and frisked on the street compared to white people. This in turn also lead to the arrest of many more people of color, even though the stopped to arrested ratio in all racial groups is around the same. This is only evidenced by the data though, which we worked to visualize. To quote citylab, “While it'll be years before researchers can tell us with any degree of certainty whether stop-and-frisk "works," it's definitely fair to say right now that it disproportionately humiliates, for specious reasons, people of color who are not illegally carrying firearms.”
Our Data
The data we are using is the 2014 Stop and Frisk data collected by the police. It is a 3,000 column random sample of a 45,000 column data set, with several data points for each person stopped, most of them being binary values. The data we most primarily used is the suspect’s race, and whether they were frisked, searched, and/or arrested, as well as what they were suspected/arrested for. As most of the data points were binary, it became hard to place them on a grid, so we also included attributes like a suspect's age and height. Other data that might be interesting to visualize would include the type of weapons found on a suspect,  if physical force was used on the suspect, and categorizing the crimes themselves.
Our Visualization
As stated, our visualization of the data is in a three point axis with an x,y, and z, to allow for any data to be mapped onto our program to allow quick experimentation. The x,y, and z axis may vary, but each person mapped is mapped according to a specific shape, depending on the race of the suspect. For example, black people are displayed as cylinders. The object’s size will be based on the build of the suspect, and the color of the object is the combined RGB for the qualities of being frisked, searched, and had contraband found. For example, someone who has only been frisked will be red, someone who has been frisked and searched will be yellow (R+G), and someone with all three will be black (R+G+B). This allows the user to quickly determine the status of the suspect. Clicking the screen shows only those who have been arrested, hovering over a suspect will show you all of the data on that suspect, and holding the mouse click will transport the user wherever they are looking. 


## Implementation details and Work division
### Akash: Unity UI + Unity coding + OSVR integration
#### UI Section + OSVR Integration:
UI section has undergone many changes since it was first decided. This is due to issues in field of view of OSVR.

Consider above image. On top left, it shows the current mapping of XYZ axis. In the top middle, it shows you the current gear you are in. Sign of the gear tells you which direction are you moving. (+: forward -: backwards). Magnitude of the gear tells you the speed with which you will move. Top right tells you the question you are currently answering. It doesn’t restrict you to freely move around the data and is added only for demo purpose as a reference.
On the bottom, the sub screen displays the details of the object currently under the focus. Only the important features are being mapped here. In class discussions, it was proposed that this can be located on either side of the screen (left + right). But since it appeared blurry on OSVR I kept this configuration.

#### Implementation Details: 

Implementation of the project was considerable amount of effort. I have used 5 types of objects. These types are mapped to the race of the object. In the scripts, main assumption while mapping real features is that any missing data is considered to be 0 after normalization.  
Short description of the scripts is provided below:
moveScript.js: It implements movement in the virtual space. Here are its important features:
Gear System: Mouse wheel up and down are mapped to increase and decrease in gears respectively. This is used to either go towards or away from the object by pressing left-mouse-click with speed determined by the current gear.
Answer Guide tour: We have various questions about the dataset to be asked to the user. User, by using the tools provided is supposed to answer the questions. If incase he/she is unable to answer them, we automate this tour to guide that person through the path. Also the key data objects are highlighted by using frost flow particle effect. This feature can also be used to verify the answers.


jsData.js: This is the core script that drives the entire project. It has following important features.
Draws the cube that defines the boundaries under the consideration.
Reads the xyz coordinates and normalizes them. These are later mapped to the size of the cube that is taken as an argument from the user. Since we are using randomly sampled 3000 points our cube is of dimension 100x100x100.
As per the race of the object under consideration, we instantiate the object type and assigns its location as per the current xyz mapping.
Text to be displayed on the canvas per object on hovering over it is mapped to that object.
Implements middle-mouse-click button functionality of toggling Color mapping:
Mapping based on Race. Red => Black, Green => Black Hispanic, Yellow => White Hispanic, Blue => White, White => Asian/Native American
Mapping based on Frisked, Searched & Contraband. These are mapped to RGB respectively.
Implements Right-Mouse-Click functionality of toggling display of all the dataset vs only arrested dataset.
Sets labels per object. These labels are blue if the object is arrested.
Implements scaling feature per object. Each object size is mapped to its build. All the values in this are first normalized and then scaled twice of their normalized values.
Maps input keys ‘y’, ‘u’ and ‘i’ to x, y, z respectively. Each of these loops with some fixed set of values. This had to be done since some of the features are categorical in nature i.e. they don’t have real values.
Answer Guide tour implementation has its subpart implemented in this script. It is activated on every event of “return” key being hit. This mainly use pre-implemented features such as mouse key toggle.
Uses frost particle effect to display anomalies onto the specific objects.


hitObject.js: Main part of this script is use of ray-casting. It implements following 2 features
Scope Locking effect on detection of object: Fires a ray from the camera and scales the scope if it hits any object. 
Moves the camera towards the object under the scope when “space” key is pressed.
In addition to these features, I had also implemented particle effect of fire and frost. User was allowed to map these effects to any of the features. But we observed reduction in the frame rates due to usage of these effects. Hence fire effect was removed and frost effect is being used only in the guided tour. The code is still left commented on the GitHub so that it can be used/modified later.

#### Arya: Data Analysis and Coding
My first addition to the project was the actual data set. Akash had already created the skeleton for his data visualization, but I wanted to do a report on this data, which has lots of notoriety in the United States. I did a lot of research into the data, to see what the trends were and what would be useful to report, with the context in mind. I wrote most of the report as well. 
With this in mind, I went through Akash’s code base and worked very closely with Akash on the above code, especially on the jsData.js file. A big portion of the code is the malleability of it, and I worked with him to view the data on the screen, and make appropriate changes. Here are specific changes brought by me.

1. Random sample of the data (via python script), instead of one not uniformly created.
2. Descriptive text box at the bottom for data exploration.
3. Decision for which axis to be plotted in the demonstration, as well as the binary features to be described (race, frisked, searched, contraband)
4. Other miscellaneous additions.

In short - I worked with Akash to iterate on this project several times, in order to create the best product for the end.

## Results
The axis are changeable, allowing for users to see different trends. One of them plots the users on height/age/race, which fully demonstrates the immense racial bias that this system has. Just looking at the screen shows how many people of color have been stopped, compared to white people. When you click, you will see that for both races, the number of people arrested goes down significantly for all races, showing that this program is extremely ineffective and hugely is a waste of time for New York citizens. Additionally, hovering over the full data, you will notice that minorities are more suspected of small charges, such as misdemeanors when they are let go, while White people are only stopped when it seems there is some risk.
We can also change the axis to plot the suspects by city/height/age, which allows us to further break down the problem with this program. When we group by city, we will notice that the cities with larger minority populations, such as Bronx's, Brooklyn, and Queens are much more targeted, while cities like Manhattan and Staten Island are more left alone. If we change the axis again, we can break down each city by race as well, and see this disparity more clearly. It’s important to note that in cities like Manhattan, minorities are much more targeted than white people, despite being 47% White and 17% African American.  
Here are some of the questions that we plan to ask during the demo.

X: race Y: height Z: age
Any anomalies in age?
Can you say anything about the people that were not searched/frisked /contraband?
X: race Y: city Z: age
In cities specifically Manhattan, which race is troubled the most?
Any relation based on the combination of frisked, searched, contraband with respect to arrested or not?
X: race Y: city Z: forced
Any relation between force used and build?

## Challenges
The first challenge was finding a data set that allows for some exploration and a “hidden story” to be uncovered by Virtual Reality. Originally we were using car data, but inspired by a news story of a Machine Learning professor using the Stop and Frisk data to uncover the racial biases of the program, we decided to try to uncover the same patterns using this data. After that, we needed a system that was both generic enough to be able to experiment with different patterns, as well as specific enough to really showcase this data specifically. One of the main problems was that so much of the data was binary values, or otherwise discrete points (e.g. cities numbered 1-6), and plotting too many discrete points against each other lead to jumbled data. We opted to start with a simple 3D plotting program, and then added features that allowed certain columns to be displayed as other features, such as shape/size/color. We were originally going to add other features, such as particle effects, but none of the computers we had access to were powerful enough to render it for our data. That is when we came up with the RGB idea, to be able to concisely display 3 binary features without too many complications. We also added the textbox at the bottom with additional data, so that users can see all the data they miss on the screen. We also had to write a CSV parser for Unity (which also dealt with blank values), since Unity does not come pre built with one. Finally, Arya’s computer got destroyed early into the project, meaning data analysis could only really happen when both of them were together.  OSVR had many rendering issues (errors like “Failed to create RenderManager”). Also, it doesn't have wide field of view that limits the rendering area. Also the low resolution also affected the viewing experience.

## The “Point” of VR
Some naysayers might argue that data visualization in Virtual Reality is fairly useless, and the same trends can be shown in 2D scatterplots, making VR just a headache with no extra benefits. While I agree that any trends can certainly be shown in a 2D space (and in fact we have linked a very good visualization in the sources), the stories created by 2D space are much more artificial than the ones that we can show in VR. With the 2D graphs, the author basically decides what story to tell, and that story is spoonfed to the audience. However, VR allows a lot more data to be displayed, which allows the user to not only get more out of the data, but actually come to their own conclusions much more naturally, and even find new patterns on their own.




Sources
Data set and statistics from: http://www.nyclu.org/content/stop-and-frisk-data 
Data set codebook: https://drive.google.com/file/d/0B8a49uSgciSMQjNIYzl0eEozZm8/view 
WIkipedia Article on Stop and Frisk: https://en.wikipedia.org/wiki/Stop-and-frisk_in_New_York_City 
Demographics of Manhattan: https://en.wikipedia.org/wiki/Demographics_of_Manhattan 
Machine Learning article: http://columbiaspectator.com/opinion/2016/04/04/machine-learning-and-stop-and-think
2D Visualization: http://bklynr.com/all-the-stops/ 
Report on above visualization: http://www.citylab.com/politics/2013/09/there-are-lot-ways-visualize-stop-and-frisk-one-best/6835/ 
