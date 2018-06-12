# mapz

procedurally generated 2D world made using javascript and cellular automaton. the blue is water (the lowest elevation and most common), the lighter green is grass and is allowed clump together at a larger rate than dark green, but still has to obey rules unlike water. Then the dark green (highest elevation for now) is only able to spawn if a green square is surrounded by *6* other green squares, the light green is replaced with dark green making it a hill.

## Getting Started
just run the command below, this builds it with webpack and opens the built files in you prefered internet browser.

1. ```npm start```

## Pix of mapz
![example pictures](images/Group.png)