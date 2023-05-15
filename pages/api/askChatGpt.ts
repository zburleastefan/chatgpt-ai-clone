import query from '@/lib/queryApi';
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from "firebase-admin";
import { ref, set } from 'firebase/database';
import { realtimeDB } from '@/firebase/firebaseConfig';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {prompt, model, auth} = req.body;
    let d = new Date();
    let hr = d.getHours();
    let min = d.getMinutes().toString();
    let sec = d.getSeconds().toString();
    if (sec.length == 1) { sec = `0${sec}`; }
    if (min.length == 1) { min = `0${min}`; }
    let date = d.getDate();
    let year = d.getFullYear();
    const currentDate = year + "" +  d.getDay()  + "" +  date + hr + "" + min + "" + sec;

    if (!prompt) {
        res.status(400).json({answer: "Please provide a prompt!"});
        return;
    }

    // ChatGPT query - response 
    let gptResponse = await query(prompt, model);

    // send GPT msg to realtime DB
    await set(ref(realtimeDB, 'users/' + auth?.currentUser?.uid! +`/${currentDate}ChatGPT`), {
        text: gptResponse,
        createdAt: d.toLocaleString(),
        userId: 'ChatGPT',
        userEmail: 'https://openai.com/',
        userName: 'ChatGPT',
        userAvatar: "/favicon.ico",
    }).then(async () => {
        console.log('Data from gpt set succesfully!')
    }) 

    // console.log(res.statusCode + " : Status Message from askQuestion API : " + res.errored?.message);
    res.status(200).json({ answer: gptResponse!});
}