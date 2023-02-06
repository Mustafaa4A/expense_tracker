import express from 'express';
import {} from  './db/db.js';
import ejs from 'ejs';
import Transaction from './models/Transacrion.js';


const app = express();
const PORT = 9090;

app.set('view engine', 'ejs');
app.engine('ejs', ejs.renderFile);

app.use(express.urlencoded({ extends: true }));
app.use(express.json());
app.use(express.static('./public'));


app.get('/', async (req, res) => {
  const income_count = await Transaction.aggregate([
    {
      $match: { type: 'income' },
    },
    {
      $group: {
        _id: null, income: {
          $sum: '$amount'
        }
      }
    }
  ]);
  const expense_count = await Transaction.aggregate([
    {
      $match: { type: 'expense' },
    },
    {
      $group: {
        _id: null, expense: {
          $sum: '$amount'
        }
      }
    }
  ]);

  const income = income_count.length > 0 ? income_count[0].income : 0;
  const expense = expense_count.length > 0 ? expense_count[0].expense : 0;

  const balance = income - expense;

  const data = await Transaction.find();
  res.render('index', {
    data,
    income,
    expense,
    balance
  });
});

app.post('/add_new_transaction', (req, res) => {
  const transaction = req.body;
  const new_transaction = new Transaction({
      title: transaction.title,
      amount: transaction.amount,
      type:transaction.type
  });
  
  new_transaction.save();
  res.redirect('/');
})
  
  

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
})