import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartapiService {

  cartDataList:any=[];
  productList= new BehaviorSubject<any>([]);

  constructor() { }

  getProductData(){
    return this.productList.asObservable();
  }


  set Product(product:any){
    this.cartDataList.push(... product);
    this.productList.next(product)
  }


  // Add to cart details
  addToCart(product:any){
    this.cartDataList.push(product);
    this.productList.next(this.cartDataList);
    this.getTotalAmount();
    console.log(product);
  }


  // Get Total amount
  getTotalAmount(): Number{
    let grandTotal: Number = 0;
    this.cartDataList.map((a:any) => {
      grandTotal += a.total;

    })
    return grandTotal;
  }

  removeCartData(product:any){
    this.cartDataList.map((a:any, index:any) => {
        if(product.id == a.id){
          this.cartDataList.splice(index,1)
        }
    })
      this.productList.next(this.cartDataList)
  }

  removeAllCart(){
    this.cartDataList=[];
    this.productList.next(this.cartDataList);
  }
}
