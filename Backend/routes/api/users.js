const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      user = new User({
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      console.log('__New User added.' + Date('Y-m-d'));

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/users/userInfo
// @desc     Get current user info
// @access   Private
router.get('/userInfo', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/users/:id
// @desc     Get user by ID
// @access   Public
router.get('/user/:id', checkObjectId('id'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    console.log('___ Getting user.' + Date('Y-m-d'));
    console.log(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/users
// @desc     Get all users
// @access   Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/users/newAccount
// @desc     New Account Create
// @access   Public
router.get('/newAccount', async (req, res) => {
  try {
    const account = await web3.eth.personal.newAccount('asdf');
    console.log('___new account created ' + account);
    res.status(200).json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/users/sendToken
// @desc     Send token
// @access   Public
router.post('/sendToken', async (req, res) => {
  try {
    const { fromAddress, toAddress, value } = req.body;
    const gas = 21000;
    console.log(fromAddress);
    // Confirm balance from fromAddress.
    const balance = await web3.eth.getBalance(fromAddress);
    console.log(gas);
    if (value > balance) {
      return res.status(400).json({
        errors: [{ msg: 'Please send more less than your Balance.' }]
      });
    }

    // Send Transaction
    const transaction = await web3.eth.sendTransaction(
      {
        from: fromAddress,
        gasPrice: '20000000000',
        gas: gas,
        to: toAddress,
        value: value,
        data: ''
      },
      'MyPassword!'
    );

    // Get coin_balance & update coin_balance

    return res.status(200).json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

function getDateTimeFromTimestamp(unixTimeStamp) {
  let date = new Date(unixTimeStamp);
  return (
    ('0' + date.getDate()).slice(-2) +
    '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    date.getFullYear() +
    ' ' +
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2)
  );
}

// @route    GET api/users/getPastLogs/:account
// @desc     Send token
// @access   Public
router.get('/getPastLogs/:account', async (req, res) => {
  try {
    var myAddr = req.params.account;
    var currentBlock = await web3.eth.getBlockNumber();
    var n = await web3.eth.getTransactionCount(myAddr, currentBlock);

    const logs = [];
    var bal = await web3.eth.getBalance(myAddr, currentBlock);
    for (var i = currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
      try {
        var block = await web3.eth.getBlock(i, true);
        var timestamp = block.timestamp;
        var date = new Date(timestamp * 1000);
        const time =
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear() +
          ' ' +
          date.getHours() +
          ':' +
          date.getMinutes() +
          ':' +
          date.getSeconds();

        // console.log(block);
        if (block && block.transactions) {
          block.transactions.forEach(function (e) {
            // console.log(e);
            if (myAddr == e.from) {
              if (e.from != e.to) bal += e.value;
              const row = {
                block_number: i,
                from: e.from,
                to: e.to,
                time: time,
                value: e.value.toString(10)
              };
              logs.push(row);
              --n;
            }
            if (myAddr == e.to) {
              if (e.from != e.to) bal -= e.value;
              const row = {
                block_number: i,
                from: e.from,
                to: e.to,
                time: time,
                value: e.value.toString(10)
              };
              logs.push(row);
            }
          });
        }
      } catch (e) {
        console.error('Error in block ' + i, e);
      }
    }

    console.log('___ Get transaction by account.');
    console.log(logs);

    return res.status(200).json(logs);

    //  res.status(200).json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/users/sqltodb
// @desc     GET user data from old sql db & insert data to mongodb
// @access   Public
router.get('/sqltodb', async (req, res) => {
  try {
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'OXStocksDB'
    });

    con.connect(function (err) {
      if (err) throw err;
      console.log('Connected!');
      var sql = 'SELECT * FROM user';
      con.query(sql, function (err, result) {
        if (err) throw err;

        for (var i = 0; i < result.length; i++) {
          var b = new Buffer(result[i]['password'], 'base64');
          var s = b.toString();

          const user = new User({
            email: result[i]['email'],
            address: result[i]['address'],
            address_data: result[i]['address_data'],
            city: result[i]['city'],
            country: result[i]['country'],
            state: result[i]['state'],
            zipcode: result[i]['zipcode'],
            password: s,
            firstname: result[i]['firstname'],
            middlename: result[i]['middlename'],
            lastname: result[i]['lastname'],
            mobilenumber: result[i]['phoneono'],
            referralcode: result[i]['referral'],
            wallet: result[i]['wallet'],
            coin_balance: result[i]['coin_balance'],
            email_verified: result[i]['email_verified'],
            old_client: true
          });

          console.log('___Old User added.' + Date('Y-m-d'));
          console.log(result[i]);

          user.save();
        }

        res.status(200).send('Old users added.');
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
