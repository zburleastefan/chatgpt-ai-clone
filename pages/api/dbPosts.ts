import type { NextApiRequest, NextApiResponse } from 'next';
import query from '@/lib/queryApi';
import { prisma } from '@/lib/prismaClient';

type Data = {
    answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method } = req;
    let {prompt, authorId, email, name, avatar, model} = req.body;

    if (!prompt) {
        res.status(400).json({answer: "Please provide a prompt!"});
        return;
    }

    // if (name == "ChatGPT") {
    //     // ask chatGPT
    //     prompt = await query(prompt, model);
    // }

    switch (method) {
        case 'GET': 
        //  //Get data from database
        // const get = await prisma.post.findMany({});

        // // send the post object back to the client
        // res.status(201).json( { answer: get.toString() });
        break;
        case 'POST':
            // Create or update data in database
            const post = await prisma.post.create({
                data: {
                    title: `Message from ${name}`,
                    content: prompt,
                    authorId: authorId,
                    email: email,
                    name: name,
                    avatar: avatar,
                }
            });

            // send the post object back to the client
            res.status(201).json( { answer: post.toString() });
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
