module.exports = (express, models = []) => {

  const router = express.Router();

  router.get('/', async (req, res) => {
    const json = {
      response: 'OK!',
      message: 'Hello world!',
    };
    res.json(json);
  });

  router.get('/healthz', async (req, res) => {
    const json = {
      response: 'healthy!',
    };
    res.json(json);
  });

  return router;
};