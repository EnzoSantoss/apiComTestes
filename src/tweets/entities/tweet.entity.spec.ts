import mongoose from 'mongoose';
import { Tweet, TweetSchema } from './tweet.entity';
describe('Tweet Tests', () => {
  it('Should create a tweet', () => {
    const tweet = new Tweet({
      content: 'Hello world',
      screen_name: 'Luiz Carlos',
    });

    expect(tweet.content).toBe('Hello world');
    expect(tweet.screen_name).toBe('Luiz Carlos');
  });

  it('create a tweet document', async () => {
    const conn = await mongoose.connect(
      'mongodb://root:root@db:27017/tweets_test?authSource=admin',
    );

    const tweetModel = conn.model('Tweets', TweetSchema);

    const tweet = new tweetModel({
      content: 'Hello world',
      screen_name: 'Luiz Carlos',
    });
    try {
      await tweet.save();
    } catch (e) {
      console.error(e);
    }
  });
});
