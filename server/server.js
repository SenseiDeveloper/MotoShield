const express = require('express');
const app  = express();
const bodyParser = require('body-parser');

const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//Array products
const ITEAMS = [
  {
    id: 1,
    name: 'Мотошолом AGV GT-VELOCE',
    categories: 'helm',
    discount: 0,
    data: "2020-12-01T21:00:00.000Z",
    size: 'L',
    price: 6500,
    state: 'Новый',
    characteristics: 'Внешняя капсула сделана из CAAF  (композитное волокно на основе арамида и углеволокна (карбона))\n' +
      '•4 размера капсулы\n' +
      '•Вентиляция IVS (Integrated Ventilation System) с широкими вентиляционными каналами, встроенными в капсулу\n' +
      '•Дышащая и полностью съемная подкладка Lycra с антибактериальной обработкой\n' +
      '•Визор Race 2 Flat с увеличенным обзором, имеет защиту от царапин и подготовку для установки внешних race пленок\n' +
      '•Cистема XQRS (Extra Quick Release System). Визор-механика, который позволяет снимать визор за считанные секунды без использования специального инструмента\n' +
      '•Дышащий, приятный для кожи, материал на подушках щек\n' +
      '•Застежка Double-D кольца\n' +
      '•Отвечает стандартам безопасности ECE 2205 и DOT\n' +
      '"GT Veloce - душа скорости AGV, укрощенная для путешествий"\n' +
      'Так отзываются о своем новом шлеме итальянцы из AGV. В самом деле, новый мотошлем имеет такую же капсулу, что и гоночные модели Pista и Corsa, соответственно имеет отличную безопасность, вентиляцию и легкость конструкции. Форму лишь немного изменили, убрав задний спойлер и добившись тем самым лучшей аэродинамики в вертикальном, "городском", положении.\n' +
      'AGV GT-Veloce это один из лучших мотошлемов для людей, желающих получить шлем для любых расстояний и погодных условий и при этом получающих удовольствие от высокой скорости.\n' +
      'Существует также экстраординарный аксессуар для этого шлема: AGVisor. ЖК-технология, которая, с простым "нажатием на кнопку", превращает визор из прозрачного до темного - менее чем за секунду! AGVisor также имеет функцию анти-запотевания.\n' +
      'Производство: Италия',
    disadvantage: ' немає, повністю новий',
    sale: 0,
    img1: 'shop/1/1.jpg',
    img2: 'shop/1/2.jpg',
    img3: 'shop/1/3.jpg',
    img4: 'shop/1/4.jpg',
    img5: 'shop/1/5.jpg',
    img6: 'shop/1/6.jpg',
    img7: 'shop/1/7.jpg',
    img8: 'shop/1/8.jpg'
  },
  {
    id: 2,
    name: 'Мотошолом AGV K-1',
    categories: 'helm',
    discount: 0,
    data: "2020-12-01T21:00:00.000Z",
    size: 'XS',
    price: 4000,
    state: '9/10',
    characteristics: 'K1 - это спортивный шлем AGV для повседневной использования, созданный на разработках применяемых в профессиональном мотоспорте. Подробнее https://motostuff.com.ua/products/motoshlem-agv-k1-white/?utm_source=share',
    disadvantage: ' на скорлупі є дікілька мікро подряпин ',
    sale: 0,
    img1: 'shop/2/1.jpg',
    img2: 'shop/2/2.jpg',
    img3: 'shop/2/3.jpg',
    img4: 'shop/2/4.jpg',
    img5: 'shop/2/5.jpg',
    img6: 'shop/2/6.jpg',
    img7: 'shop/2/7.jpg',
    img8: 'shop/2/8.jpg'
  },
  {
    id: 3,
    name: 'Мотоботы Alpinestars SMX-6',
    categories: 'boot',
    discount: 0,
    data: "2020-05-04T21:00:00.000Z",
    size: 'S',
    price: 3700,
    state: '8.5/10',
    characteristics: 'Удобные мотоботы с отличными техническими характеристиками, которые предоставят мотоциклисту комфорт, качество и производительность. Обувь изготовлена из микрофибры с повышенными водонепроницаемыми и воздухопроницаемыми свойствами, а также обладающей устойчивостью к истиранию и разрыву. Перфорированные панели и специальные вентиляционные отверстия обеспечивают максимальную циркуляцию воздуха, что гарантирует сухость и комфорт ногам в течение длительного времени. Съемная анатомическая стелька, включающая в себя EVA и Lycra, хорошо впитывает пот, быстро сохнет, не вызывает аллергию, нейтрализует появление неприятного запаха. Область лодыжки усилена протектором TPU, а носок и пятка оснащены специальными накладками, что надежно защищает от ударов и механических повреждений. Мягкая манжета предотвращает натирание. Эксклюзивная резиновая подошва Alpinestars способствует высокому уровню сцепления с педалями мотоцикла и с любой поверхностью. Длинная застежка-молния дополнена широкой липучкой Velcro для устойчивой фиксации стопы и голени, а также идеальной подгонки под нужный размер. Светоотражающие детали увеличивают видимость в темное время суток или в условиях плохой освещенности. Покупайте мотоботы SMX-6 V2 от бренда Alpinestars, и вы получите стильную, износоустойчивую модель по доступной цене!\n' +
      'Производство: Италия',
    disadvantage: 'немає',
    sale: 1,
    img1: 'shop/3/1.jpg',
    img2: 'shop/3/2.jpg',
    img3: 'shop/3/3.jpg',
    img4: 'shop/3/4.jpg',
    img5: 'shop/3/5.jpg',
    img6: 'shop/3/6.jpg',
    img7: 'shop/3/7.jpg',
    img8: 'shop/3/8.jpg'
  },
  {
    id: 4,
    name: 'Мотокуртка Dainese Super Speed C2',
    categories: 'clothing',
    discount: 0,
    data: "2020-05-04T21:00:00.000Z",
    size: 'XL',
    price: 7000,
    state: '9/10',
    characteristics: 'Спортивная мотокрутка Dainese Super Speed C2 разработана профессионалами всемирно известной итальянской компании Dainese. Dainese Super Speed C2 соответствует самым строгим требованиям безопасности. Практичность и качество в сочетании с отличным дизайном привлекают как новичков, так и профессионалов мотоциклистов. ',
    disadvantage: 'немає',
    sale: 0,
    img1: 'shop/4/1.jpg',
    img2: 'shop/4/2.jpg',
    img3: 'shop/4/3.jpg',
    img4: 'shop/4/4.jpg',
    img5: 'shop/4/5.jpg',
    img6: 'shop/4/6.jpg',
    img7: 'shop/4/7.jpg',
    img8: 'shop/4/8.jpg'
  },
  {
    id: 5,
    name: 'Шлем HJC RPHA 11',
    categories: 'helm',
    discount: 0,
    data: "2020-05-04T21:00:00.000Z",
    size: 'L',
    price: 8500,
    state: '8/10',
    characteristics: 'Флагман HJC! Изначально созданный для гоночной трассы RPHA 11 является спортивным шлемом HJC премиум-класса с аэродинамическим корпусом, обеспечивающим экстремальные характеристики на максимальных скоростях',
    disadvantage: 'на скорлупі є два скола, на візорі декілька мікро подряпин.',
    sale: 0,
    img1: 'shop/5/1.jpg',
    img2: 'shop/5/2.jpg',
    img3: 'shop/5/3.jpg',
    img4: 'shop/5/4.jpg',
    img5: 'shop/5/5.jpg',
    img6: 'shop/5/6.jpg',
    img7: 'shop/5/7.jpg',
    img8: 'shop/5/8.jpg'
  },
  {
    id: 6,
    name: 'Мотокуртка REVIT GLIDE',
    categories: 'clothing',
    discount: 0,
    data: "2020-05-04T21:00:00.000Z",
    size: 'L',
    price: 8000,
    state: 'Новая',
    characteristics: 'Профессиональный внешний вид, отличное качество изготовления, отличная посадка на теле - вот что отличает куртку GLIDE! Высококачественная кожа, из которой сделана куртка, довольно мягкая, поэтому она не ограничивает движения, а также имеет эластичные вставки, благодаря которым мы имеем полную свободу движени',
    disadvantage: 'Немає',
    sale: 0,
    img1: 'shop/6/1.jpg',
    img2: 'shop/6/2.jpg',
    img3: 'shop/6/3.jpg',
    img4: 'shop/6/4.jpg',
    img5: 'shop/6/5.jpg',
    img6: 'shop/6/6.jpg',
    img7: 'shop/6/7.jpg',
    img8: 'shop/6/8.jpg'
  },
  {
    id: 7,
    name: 'Шлем Shark RAW',
    categories: 'helm',
    discount: 10,
    data: "2020-05-04T21:00:00.000Z",
    size: 'M',
    price: 3800,
    state: '8/10',
    characteristics: 'Аэродинамическая продуманная внешняя оболочка изготовлена из прочного и легкого термопласта.\n' +
      'Внутренняя комфортная подкладка шлема изготовлена из бамбуковых волокон и полностью съемная для стирки.\n' +
      'Для обеспечения вашего комфорта в жаркую погоду, в шлеме присутствует множественная вентиляция.\n' +
      'Визор-очки шлема Shark Raw быстросъемные (отстегивается благодаря запатентованной системе QRGS), изнутри имеют покрытие против запотевания, внешне - против царапин.\n' +
      'Маска для защиты лица пристегивается удобным креплением, конструкция быстросъемная.\n' +
      'Имеется комфортная застежка шлема MICROLOCK, а также система EasyFit, предусмотренная для людей с плохим зрением. \n' +
      'Шлем сертифицирован Европой (ЕСЕ22.05) и весит всего лишь 1300грамм.\n' +
      'Предусмотрена непосредственная установка в шлем переговорной системы SharkTooth\n' +
      'Производитель: Франция',
    disadvantage: 'потертості на задінй частині шолома.',
    sale: 0,
    img1: 'shop/7/1.jpg',
    img2: 'shop/7/2.jpg',
    img3: 'shop/7/3.jpg',
    img4: 'shop/7/4.jpg',
    img5: 'shop/7/5.jpg',
    img6: 'shop/7/6.jpg',
    img7: 'shop/7/7.jpg',
    img8: 'shop/7/8.jpg'
  },
  {
    id: 8,
    name: 'Мотоперчатки HELD EVO THRUX ',
    categories: 'glove',
    discount: 5,
    data: "2020-05-04T21:00:00.000Z",
    size: 'M',
    price: 1400,
    state: '7.5/10',
    characteristics: 'Очень износостойкая кенгуриная кожа на ладони\n' +
      'Мягкая кожа на тыльной стороне ладони\n' +
      'Цвето- и потостойкая кожа\n' +
      'Специальный плоский шов\n' +
      'Регулировка манжеты и охвата запястья на липучке\n' +
      'Стеклоочиститель\n' +
      'Гофрированные кожаные вставки на фалангах пальцев\n' +
      'Твердая пластиковая защита кулака\n' +
      'Материал SUPERFABRIC®  и твердый пластик для защиты края руки\n' +
      'Тыльная сторона ладони защищена материалом Kevlar® изнутри\n' +
      'Производство: Германия',
    disadvantage: 'незначні потертості на шкірі.',
    sale: 0,
    img1: 'shop/8/1.jpg',
    img2: 'shop/8/2.jpg',
    img3: 'shop/8/3.jpg',
    img4: 'shop/8/4.jpg',
    img5: 'shop/8/5.jpg',
    img6: 'shop/8/6.jpg',
    img7: 'shop/8/7.jpg',
    img8: 'shop/8/8.jpg'
  }
];
//API GET PRODUCTS LIST for Home
//NO MAP for parameters
app.get('/api/new-products',function(req, res){
  ITEAMS.reverse();
  let newIteams = [];
  for( let i = 0; i < ITEAMS.length; i++) {
    if (newIteams.length === 6) {
      break;
    }
    ITEAMS[i].sale !== 1 ? newIteams.push(ITEAMS[i]) : false;
  }
  res.status(200).send(newIteams);
});

