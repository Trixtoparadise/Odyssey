import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const app = express();   
const prisma = new PrismaClient();
const corsOptions = {
  origin: "http://localhost:5000",
  credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorised' });
  }
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthoriized' });
    }
    req.user = decoded;
    next();
  });
};


app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).send("All fields required");
  }
  
  try {
    const user = await prisma.user.findUnique({
        where: {
          Username: username,
        }
      });

      if (!user) {
        return res.status(401).send('Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(password, user.Password);
      if (!passwordMatch) {
        return res.status(401).send('Invalid credentials');
      }
      
      const token = jwt.sign({ Username: user.Username }, 'secret');
      res.status(200).json(token);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.post("/api/signup", async (req, res) => {
  const { id, phoneNumber, username, password } = req.body;
  
  if ( !id || !phoneNumber || !username || !password) {
    return res.status(400).send("All fields required");
  }

  try {
    const exID = await prisma.user.findUnique({
      where: {
        ID_number: id
      }
    });

    const exPhoneNumber = await prisma.user.findUnique({
      where: {
        Phone_number: phoneNumber
      }
    });

    const exUsername = await prisma.user.findUnique({
      where: {
        Username: username
      }
    });

    if (exID) {
      return res.status(400).send('ID already exists');
    }
    
    if (exPhoneNumber) {
      return res.status(400).send('Phone number already exists');
    }
    
    if (exUsername) {
      return res.status(400).send('Username already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { ID_number: id, Phone_number: phoneNumber, Username: username, Password: hashedPassword },
    });

    const token = jwt.sign({ Username: user.Username }, 'secret');
    res.status(200).json({ token });
    
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.get("/api/user", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        Username: req.user.Username
      }
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ id: user.ID_number, phoneNumber: user.Phone_number, username: user.Username });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error'})
  }
})



app.post("/api/gethome", async (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).send("No Id provided");
  }
  
  try {
    const accounts = await prisma.account.findMany({
        where: {
          Account_holder_Id: parseInt(id)
        }
    });

    const beneficiaries = await prisma.beneficiary.findMany({
      where: {
        User_ID: parseInt(id)
      }
    });

    if (!accounts) {
      return res.status(401).send('Accounts not found');
    }

    if (!beneficiaries) {
      return res.status(401).send('Beneficiaries not found');
    }
    res.status(200).json({accounts, beneficiaries});

  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.post("/api/account", async (req, res) => {
  const {id, firstName, lastName, accountType, pin } = req.body;
  
  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  let accountNumber = getRandomInt(1500000000, 1599999999);

  if ( !id || !firstName || !lastName || !accountType || !pin) {
    return res.status(400).send("All fields required");
  }

  try {
    const exAccountNumber = await prisma.account.findUnique({
      where: {
        Account_number: accountNumber
      }
    });

    if (exAccountNumber) {
      return res.status(400).send('Account already exists');
    }

    const account = await prisma.account.create({
      data: { Account_number: accountNumber, First_name: firstName, Last_name: lastName, Pin: pin, Balance: 0.00, Account_holder_Id: id, Account_Type: accountType },
    });

    res.status(200).json( { account });
    
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.post("/api/getaccount", async (req, res) => {
  const { accNo } = req.body;

  try {
    const account = await prisma.account.findUnique({
      where: {
        Account_number: accNo
      }
    })
    if (!account) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ accountNumber: account.Account_number, firstName: account.First_name, lastName: account.Last_name, accountType: account.Account_Type });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error'})
  }
});

app.post("/api/getUserAccounts",  async (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).send("All fields required");
  }
  
  try {
    const accounts = await prisma.account.findMany({
        where: {
          Account_holder_Id: parseInt(id)
        }
      });

      if (!accounts) {
        return res.status(401).send('Invalid credentials');
      }
      res.status(200).json(accounts);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.post("/api/getUserAccountNumbers",  async (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).send("All fields required");
  }
  
  try {
    const accounts = await prisma.account.findMany({
        where: {
          Account_holder_Id: parseInt(id)
        }  
      });

      if (!accounts) {
        return res.status(401).send('Invalid credentials');
      }

      let accNumbers = accounts.map((account) => {return {accountHolderId: account.Account_holder_Id, member: account.First_name + " " + account.Last_name ,label: "Mr " + account.First_name + " " + account.Last_name + " (" + account.Account_Type + ") " + account.Account_number , value: account.Account_number, balance: account.Balance}});
      res.status(200).json(accNumbers);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});



app.post("/api/addbeneficiary", async (req, res) => {
  const {id, beneficiaryName, accountNumber, bank } = req.body;

  if ( !id || !beneficiaryName || !accountNumber || !bank) {
    return res.status(400).send("All fields required");
  }

  try {
    const exAccountNumber = await prisma.beneficiary.findUnique({
      where: {
        Account_number: accountNumber
      }
    });

    if (exAccountNumber) {
      return res.status(400).send('Account already exists');
    }

    const beneficiary = await prisma.beneficiary.create({
      data: { Bank: bank, Account_number: accountNumber, Beneficiary_name: beneficiaryName, User_ID: id }
    });

    res.status(200).json({ beneficiary });
    
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.post("/api/getbeneficiary", async (req, res) => {
  const { accNo } = req.body;

  try {
    const account = await prisma.account.findUnique({
      where: {
        Account_number: accNo
      }
    })
    if (!account) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ accountNumber: account.Account_number, firstName: account.First_name, lastName: account.Last_name, accountType: account.Account_Type });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error'})
  }
});

app.post("/api/getUserBeneficiaries",  async (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).send("All fields required");
  }
  
  try {
    const beneficiaries = await prisma.beneficiary.findMany({
      where: {
        User_ID: parseInt(id)
      }
    });

    if (!beneficiaries) {
      return res.status(401).send('Invalid credentials');
    }
    res.status(200).json(beneficiaries);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});



app.put("/api/makeaccountpayment", async (req, res) => {
    const { accountNumber, recAccountNumber, amount, balance, recBalance } = req.body;

    if (!accountNumber || !amount) {
        return res.status(400).send("All fields are required");
    }

    if (amount > balance) {
        return res.status(400).send("Please enter a valid amount")
    }

    try {
        const updatedBalance = await prisma.account.update({
            where: { Account_number: accountNumber },
            data: { Balance: parseFloat(balance) - parseFloat(amount)}
        });

        const updatedRecBalance = await prisma.account.update({
            where: { Account_number: recAccountNumber},
            data: {Balance: parseFloat(recBalance) + parseFloat(amount)}
        })
        res.json({ updatedBalance, updatedRecBalance});
    } catch (error) {
        res.status(500).send("Oops, something went wrong");
    }
});

app.put("/api/makebeneficiarypayment", async (req, res) => {
  const { accountNumber, amount, balance } = req.body;

  if (!accountNumber || !amount) {
      return res.status(400).send("All fields are required");
  }

  if (parseFloat(amount) > parseFloat(balance)) {
      return res.status(400).send("Please enter a valid amount")
  }

  try {
      const updatedBalance = await prisma.account.update({
          where: { Account_number: accountNumber },
          data: { Balance: parseFloat(balance) - parseFloat(amount)}
      });

      res.status(200).json(updatedBalance);
  } catch (error) {
      res.status(500).send("Oops, something went wrong");
  }
});

app.post("/api/recordAccountTransaction", async (req, res) => {
  const { balance, recBalance, amount, member, recMember, accountNumber, recAccountNumber } = req.body;

  if ( !balance || !amount || !member || !accountNumber || !recBalance || !recMember || !recAccountNumber ) {
    return res.status(400).send("Error recording transaction");
  }
  
  try {
    const transaction = await prisma.transaction.create({
      data: { Date: new Date(), Balance: parseFloat(balance) , Amount: amount, Member: member, Account_number: accountNumber, Sent_Received: "-" },
    });

    const recTransaction = await prisma.transaction.create({
      data: { Date: new Date(), Balance: parseFloat(recBalance) , Amount: amount, Member: recMember, Account_number: recAccountNumber, Sent_Received: "+" },
    })

    res.status(200).json({transaction, recTransaction});

  } catch (error) {
    res.status(500).send('Internal server error!');
  }
});

app.post("/api/recordBeneficiaryTransaction", async (req, res) => {
  const { balance, amount, member, accountNumber } = req.body;

  if ( !balance || !amount || !member || !accountNumber ) {
    return res.status(400).send("Error recording transaction");
  }
  
  try {
    const transaction = await prisma.transaction.create({
      data: { Date: new Date(), Balance: parseFloat(balance) - parseFloat(amount), Amount: amount, Member: member, Account_number: accountNumber, Sent_Received: "-" },
    });

    res.status(200).json({transaction});

  } catch (error) {
    res.status(500).send('Internal server error!');
  }
});

app.get("/api/getTransactions",  async (req, res) => {
  
  try {
    const transactions = await prisma.transaction.findMany({  
    });

    if (!transactions) {
      return res.status(401).send('Invalid credentials');
    }

    let statements = transactions.map((transaction) => {return {Date: transaction.Date.toDateString(), Description: transaction.Sent_Received + " R" + transaction.Amount, Time: transaction.Date.toLocaleTimeString(), Balance: transaction.Balance ,id: Math.floor(Math.random() * 100), title:"AccNo: "  + transaction.Account_number + " , " + transaction.Sent_Received + " R" + transaction.Amount +" "+ "\n" + "Ref: " + Math.floor(Math.random() * 100000000) + " " + transaction.Member + "\n" + transaction.Date}});
    res.status(200).json(statements);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});



app.post("/api/createNotification", async (req, res) => {
  const { id, recId, amount, member, recMember } = req.body;
  
  if (!id && recId) {
    res.status(400).send('No IDs available');
  }

  try {
    if (!recId) {
      const notification = await prisma.notification.create({data: { Message: "Odyssey Bank Notification: " + "-" + "R" + amount + ". Ref: " + member + ", " + new Date().toDateString() + ", " + new Date().toLocaleTimeString() , ID_number: id}});
      res.status(200).json(notification);
    }  

    if (id && recId) {
      const notification = await prisma.notification.create({data: { Message: "Odyssey Bank Notification: " + "-" + "R" + amount + ". Ref: " + member + ", " + new Date().toDateString() + ", " + new Date().toLocaleTimeString() , ID_number: id}});
      const notification2 = await prisma.notification.create({data: { Message: "Odyssey Bank Notification: " + "+" + "R" + amount + ". Ref: " + recMember + ", " + new Date().toDateString() + ", " + new Date().toLocaleTimeString() , ID_number: recId}});
      res.status(200).json({ notification, notification2 });
    }
  } catch (e) {
    res.status(500).send('Internal server error');
  }
});

app.get("/api/getNotifications",  async (req, res) => {
  
  try {
    const notifications = await prisma.notification.findMany({  
    });

    if (!notifications) {
      return res.status(401).send('No notifications');
    }

    let statements = notifications.map((notification) => {return {id: notification.Notification_ID, title: notification.Message}});
    res.status(200).json(statements);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});



app.delete("/api/DeleteBeneficiary", async (req, res) => {
  const { accountNumber } = req.body;

  if (!accountNumber || isNaN(accountNumber)) {
      return res.status(400).send("Need correct account number to delete");
  }

  try {
      await prisma.beneficiary.delete({
          where: { Account_number: accountNumber },
      });

      res.status(204).send();
  } catch (error) {
      res.status(500).send("Oops, something went wrong");
  }
});

app.delete("/api/closeAccount", async (req, res) => {
    const { accountNumber } = req.body;

    if (!accountNumber || isNaN(accountNumber)) {
        return res.status(400).send("Need correct account number to delete");
    }

    try {
        await prisma.account.delete({
            where: { Account_number: accountNumber },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).send("Oops, something went wrong");
    }
});

app.delete("/api/DeleteProfile", async (req, res) => {
  const { id } = req.body;

  if (!id || isNaN(id)) {
      return res.status(400).send("Need correct id to delete");
  }

  try {
      await prisma.user.delete({
          where: { ID_number: id },
      });

      res.status(204).send();
  } catch (error) {
      res.status(500).send("Oops, something went wrong");
  }
});

app.listen(5000, () => {
    console.log("server running on localhost:5000");
})
