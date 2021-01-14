import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {HomeProductModel} from '../../shared/model/home-product.model';
import {Subject} from 'rxjs';
import {ProductsService} from '../../shared/service/products.service';
import {Router} from '@angular/router';
import {PostOfficeService} from '../../shared/service/post-office.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MailService} from '../../shared/service/mail.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  products: HomeProductModel[];
  payCounter: number;
  payOption: any = [ 'Наличными по факту доставки', 'Перевод на карту Приват банк'];
  deliveryOption: any = ['Новая почта', 'Пункты самовывоза'];
  selectDelivery: any = null;
  selectDep: any = null;
  optionCity: any = ['Галич', 'Ивано-Франковск'];
  optionSend: any = ['В отделении', 'Курьером'];
  cityData: any;
  cityValue = '';
  cityState = false;
  deliveryData: any;
  streetValue = '';
  streetState = false;
  streetData: any;
  payForm: FormGroup;
  message: string;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private postService: PostOfficeService,
    private fb: FormBuilder,
    private mailService: MailService
  ) { }

  ngOnInit(): void {
    this.initProducts();
    this.initForm();
  }

  initForm() {
    this.payForm = this.fb.group({
      name: ['', Validators.required ],
      firstName: ['', Validators.required ],
      secondName: ['', Validators.required ],
      phone: ['', Validators.required],
      commend: [''],
      selectPay: ['', Validators.required ],
      selectDelivery: ['', Validators.required ],
      shipAddress: [''],
      delivery: [''],
      city: [''],
      deliveryShip: [''],
      street: [''],
      streetAddress: ['']
    });
  }

  addNewFieldToForm(event: string) {
    if ( event === 'Новая почта' ) {
      this.payForm.get('delivery').setValidators([Validators.required]);
      this.payForm.get('city').setValidators([Validators.required]);
    } else {
      this.payForm.get('shipAddress').setValidators([Validators.required]);
    }
  }
  createNewFormControl(event: string) {
    if (event === 'В отделении'){
      this.payForm.get('deliveryShip').setValidators([Validators.required])
      this.payForm.get('city').setValidators([Validators.required]);
    } else  {
      this.payForm.get('city').setValidators([Validators.required]);
      this.payForm.get('street').setValidators([Validators.required]);
      this.payForm.get('streetAddress').setValidators([Validators.required]);
    }
  }

  submit(){
    const pay = Object.assign({
      name: this.payForm.value.name,
      firstName: this.payForm.value.firstName,
      secondName: this.payForm.value.secondName,
      phone: this.payForm.value.phone,
      commend: this.payForm.value.commend,
      sendPay: {
        pay: this.payForm.value.selectPay,
      },
      address: {
        delivery: this.payForm.value.selectDelivery,
        deliveryOption: this.payForm.value.delivery,
        city: this.cityData ? this.cityData[0].city : '',
        deliveryData: this.payForm.value.deliveryShip,
        deliveryStreet: this.streetData?.join(''),
        deliveryStreetAddress: this.payForm.value.streetAddress,
        shipAddress: this.payForm.value.shipAddress
      },
      article: {
        products: this.products,
        price: this.payCounter
      }
    });
    this.mailService.sendPayInvoice(pay)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (str: string) => {
          this.message = str;
          setTimeout(() => { this.router.navigate(['/home'])},4000);
        },
        error => console.log(error)
      );
  }

  searchCity(value: string) {
    this.postService.getAddres(value)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (data: any) => {
          this.cityData = data.data[0].Addresses.map(e =>
          Object.assign({
            city: e.Present,
            delivery: e.Ref
          }));
          this.cityState = true;
        },
        error => console.log(error)
      );
  }

  searchStreet(value: string){
    this.postService.getStreet(value, this.cityData[0].delivery)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (data: any) => {
          this.streetData = data.data.map( (e, i) => e.Addresses[i].Present);
          this.streetState = true;
        },
        error => console.log(error)
      );
  }

  departmentCity(city: string){
    this.postService.getDepartment(city)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (data: any) => {
          this.deliveryData = data.data.map((el) => {
            return el.Description;
          });
        },
        error => console.log(error)
      );
  }

  setCityValue(city: {}){
    this.cityValue = city['city'];
    this.departmentCity(city['delivery']);
    this.cityState = !this.cityState;
  }

  setStreetValue(street: string){
    this.streetValue = street;
    this.streetState = !this.streetState;
  }

  changeDelivery(event: string){
    this.addNewFieldToForm(event);
    this.selectDelivery = event;
  }

  changeDep(event: string) {
    this.selectDep = event;
    this.createNewFormControl(event);
  }

  checkCounter(products: HomeProductModel[]) {
    const price = products.map(el => el.price);
    this.payCounter = price.reduce((sum, current) => {
      return sum + current;
    }, 0);
  }

  successInitProducts(products: HomeProductModel[]) {
    this.products = products;
    this.checkCounter(products);
  }

  initProducts() {
    const products = JSON.parse(localStorage.getItem('backet'));
    this.productService.getProductsForBasket(products)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        ( products: HomeProductModel[] ) => this.successInitProducts(products),
        error => console.log(error)
      );
  }

  redirectProduct(id: string) {
    this.router.navigate([`product/${id}`]);
  }

  removeProduct(id: string) {
    const checkBasket = JSON.parse(localStorage.getItem('backet'));
    const findElement = checkBasket.indexOf(id);
    checkBasket.splice(findElement,1);
    localStorage.setItem('backet', JSON.stringify(checkBasket));

    const newProducts = this.products.filter(el => el._id !== id);
    this.products = newProducts;
    this.checkCounter(newProducts);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
