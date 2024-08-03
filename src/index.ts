import server from './server';

const port = process.env.PORT || 3006;

server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
