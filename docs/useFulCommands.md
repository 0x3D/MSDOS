# To run the jsonServer

1. Navigate to jsonPlaceHolder folder
2. Then run ``` npm run json:server```

# To generate UML

1. Navigate to MSDOS folder
2. Then run ``` npx depcruise --exclude "^node_modules" --output-type dot src | dot -T svg > dependencygraph.svg ```
3. Move the svg file to docs folder and delete the older version

