import type { NextApiRequest, NextApiResponse } from 'next';
import query from '@/lib/queryApi';
import { prisma } from '@/lib/prismaClient';
import openAi from '@/lib/chatgpt';

type Data = {
    answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method } = req;
    let {prompt, model} = req.body;

    if (!prompt) {
        res.status(400).json({answer: "Please provide a prompt!"});
        return;
    }

    switch (method) {
        case 'GET': 
        //  //Get data from database
        break;
        case 'POST':
            const response = await openAi.createCompletion({
                model,
                prompt,
                temperature: 0.5,
                top_p: 1,       
                max_tokens: 1000,
                frequency_penalty: 0,
                presence_penalty: 0,
                n: 1,
            }).then(response => (response.data.choices[0].text))
            .catch((err) => 
                ` ChatGPT was unable to find an answer for that! Please try again later. (Error: ${err.message})`
            );
            // console.log(response)
            // send the post object back to the client
            res.status(200).json( { answer: response? response : 'ChatGPT was unable to find an answer for that. Please try again later!'});
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}