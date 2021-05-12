# To run the jsonServer

1. Navigate to jsonPlaceHolder folder
2. Then run ``` npm run json:server```

# To generate UML

1. Navigate to MSDOS folder
2. Then run ``` npx depcruise --exclude "^node_modules" --output-type dot src | dot -T svg > dependencygraph.svg ```
3. Move the svg file to docs folder and delete the older version
4. You need to install multiple things to make this work, ask @axelher@student.chalmers.se

# To Run the tests
1. Open a teminal and navigate to folder MSDOS
2. Run the command 
```
npm run test
```

3. This will run all our tests
