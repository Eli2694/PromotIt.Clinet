import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { TwitterApi } from 'twitter-api-v2';
const twitterClient = new TwitterApi(process.env.Bearer_Token);

app.use(express.json()); // middleware => string format to json format
app.use(cors());

const readOnlyClient = twitterClient.readOnly;

app.get('/api/username/:username', async function (req, res) {
  if (!username || typeof username !== 'string') {
    // username is not defined or is not a string, so we return an error
    return res.status(400).send({ error: 'username must be a string' });
  }
  let username = req.params.username;
  const user = await readOnlyClient.v2.userByUsername(username);
  console.log(username);
  res.send(user.data.id);
});

app.get('/api/setTimeline', function (req, res) {
  let now = new Date();
  let year = now.getFullYear(); // current year (4 digits)
  let month = now.getMonth(); // current month (0-11)
  let day = now.getDate(); // current day of the month (1-31)
  let hours = now.getHours(); // current hour (0-23)
  let minutes = now.getMinutes(); // current minute (0-59)
  let seconds = now.getSeconds(); // current second (0-59)
  //let dateString = `${year}-${month + 1}-${day} ${hours}:${minutes}:${seconds}`;
  const options = {
    since: `${year}-${month + 1}-${day} ${hours}:${minutes}:${seconds}`,
    until: `${year}-${month + 1}-${day} ${hours + 1}:${minutes}:${seconds}`,
  };
  res.send(options);
});

app.get('/api/userTweets/:userId/:timeLine', async function (req, res) {
  if (!Id) {
    // userId is not defined or is falsy, so we return an error
    return res.status(400).send({ error: 'userId is required' });
  }

  if (
    typeof timeLine !== 'object' ||
    Object.prototype.toString.call(timeLine) !== '[object Object]'
  ) {
    // timeLine is not an object, so we return an error
    return res.status(400).send({ error: 'timeLine must be an object' });
  }

  let Id = req.params.userId;
  let time = req.params.timeLine;
  const tweets = await client.v2.userTimeline(Id, time);
  console.log(tweets);
  res.send(tweets);
});

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});
