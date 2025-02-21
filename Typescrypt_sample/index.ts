import express from 'express';
import { calculator, Operation } from './calculator';

const app = express();

app.get('/ping', (_req, res) => {
    res.send('ponsgs');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/calculate', (req, res): any => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.body;

    if (!value1 || isNaN(Number(value1))) {
        return res.status(400).send({ error: '...' });
    }

    //assert the type
    const operation = op as Operation;

    const result = calculator(Number(value1), Number(value2), operation);


    return res.send({ result });
});
const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});