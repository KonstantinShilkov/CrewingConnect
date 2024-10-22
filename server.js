const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.post('/api/getAnswer', async (req, res) => {
  const { modelUri, completionOptions, messages } = req.body;

  const data = {
    modelUri,
    completionOptions,
    messages,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Api-Key AQVNxE9PZ2bvz3MALLGVzgBxmnCeZQ-fohW5T3cm',
      'x-folder-id': 'b1gnd2qf7vdt46956g5e',
    },
  };

  try {
    const response = await axios.post(
      'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
      data,
      config
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from YandexGPT' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