//API GET PRODUCTS LIST
//NEED FIRST ADD SOLD AFTER
app.get('/api/products',function(req, res){
  res.status(200).send(ITEAMS);
});

//API GET PRODUCTS FILTERS
//NEED FIRST ADD SOLD AFTER
app.post('/api/filter-products',function(req, res){
  let category = req.body.category;
  let size = req.body.size;

  let categoryProducts = filterByCategory(category);
  let sizeProducts = filterBySize(size,categoryProducts);
  let counter = sizeCounter(categoryProducts);

  res.status(200).send(createObjectProducts(sizeProducts,counter));
});

function filterByCategory(category){
  if(category === 'all'){
    return ITEAMS;
  } else {
    return ITEAMS.filter(el => el.categories === category);
  }
}

function filterBySize(size,products){
  if(size === 'all'){
    return products;
  } else {
    return products.filter(el => el.size === size);
  }
}

function sizeCounter(products){
  let sizeArray = products.map(el => el.size);
  let counterSize = sizeArray.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});
  return counterSize;
}

function createObjectProducts(products,size) {
  return {
    products:products,
    size: size
  }
}

//API GET PRODUCT BY ID
app.get('/api/products/:id',cors(),function(req, res){
  let product = ITEAMS.find(function(inv){
    return inv.id === Number(req.params.id)
  });
  res.status(200).send(product);
});

//API GET PRODUCTS COUNTER
app.get('/api/products-counter',function(req, res){
    let categoryArray = ITEAMS.map(el => el.categories);
    let counterCategory = categoryArray.reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
  Object.assign(counterCategory,{'all': ITEAMS.length});
  res.status(200).send(counterCategory);
});




app.listen(9000,function(){
  console.log('Api app started');
});
