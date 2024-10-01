const clarifai = require('clarifai');

  const returnClarifaiRequestOptions = (imageUrl) =>{

  const PAT = '36108aa38dd744aa9d67c46f6c47a3eb';
  const USER_ID = 'jr291092';
  const APP_ID = 'face-recognition';
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                    // "base64": IMAGE_BYTES_STRING
                }
            }
        }
    ]
});
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
};
return requestOptions;
}

const handleApiCall = (req, res) =>{

const requestOptions = returnClarifaiRequestOptions(req.body.input)

 fetch("https://api.clarifai.com/v2/models/" + 
'face-detection' + "/outputs", requestOptions)
 .then(response => response.json())
 .then(data => {
  if (data) {
    res.json(data);
  } else {
    res.status(400).json('No data returned from Clarifai API')
  }
 })
 .catch(err => {
      console.error('Error contacting Clarifai API:', err);  // Log the error
      res.status(400).json('Unable to contact Clarifai API');  // Return error to frontend
    });
}



const handleImageReq = (req, res, db) => {
const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries =>{
    res.json(entries[0].entries);
})
  .catch(err => res.status(400).json('unable to respond'));

}

module.exports = {
 handleImageReq,
 handleApiCall
};