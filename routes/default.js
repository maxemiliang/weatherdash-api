module.exports = (express, models = []) => {

  const router = express.Router();

  router.get('/', async (req, res) => {
    const json = {
      response: 'OK!',
      message: 'Hello world!',
    };
    res.send(json);
  });

  return router;
};