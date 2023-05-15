import openAi from "./chatgpt";

const query = async (prompt: string, model: string) => {
    const response = await openAi.createCompletion({
        model,
        prompt,
        temperature: 0.3,
        top_p: 1,       
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 1,
    }).then(response => (response.data.choices[0].text))
    .catch((err) => 
        `ChatGPT was unable to find an answer for that! (Error: ${err.message})`
    );
    
    return response;
}; 

export default query;