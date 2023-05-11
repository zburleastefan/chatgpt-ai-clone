import query from '@/lib/queryApi';
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from "firebase-admin";
import { adminDb } from '@/src/firebase/adminConfig';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {prompt, chatId, model, auth} = req.body;
    
    if (!prompt) {
        res.status(400).json({answer: "Please provide a prompt!"});
        return;
    }

    if (!chatId) {
        res.status(400).json({answer: "Please provide a valid chat ID!"});
        return;
    }

    // ChatGPT query - response 
    let response = await query(prompt, chatId, model);
    
    const message: Message = {
        text: response || "ChatGPT was unable to find an answer for that!",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "ChatGPT",
            name: "ChatGPT",
            avatar: "/favicon.ico",
        },
    };

    if (!message.text || message.text == '') {
        res.status(400).json({answer: "Could not find an answer! Please try again."});
        return;
    }
    
    // add message to firestore DB
    await adminDb
    .collection("users")
    .doc(auth?.currentUser?.uid)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

    let resMessage = '';
    if (res.statusCode != 200) {
        resMessage = "Error: " + res.statusCode.toString() + " " + res?.statusMessage;
    } else {
        resMessage = message.text;
    }
    // console.log(res.statusCode + " : Status Message from askQuestion API : " + res.errored?.message);
    res.status(200).json({ answer: resMessage});
}