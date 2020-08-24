import React, {Component} from 'react';
import data from './data.json';

import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // กำหนด product state บน data.json
      products: data.products,
      // กำหนด cartItems state เท่ากับ Array
      cartItems: [],
      // กำหนด Size state เท่ากับค่าว่าง
      size: "",
      // กำหนด sort state เท่ากับค่าว่าง
      sort: "",
    };
  }
  // add to cart function
  addToCart = (product) => {
    // สร้างตัวแปล cartItems เป็น array เมื่อมีการเพิ่มค่า
    const cartItems = this.state.cartItems.slice();
    // กำหนดสินค้าเริ่มต้นเป็น false เพื่อให้รู้ว่าสินค้าไหน add แล้ว
    let alreadyInCart = false;
    // ลูป cartItems โชว์ข้อมูลเป็น item บน function 
    cartItems.forEach((item) => {
      // ถ้้า item._id เท่ากับ product._id 
      if (item._id === product._id) {
        // ให้ item เพิ่มทีละ 1
        item.count++;
        // กำหนดว่าสินค้านั้นคลิกแล้ว
        alreadyInCart = true;
      }
    });
    // ถ้ายังไม่มีสินค้าในตะกร้า
    if(!alreadyInCart) {
      // เพิ่ม ...product ใน cartItems , กำหนด count = 1
      cartItems.push({...product, count: 1});
    }
    // ตั้งค่า state cartItems ให้เป็นปัจจุบัน
    this.setState({cartItems});
  }
  // remove from cart function 
  removeFromCart = (product) => {
    // สร้างตัวแปล cartItems เป็น array เมื่อมีการเพิ่มค่า
    const cartItems = this.state.cartItems.slice();
    this.setState({
      // filter ลบ cart เมื่อ x._id ไม่เท่ากับ product._id 
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
  }
  // sort Products function
  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => (
        sort === "lowest" ? ((a.price > b.price)? 1:-1):
        sort === "highest" ? ((a.price < b.price)? 1:-1):
        ((a._id > b._id) ? 1:-1)
      ))
    }))
  }
  // filter Products
  filterProducts = (event) => {
    // impl
    console.log(event.target.value);
    if(event.target.value === "") {
      this.setState({size: event.target.value, products: data.products});
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(event.target.value)>=0)
      })
    }
  }
  render() {
    return (
     <div className="grid-container">
       <header>
         <a href="/">React Shopping Cart</a>
       </header>
       <main>
         <div className="content">
            <div className="main">
              <Filter count={this.state.products.length} 
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}></Filter>
              <Products products={this.state.products} addToCart={this.addToCart}></Products>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems}
              removeFromCart={this.removeFromCart}></Cart>
            </div>
         </div>
       </main>
       <footer>
         All right is reserved.
       </footer>
     </div>
    );
  }
}

export default App;
