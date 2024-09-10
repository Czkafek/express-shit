import express, { response } from 'express'

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [ {id: 1, username: 'ansons', displayName: 'Ansons'},
                    {id: 2, username: 'jack', displayName: 'Jack'},
                    {id: 3, username: 'adam', displayName: 'Adam'},
                    {id: 4, username: 'white', displayName: 'White'},
                    {id: 5, username: 'mata', displayName: 'Mata'},
                    {id: 6, username: 'lotka', displayName: 'Lotka'}, 
                    {id: 7, username: 'mefiu', displayName: 'Mefiu'} ];

app.get("/", (request, response) => {
    response.status(201).send({msg: 'Hello'});
}); 

app.get('/api/users', (request, response) => {
    console.log(request.query);
    const {query: {filter, value}} = request;   // destructuring
    
    if(filter && value) return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
    );
    
    return response.send(mockUsers); 
});

app.get('/api/users/:id', (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if(isNaN(parsedId)) return response.status(400).send({msg: "Bad Request, Invalid ID"});

    const findUser = mockUsers.find((user) => user.id === parsedId);
    if(!findUser) return response.sendStatus(404);
    return response.send(findUser);
});

app.get('/api/products', (request, response) => {
    response.send([ {id: 123, name: 'chicken breast', price: 12.99},
                    {id: 234, name: 'Lego car', price: 222.99} ]);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});

