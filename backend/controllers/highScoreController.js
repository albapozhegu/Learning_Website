const {
    updateTop,
    getLeaderboardWithName,
    getScore,
    updateScore,
    createScore
  } = require('../services/highScoreService');
  
  exports.putUpdateHighScore = async (req, res, next) => {
    try {
      const { name, score } = req.body;
      console.log(req.user.id)
      const accountId = req.user?.id;
      if (!accountId) {
        return res.status(500).json({ message: 'Service error, try again later' });
      }
  
      await updateTop({accountId, name, score});
    } catch (error) {
      console.error('PUT UPDATE HIGHT SCORE ERROR: ', error);
      return res.status(500).json({ message: 'Service error, try again later' });
    }
  };

  exports.postScore = async (req, res, next) => {
    try {
      const { name, coin } = req.body;
   // req.user
      const accountId = req.user?.id;
    //  console.log(accountId)
      if (!accountId) {
        return res.status(500).json({ message: 'Service error, try again later' });
      }
  
      const checkExisted = await getScore(name, accountId);
    //  console.log(accountId)
      if(checkExisted == null){
      await createScore({accountId, name, coin});
      }
      else{
        if(checkExisted.coin < coin){
          await updateScore(coin, checkExisted._id);
        }
      }
      return res.status(200).json({ message: 'success' });
    } catch (error) {
      console.error('ERROR: ', error);
      return res.status(500).json({ message: 'Service error, try again later' });
    }
  };
  
  exports.getLeaderboard = async (req, res, next) => {
    try {
      const { name } = req.query;
   
      if (!Boolean(name)) {
        return res.status(400).json({ message: 'failed' });
      }
      

      const list = await getLeaderboardWithName(name);
      return res.status(200).json({ list });
    } catch (error) {
      console.error('GET LEADERBOARD ERROR: ', error);
      return res.status(500).json({ message: 'Service error, try again later' });
    }
  };
