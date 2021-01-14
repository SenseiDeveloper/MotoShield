const nodemailer = require("nodemailer");

//Model for send callback
exports.sendCallback = (data,cb) => {
  async function main() {
    let transporter = nodemailer.createTransport({
      host: 'smtp.ukr.net',
      port: 465,
      secure: true,
      auth: {
        user: 'motoshield@ukr.net',
        pass: 'yH3QSOSmYDh94ItM'
      }
    });

    await transporter.sendMail({
      from: "motoshield@ukr.net", // sender address
      to: "motoshield2018@gmail.com", // list of receivers
      subject: "Moto Shield", // Subject line
      text: `Новая заявка, заказ звонка для:
             Номер телефона - ${data.phone};
             Коментарий -  ${data.commend}.`
    });
  }
  main()
    .then( (data,error) => {
      cb(error, 'Заявка отправлена');
    })
    .catch( (error) => console.log(error));
};

//Model for for invoice
exports.invoice = (data,cb) => {
  const products = data.article.products.map( (el) => {
    return `Назва товару: ${el.name}
            Розмір товару: ${el.size}
            Ціна товару: ${el.price}
            id: ${el._id}
            ------------------------------------------
    `;
  });
  async function main() {
    let transporter = nodemailer.createTransport({
      host: 'smtp.ukr.net',
      port: 465,
      secure: true,
      auth: {
        user: 'motoshield@ukr.net',
        pass: 'yH3QSOSmYDh94ItM'
      }
    });

    await transporter.sendMail({
      from: "motoshield@ukr.net", // sender address
      to: "motoshield2018@gmail.com", // list of receivers
      subject: "Инвойс Moto Shield", // Subject line
      text: `Инвойс:
             Имя - ${data.name};
             Фамилия - ${data.firstName};
             Отчество - ${data.secondName};
             Номер телефона - ${data.phone};
             Коментарий -  ${data.commend};

             ------------------------------

             Способ оплаты - ${data.sendPay.pay};
             Способ доставкы - ${data.address.delivery};
             Пунк самовывоза: ${data.address.shipAddress};
             Получить - ${data.address.deliveryOption};
             Город - ${data.address.city};
             Улица - ${data.address.deliveryStreet};
             Квартира - ${data.address.deliveryStreetAddress};
             Отделение - ${data.address.deliveryData};

             -----------------------------------------
             Товар - ${products};
             Цена - ${data.article.price};
             `
    });
  }
  main()
    .then( (data,error) => {
      cb(error, 'Заяка отправлена на обработку,наш менеджер свяжеться с вами.');
    })
    .catch( (error) => console.log(error));
};
