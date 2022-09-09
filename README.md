# Welcome to Spin That Wheel

For a while now, I've been searching for a Wheel spinner that supports multiple categories. I wanted it for guitar practice 
(e.g. play random scale at a random position) but I wrote it in a way that it can support any dataset.

Try it out for your self at [here](https://kaloisi.github.io/spinner)


# Custom Spinners

You can provide your own dataset by adding a URL parameter that points to any URL on the web. The file is just a JSON Array or Arrays
for instance:
```
[
   ["C", "G", "D", "A", "E", "B", "F#", "Db", "Ab" , "Eb", "Bb", "F"],
   ["First", "Second", "Third", "Forth", "Firth"],
   ["Major-7", "Dom-7", "Minor-7"]
]
```

Check out all of the ones I've created (https://github.com/kaloisi/spinner/blob/main/public/spinners/)

Once, you've selected or created your file you just add the url parameter to the existing URL.
Like this : https://kaloisi.github.io/spinner/?url=spinners/scale_positions_keys.json


# Too complicated?

Feel free to reach out. I'm also happy to create the spinner file for your and post it with me.

Thanks for reaching...





