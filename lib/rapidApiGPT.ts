import axios from "axios";

export const rapidApiGPT = async (prompt: string) => {
  const options = {
    method: 'POST',
    url: 'https://chatgpt53.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    }
  };
    
  let err = '';
  try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
  } catch (error: any) {
      err = error;
      console.error(error);
  }
  return err ? err : 'rapid api GPT error!';
}