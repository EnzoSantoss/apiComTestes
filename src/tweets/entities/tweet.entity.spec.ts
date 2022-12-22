import mongoose from 'mongoose';
import { async } from 'rxjs';
import { Tweet, TweetSchema } from './tweet.entity';
describe('Tweet Tests', () => {
  describe('Tweet Class', () => {
    it('Should create a tweet', () => {
      const tweet = new Tweet({
        content: 'Hello world',
        screen_name: 'Luiz Carlos',
      });

      expect(tweet.content).toBe('Hello world');
      expect(tweet.screen_name).toBe('Luiz Carlos');
    });
  });

  describe('Using mongoDB', () => {
    let conn: mongoose.Mongoose;

    beforeEach(async () => {
      conn = await mongoose.connect(
        'mongodb://root:root@localhost:27017/tweets_entity_test?authSource=admin',
      );
    });

    afterEach(async () => {
      await conn.disconnect();
    });
    it('create a tweet document', async () => {
      const tweetModel = conn.model('Tweets', TweetSchema);

      const tweet = new tweetModel({
        content: 'Hello world',
        screen_name: 'Luiz Carlos',
      });

      await tweet.save();
      const tweetCreated = await tweetModel.findById(tweet._id);
      console.log(tweetCreated);

      expect(tweetCreated.content).toBe('Hello world');
      expect(tweetCreated.screen_name).toBe('Luiz Carlos');
    });
  });
});
