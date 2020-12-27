const { Order, CartItem } = require("../models/orderModel");
const { errorHandler } = require("../helpers/dbErrorHandler");

// sendgrid for email npm i @sendgrid/mail
// const sgMail = require("@sendgrid/mail");

// const mailer = require("../utils/mailer");
// const mail = require("@sendgrid/mail");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
var smtpTransport = require("nodemailer-smtp-transport");

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:
//         "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",
//     },
//   })
// );

// sgMail.setApiKey('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');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      req.order = order;
      next();
    });
};

// your create order method with email capabilities
exports.createOrder = (req, res) => {
  console.log("CREATE ORDER: ", req.body);

  //   var transporter = nodemailer.createTransport(smtpTransport({
  //     service: 'gmail',
  //     host: 'smtp.gmail.com',
  //     auth: {
  //       user: 'truongminhkhoa1999vn@gmail.com',
  //       pass: 'Pokemon456*'
  //     },
  //     tls: { rejectUnauthorized: false }
  //   }));

  //   var mailOptions = {
  //     from: 'truongminhkhoa1999vn@gmail.com',
  //     to: 'hoangphido43@gmail.com',
  //     subject: 'Sending Email using Node.js[nodemailer]',
  //     text: 'That was easy!'
  //   };

  //   transporter.sendMail(mailOptions, function(error, info){
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });

  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    // User.find({ categories: { $in: categories } }).exec((err, users) => {}
    console.log("ORDER IS JUST SAVED >>> ", order);
    // send email alert to admin
    // order.address
    // order.products.length
    // order.amount

    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.PASSWORD,
        },
        tls: { rejectUnauthorized: false },
      })
    );

    const emailData = {
      to: process.env.EMAIL_TO, // admin
      from: process.env.EMAIL_FROM,
      subject: `A new order is received`,
      html: `
                    <h1>Hey Admin, somebody just made a purchase in your ecommerce store</h1>
                    <h2>Customer name: ${order.user.name}</h2>
                    <h2>Customer address: ${order.address}</h2>
                    <h2>User's purchase history: ${
                      order.user.history.length
                    } purchase</h2>
                    <h2>User's email: ${order.user.email}</h2>
                    <h2>Total products: ${order.products.length}</h2>
                    <h2>Transaction ID: ${order.transaction_id}</h2>
                    <h2>Order status: ${order.status}</h2>
                    <h2>Product details:</h2>
                    <hr />
                    ${order.products
                      .map((p) => {
                        return `<div>
                                <h3>Product Name: ${p.name}</h3>
                                <h3>Product Price: ${p.price}</h3>
                                <h3>Product Quantity: ${p.count}</h3>
                        </div>`;
                      })
                      .join("--------------------")}
                    <h2>Total order cost: ${order.amount}<h2>
                    <p>Login to your dashboard</a> to see the order in detail.</p>
                `,
    };

    //   sgMail
    //   .send(emailData)
    //   .then(sent => console.log('SENT >>>', sent))
    //   .catch(err => console.log('ERR >>>', err));

    //   var mailOptions = {
    //     from: 'truongminhkhoa1999vn@gmail.com',
    //     to: 'hoangphido43@gmail.com',
    //     subject: 'Sending Email using Node.js[nodemailer]',
    //     text: 'That was easy!'
    //   };

    res.status(201).json(data);

    transporter.sendMail(emailData, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // email to buyer
    const emailData2 = {
      to: order.user.email,
      from: process.env.EMAIL_FROM,
      subject: `You order is in process`,
      html: `
              <h1>Hey ${req.profile.name}, Thank you for shopping with us.</h1>
              <h2>Total products: ${order.products.length}</h2>
              <h2>Transaction ID: ${order.transaction_id}</h2>
              <h2>Order status: ${order.status}</h2>
              <h2>Product details:</h2>
              <hr />
              ${order.products
                .map((p) => {
                  return `<div>
                          <h3>Product Name: ${p.name}</h3>
                          <h3>Product Price: ${p.price}</h3>
                          <h3>Product Quantity: ${p.count}</h3>
                  </div>`;
                })
                .join("--------------------")}
              <h2>Total order cost: ${order.amount}<h2>
              <p>Thank you for shopping with us.</p>
          `,
    };

    transporter.sendMail(emailData2, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    //   sgMail
    //     .send(emailData2)
    //     .then(sent => console.log('SENT 2 >>>', sent))
    //     .catch(err => console.log('ERR 2 >>>', err));

    // res.status(201).json(data);

    // const { to, from, subject, html } = emailData;
    // transporter
    //   .sendMail(emailData, (err, data) => {
    //     if (err ){
    //         console.log(error);
    //       }
    //       else {
    //         console.log('Message sent: ' + data);
    //         res.json(data);
    //       }
    //   })
    // res.json(data);
    //   sgMail
    //     .send(emailData)
    //     .then(sent => console.log('SENT >>>', sent))
    //     .catch(err => console.log('ERR >>>', err));
    // async (req, res) => {
    //     try {
    //       // Lấy data truyền lên từ form phía client
    //       const { to, subject, html } = emailData;
    //       await mailer.sendMail(to, subject, html)
    //       // .then(sent => console.log('SENT >>>', sent))
    //       // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
    //       res.send('<h3>Your email has been sent successfully.</h3>')
    //     } catch (error) {
    //       // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
    //       console.log(error)
    //       res.send(error)
    //     }
    //   }
    // await mailer.sendMail(emailData)
    // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
    //  res.send('<h3>Your email has been sent successfully.</h3>')
    //     const emailData = {
    //         to: 'kaloraat@gmail.com',
    //         from: 'noreply@ecommerce.com',
    //         subject: `A new order is received`,
    //         html: `
    //         <p>Customer name:</p>
    //         <p>Total products: ${order.products.length}</p>
    //         <p>Total cost: ${order.amount}</p>
    //         <p>Login to dashboard to the order in detail.</p>
    //     `
    //     };
    //     sgMail.send(emailData);
    //     res.json(data);
  });
};

exports.getOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.status(201).json(orders);
    });
};

exports.getOrdersByValue = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.status(201).json(orders);
    });

  //   res.status(200).json({
  //     message: "Fetched orders success",
  //     orders: orders,
  //   });
  // } catch (err) {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // }
};

// exports.getOrdersByValue = async (req, res) => {
//   const orders = await Order.find()
//     .populate("user", "_id name address")
//     .sort("-createdAt");
//   // .exec((err, orders) => {
//   //   if (err) {
//   //     return res.status(400).json({
//   //       error: errorHandler(error),
//   //     });
//   //   }

//   res.status(200).json({ orders: orders });

//   // })

//   // const product = await Order.find()
//   //   .populate
// };

exports.getStatusValues = (req, res) => {
  res.status(201).json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.status(201).json(order);
    }
  );
};
