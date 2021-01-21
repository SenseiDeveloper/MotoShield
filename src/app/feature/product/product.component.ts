import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../shared/service/products.service';
import { Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ProductModel} from '../../shared/model/product.model';
import { NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  product: ProductModel[];
  galleryImages: NgxGalleryImage[];
  galleryOptions: NgxGalleryOptions[];
  loader: boolean = true;

  constructor(
    private activeRouter: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.initProduct();
    this.initGalleryOptions();
  }


  initGalleryOptions(){
    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        thumbnailsColumns: 8,
        thumbnailsPercent: 12,
        arrowPrevIcon: 'fas fa-chevron-left',
        arrowNextIcon: 'fas fa-chevron-right'
      },
      // max-width 800
      {
        breakpoint: 991,
        width: '100%',
        height: '500px',
        imagePercent: 80,
        thumbnailsPercent: 15,
        thumbnailsMargin: 15,
        thumbnailMargin: 15
      },
      // max-width 400
      {
        breakpoint: 400,
        width: '100%',
        height: '300px',
        preview: true
      }
    ];
  }

  createGallery(product: ProductModel[]){
    const gallery = [];
    for ( let i = 1; i < 9; i++ ) {
      gallery.push(Object.assign({
        small: `assets/image/${product[`img${i}`]}`,
        medium: `assets/image/${product[`img${i}`]}`,
        big: `assets/image/${product[`img${i}`]}`
      }));
    }
    this.galleryImages = gallery;
    this.loader = false;
  }

  successInitProduct(product: ProductModel[]){
    this.product = product;
    this.createGallery(product);
  }

  initProduct(){
    this.productService.getProductByID(this.activeRouter.snapshot.params.id)
    .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (product: ProductModel[]) => this.successInitProduct(product),
        error => console.log(error)
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
