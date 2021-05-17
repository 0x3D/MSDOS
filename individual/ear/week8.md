# Individual Reflection for week 8
Reflection from Erik Anttila Ryderup on week 8.

## What do I want to learn or understand better?
Last week I wanted to learn how to implement a backend using Java, I was able to
implement that this week. I didn't quite get the passwords working with the new
java backend but I think that it won't be hard now that the program has a proper
backend. The only problem I see is that the generated users also need the
password hashed. Also the settings should be saved in server so that the admin
don't have to ensure all the users have the correct settings in localstorage on
their local client! Illegal data should just be dropped directly and never
entered. This can easily be fixed in the java code (or directly in SQL).

I looked into using a RESTful service but since it is quite late in the project
I decided to recreate the data that the old server already did. 

Also I wanted to learn how to structure the code in a better way. This was
something I were not able to do this week. 

Next week I would like to learn how to package the webapp and server application
so that it can be distributed easily without asking the customer to install
development software to run the program! I will find information about this by
searching the web. I think it is pretty easy with node using `npm package` and
`mvn package`. I would also like to learn a bit about how documentation usually
are structured in projects so that it will be easy for a new teammember or
someone from the internet to take our code and extend it. It may fit their
application. 

Next week I still have the goal to structure the code better as I wanted to last
week. My plan how to accomplish this hasn't changed. I will look at how other
projects have structured their code. I will again search github. 

## How can I help someone else, or the entire team, to learn something new?
Last week I wanted to help the team with coding related quesitons and git. I
made sure that I answered questions in chat and were present during Zoom coding
sessions so that I could provide speedy help to teammembers that needed it. 

I also looked at my teammembers pull requests to see that they were good and
left comments where it were needed. 

I told the team that I have the role scrummaster and that it means that I am
ready to help them. 

Next week I will continue being active in slack, facebook messenger, on github
and in zoom. A new thing next week is that we should start writing the final
report on monday. I think I will be able to help with proper language and
grammar so I will tell my team that they can tag me in a comment and I will read
what they wrote and try to provide input on what to change. And if I think it's
good. We have already done this in earlier weeks when we wrote the
teamreflection together. But I will remind everyone so the entire team knows it
is a resource that is available. I have done this with earlier teams and in my
experience it makes the writing process easier and the result better. 

## What is my contribution towards the team’s use of Scrum?
Last week I said that I would help the team with obstacles so that they could
focus on coding. I told my team that I were available but noone asked me for
help.

Just like last week I had a sprint planning. Made sure that the Trello board was
updated and that people knew what to work on. A problem with our scrum use was
that it has happend that teammember work on the same thing. I identified the
problem and talked to the team how we can avoid that this happens again. 

I took a look at the environment but I didn't really find any problems that I
could solve for the team. As it is near the end in all courses I know a lot of
teammembers have exams coming up and some have bachelor's thesis. This disturbs
the work but nothing can really be done about it. 

This week the team was not available to have the Sprint Review on friday so I
moved it to monday when everyone can be present.

Next week I will have the scrum meetings. Check so that the trello board is
updated.

## What is my contribution towards the team’s deliveries?
Last week I wanted to get the System Design Document in a better state than it
is. This week I think that it is ok. It could always be improved but continuing
to write in that document is time that could be better spent fixing bugs,
writing the final report or make the last few changes to make the application
ready to ship.

This week I wrote the new java backend server. I fixed bugs. I improved the Travis
workflow so that it starts the server before building and testing. I merged the
code that checks so that you can't book too many times. I reviewed all the pull
requests that were published. And I helped the team write the Team Reflection.

Next week I will look into packaging the project so that it can be run without
devtools. I will help the team write the final report. I will help writing that
weeks team reflection and I will implement code to move the project into a state
where it is almost finished.
